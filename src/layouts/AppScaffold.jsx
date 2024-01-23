//
import React, { useEffect } from "react";
import { eUseTranslation } from "react-e-utils";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import AppHeader from "./AppHeader";
import { MyLayout, MyLayoutItem } from "../components/MyLayout";
import AppSideMenu from "./AppSideMenu";
import useUserModel from "../models/UserModel";
import { useNavigate } from "react-router-dom";
//

// loading starts loading screen
// access for removing header footer and side when in access screen
const AppScaffold = ({ title, loading = false, access = false, children }) => {
  const { loggedIn } = useUserModel();
  const { t } = eUseTranslation();
  const navigate = useNavigate();

  // check is logged in
  useEffect(() => {
    if (access && loggedIn) navigate(`/`, { replace: true });
    if (!access && !loggedIn) navigate(`/login`, { replace: true });
  }, [loggedIn, access, navigate]);

  document.title = title ?? t("app_title");
  const content = (
    <Stack
      flexDirection="column"
      sx={{ height: "100%" }}
      justifyContent={"center"}
    >
      {children}
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Stack>
  );

  if (access === true) {
    return content;
  } else {
    return (
      <MyLayout
        areas="
        'header header'
        'sidemenu content'
      "
        cols={"auto 1fr"}
        rows={"auto 1fr"}
      >
        <MyLayoutItem area={"header"}>
          <AppHeader />
        </MyLayoutItem>
        <MyLayoutItem area={"sidemenu"}>
          <AppSideMenu />
        </MyLayoutItem>
        <MyLayoutItem area={"content"}>{content}</MyLayoutItem>
      </MyLayout>
    );
  }
};
export default AppScaffold;
