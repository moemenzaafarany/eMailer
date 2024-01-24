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

function SMI({
  value,
  type,
  text,
  icon,
  href,
  onClick,
  items,
  color,
  bgcolor,
  activeColor,
  activeBgcolor,
}) {
  return {
    value,
    type,
    text,
    icon,
    href,
    onClick,
    items,
    color,
    bgcolor,
    activeColor,
    activeBgcolor,
  };
}
function SMIL({ open, items, pValue, active, activeColor, activeBgcolor }) {
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
      case "item":
        return (
          <SMIE
            key={`esm-${index}`}
            open={open}
            {...item}
            pValue={pValue}
            active={active}
            activeColor={item?.activeColor ?? activeColor}
            activeBgcolor={item?.activeBgcolor ?? activeBgcolor}
          />
        );
      case "custom":
        return item.element;
      default:
        return null;
    }
  });
}
function SMIE({
  open,
  text,
  icon,
  href,
  onClick,
  items,
  color,
  bgcolor,
  activeColor,
  activeBgcolor,
  value,
  pValue,
  active,
}) {
  var key = value && `${pValue ? `${pValue}` : ""}${value}.`;
  const selected = key && active.indexOf(key) === 0;
  const aselected = active === key;
  const list = eUseState(selected);
  var listOpen = selected ? true : list.value;

  console.log(active, key, selected, aselected);

  return (
    <>
      <ListItem sx={{ px: 0.5 }} disableGutters disablePadding dense>
        <ListItemButton
          sx={{
            p: 0.5,
            color: color ?? "inherit",
            bgcolor: bgcolor ?? "inherit",
            justifyContent: text ? "flex-start" : "flex-end",
            alignItems: "stretch",
            borderRadius: 1,
            opacity: selected ? 1 : 0.6,
            "&:hover": {
              opacity: 1,
              color: color ?? "inherit",
              bgcolor: bgcolor ?? "inherit",
            },
            "&.Mui-selected": {
              opacity: 1,
              color: activeColor ?? "inherit",
              bgcolor: activeBgcolor ?? "inherit",
            },
            "&.Mui-selected:hover": {
              opacity: 1,
              color: activeColor ?? "inherit",
              bgcolor: activeBgcolor ?? "inherit",
            },
          }}
          {...(href && { component: Link, to: href })}
          {...(onClick && { onClick: onClick })}
          {...(items && {
            onClick: () => {
              if (!selected) {
                list.value = !list.value;
              }
            },
          })}
          selected={aselected}
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
          {items && (
            <Collapse
              sx={{ pt: 0.3 }}
              in={open}
              collapsedSize={0}
              orientation="horizontal"
            >
              {listOpen ? <ExpandLessTwoTone /> : <ExpandMoreTwoTone />}
            </Collapse>
          )}
        </ListItemButton>
      </ListItem>
      {items && (
        <Collapse
          in={listOpen}
          orientation="vertical"
          sx={{
            width: "100%",
            pl: open ? 1 : 0.25,
          }}
        >
          <List
            component={Stack}
            flexDirection="column"
            sx={{
              p: 0,
              position: "relative",
              overflow: "visible",
              borderLeft: "1px dashed currentColor",
            }}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {SMIL({
              open,
              items,
              pValue: key,
              selected,
              active,
              activeColor,
              activeBgcolor,
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
  color = "rgba(0,0,0)",
  bgcolor = "rgba(255,255,255)",
  activeColor = "rgba(255,255,255)",
  activeBgcolor = "rgba(0,0,0)",
  items,
  active,
}) => {
  active = `${active}.`;
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
        {SMIL({ items, open, active, activeColor, activeBgcolor })}
      </List>
    </Paper>
  );
};
export default SideMenu;
export const SideMenuItem = {
  custom: ({ element } = {}) => SMI({ type: "custom", element }),
  divider: ({ color } = {}) => SMI({ type: "divider", color }),
  spacer: () => SMI({ type: "spacer" }),
  link: ({
    value,
    text,
    icon,
    href,
    color,
    bgcolor,
    activeColor,
    activeBgcolor,
  }) =>
    SMI({
      value,
      type: "item",
      text,
      icon,
      href,
      color,
      bgcolor,
      activeColor,
      activeBgcolor,
    }),
  button: ({
    value,
    text,
    icon,
    onClick,
    color,
    bgcolor,
    activeColor,
    activeBgcolor,
  }) =>
    SMI({
      value,
      type: "item",
      text,
      icon,
      onClick,
      color,
      bgcolor,
      activeColor,
      activeBgcolor,
    }),
  list: ({
    value,
    text,
    icon,
    items,
    color,
    bgcolor,
    activeColor,
    activeBgcolor,
  }) =>
    SMI({
      value,
      type: "item",
      text,
      icon,
      items,
      color,
      bgcolor,
      activeColor,
      activeBgcolor,
    }),
};
