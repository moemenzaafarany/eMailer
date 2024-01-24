import { ExpandLessTwoTone, ExpandMoreTwoTone } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import { eList, eUseState } from "react-e-utils";
import { Link } from "react-router-dom";

function SMI({ type, text, icon, href, onClick, items, color, bgcolor }) {
  return {
    type,
    text,
    icon,
    href,
    onClick,
    items,
    color,
    bgcolor,
  };
}
function SMIL({ open, onOpen, onClose, items }) {
  return eList.toArray(items, (index, item) => {
    switch (item?.type) {
      case "divider":
        return (
          <Divider
            key={`esm-${index}`}
            sx={{
              width: "100%",
              my: 1,
              backgroundColor: item?.color,
            }}
          />
        );
      case "spacer":
        return (
          <Box
            key={`esm-${index}`}
            sx={{
              flexGrow: 1,
            }}
          />
        );
      case "text":
      case "link":
      case "list":
        return <SMIE key={`esm-${index}`} open={open} {...item} />;
      case "custom":
        return item.element;
      default:
        return null;
    }
  });
}
function SMIE({ open, text, icon, href, onClick, items, color, bgcolor }) {
  const list = eUseState(false);
  return (
    <>
      <ListItem sx={{ px: 0.5 }} disableGutters disablePadding dense>
        <ListItemButton
          sx={{
            p: 0.5,
            color: color ?? "inherit",
            bgcolor: bgcolor ?? "inherit",
            justifyContent: text ? "flex-start" : "flex-end",
          }}
          {...(href && { component: Link, to: href })}
          {...(onClick && { onClick: onClick })}
          {...(items && {
            onClick: () => {
              list.value = !list.value;
            },
          })}
          disableGutters
        >
          {icon && (
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: "inherit",
              }}
              children={icon}
            />
          )}
          {text && (
            <Collapse in={open} collapsedSize={0} orientation="horizontal">
              <ListItemText
                primary={text}
                inset={true}
                sx={{
                  px: 3,
                }}
                primaryTypographyProps={{
                  fontSize: "normal",
                  color: "inherit",
                  fontWeight: "medium",
                  variant: "body2",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </Collapse>
          )}
          {items &&
            (list.value ? <ExpandLessTwoTone /> : <ExpandMoreTwoTone />)}
        </ListItemButton>
      </ListItem>
      {items && (
        <Collapse
          in={list.value}
          orientation="vertical"
          sx={{
            width: "100%",
          }}
        >
          <List
            component={Stack}
            flexDirection="column"
            sx={{
              pl: 1,
              pb: 0.5,
              position: "relative",
              overflow: "visible",
            }}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {SMIL({
              open: open,
              items: items,
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

const SideMenu = ({
  open,
  onOpen,
  onClose,
  elevation = 1,
  bgcolor = "background.primary",
  color = "text.white",
  items,
}) => {
  return (
    <Paper
      elevation={elevation}
      square
      sx={{
        height: "100%",
        bgcolor: bgcolor,
        color: color,
      }}
    >
      <List
        component={Stack}
        flexDirection="column"
        sx={{
          height: "100%",
          py: 1,
          position: "relative",
          overflow: "visible",
        }}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {SMIL({ items, open })}
      </List>
    </Paper>
  );
};
export default SideMenu;
export const SideMenuItem = {
  divider: ({ color } = {}) => SMI({ type: "divider", color }),
  spacer: () => SMI({ type: "spacer" }),
  link: ({ text, icon, href, color, bgcolor }) =>
    SMI({ type: "link", text, icon, href, color, bgcolor }),
  button: ({ text, icon, onClick, color, bgcolor }) =>
    SMI({ type: "button", text, icon, onClick, color, bgcolor }),
  list: ({ text, icon, items, color, bgcolor }) =>
    SMI({ type: "list", text, icon, items, color, bgcolor }),
  custom: ({ element } = {}) => SMI({ type: "custom", element }),
};
