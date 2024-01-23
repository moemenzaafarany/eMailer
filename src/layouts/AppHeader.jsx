import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Box, Container } from "@mui/system";
import { eUseBreakpoints, eUseTranslation } from "react-e-utils";
import MyImage from "../components/MyImage";

import Logo from "../assets/images/logo.png";

const AppHeader = () => {
  const { forDevice } = eUseBreakpoints();
  const { t } = eUseTranslation();

  return (
    <AppBar
      position="static"
      variant="dense"
      color="white"
      sx={{
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "light.main",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          py: 0.75,
          gap: forDevice(1, 2, 3, 4),
          height: 55,
        }}
      >
        <MyImage
          src={Logo}
          alt={t("welcome_greeting")}
          width={"auto"}
          height={"100%"}
          style={{ borderRadius: 4 }}
        />
        <Box height={"100%"} sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
