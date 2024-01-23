import React from "react";
import {
  Collapse,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { eList, eUseState, eUseTranslation } from "react-e-utils";
import {
  ChevronLeftTwoTone,
  ChevronRightTwoTone,
  DashboardTwoTone,
  PeopleTwoTone,
  FormatAlignCenter,
  Language,
  TaskTwoTone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";

const AppSideMenu = () => {
  const { t, forDir } = eUseTranslation();
  const opendrawer = eUseState(true);

  return (
    <Paper
      elevation={0}
      square
      sx={{
        height: "100%",
        backgroundColor: "background.primary",
        color: "white.main",
      }}
    >
      <Stack
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
        {eList.toArray(
          [
            {
              icon:
                opendrawer.value === true
                  ? forDir(<ChevronLeftTwoTone />, <ChevronRightTwoTone />)
                  : forDir(<ChevronRightTwoTone />, <ChevronLeftTwoTone />),
              onClick: () => (opendrawer.value = !opendrawer.value),
            },
            null, 
            {
              icon: <DashboardTwoTone />,
              text: t("dashboard"),
              link: "/",
            },
            {
              icon: <PeopleTwoTone />,
              text: t("users"),
              link: "/organization/users",
            },
            {
              icon: <FormatAlignCenter />,
              text: t("content"),
              link: "/cms/content",
            },
            {
              icon: <Language />,
              text: t("locales"),
              link: "/cms/locales",
            },
            {
              icon: <TaskTwoTone />,
              text: t("plans"),
              link: "/plans/plans",
            },
          ],          
          (index, item) => {
            if (!item) {
              return (
                <Divider
                  key={`asm-${index}`}
                  sx={{
                    width: "100%",
                    my: 1,
                    backgroundColor: "white.main",
                  }}
                />
              );
            } else if (React.isValidElement(item)) {
              return item;
            } else {
              // object can have icon, text, onClick, link, color
              return (
                <ListItem
                  key={`asm-${index}`}
                  sx={{ px: 0.5 }}
                  disableGutters
                  disablePadding
                  dense
                >
                  <ListItemButton
                    sx={{
                      p: 0.5,
                      color: item?.color ?? "inherit",
                      justifyContent: item?.text ? "flex-start" : "flex-end",
                    }}
                    {...(item?.link
                      ? { component: Link, to: item?.link }
                      : { onClick: item?.onClick })}
                    disableGutters
                  >
                    {item?.icon && (
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: "inherit",
                        }}
                        children={item.icon}
                      />
                    )}
                    {item?.text && (
                      <Collapse
                        in={opendrawer.value}
                        collapsedSize={0}
                        orientation="horizontal"
                      >
                        <ListItemText
                          primary={item.text}
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
                  </ListItemButton>
                </ListItem>
              );
            }
          }
        )}
      </Stack>
    </Paper>
  );
};
export default AppSideMenu;
