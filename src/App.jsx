import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { DefaultTheme } from "./configs/themes";
import MyMuiApp from "./components/MyMuiApp";
import { MultiProviders } from "react-e-utils";
import { UserModel } from "./models/UserModel";

// pages
import Err404Page from "./pages/Err404Page";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/Login/LoginPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import UsersPage from "./pages/Organization/Users/UsersPage";
import ContentPage from "./pages/Cms/Content/ContentPage";
import LocalesPage from "./pages/Cms/Locales/LocalesPage";
import PlansPage from "./pages/Plans/Plans/PlansPage";

const App = () => {
  return (
    <MultiProviders
      providers={[UserModel.Provider]}
      includeBreakpoints={true}
      includeTranslation={true}
      render={({ dir }) => {
        return (
          <MyMuiApp dir={dir} theme={DefaultTheme().material} fixedPage={true}>
            <RouterProvider
              fallbackElement={<Err404Page />}
              router={createHashRouter([
                {
                  path: "/",
                  element: <DashboardPage />,
                },
                {
                  path: "/login",
                  element: <LoginPage />,
                  children: [
                    { path: "", element: null },
                    { path: ":nav", element: null },
                  ],
                },
                {
                  path: "/reset",
                  element: <ResetPasswordPage />,
                  children: [
                    { path: "", element: null },
                    { path: ":nav", element: null },
                  ],
                },
                {
                  path: "/organization/users",
                  element: <UsersPage />,
                },
                {
                  path: "/cms/content",
                  element: <ContentPage />,
                },
                {
                  path: "/cms/locales",
                  element: <LocalesPage />,
                },
                {
                  path: "/plans/plans",
                  element: <PlansPage />,
                },
              ])}
            />
          </MyMuiApp>
        );
      }}
    />
  );
};
export default App;
