import React from "react";
import { MultiProviders, eUseState } from "react-e-utils";
import { UserModel } from "./models/UserModel";
import { Button } from "@mui/material";
// package
import MuiApp from "./test/material/MuiApp";
import eCreateMuiTheme from "./test/themes/CreateMuiTheme";
import Scaffold from "./test/material/Scaffold";
import SideMenu, { SideMenuItem } from "./test/material/SideMenu";
import { BtnIcon } from "./test/material/Btn";
import {
  HomeTwoTone,
  ExpandLessTwoTone,
  ExpandMoreTwoTone,
  BusinessTwoTone,
  LogoutTwoTone,
} from "@mui/icons-material";

const App = () => {
  const sm = eUseState(false);
  return (
    <MultiProviders
      providers={[UserModel.Provider]}
      includeBreakpoints={true}
      includeTranslation={true}
      render={({ dir }) => {
        dir = "rtl";
        return (
          <MuiApp dir={dir} theme={eCreateMuiTheme({ dir })}>
            <Scaffold
              menuLeft={
                <SideMenu
                  active="org.h1"
                  open={sm.value}
                  items={[
                    SideMenuItem.link({
                      value: "home",
                      text: "home",
                      icon: <HomeTwoTone />,
                    }),
                    SideMenuItem.list({
                      value: "org",
                      text: "org",
                      icon: <BusinessTwoTone />,
                      items: [
                        SideMenuItem.link({
                          value: "h1",
                          text: "home1",
                          icon: <HomeTwoTone />,
                        }),
                        SideMenuItem.link({
                          value: "h2",
                          text: "home2",
                          icon: <HomeTwoTone />,
                        }),
                        SideMenuItem.link({
                          value: "h3",
                          text: "home3",
                          icon: <HomeTwoTone />,
                        }),
                      ],
                    }),
                    SideMenuItem.spacer(),
                    SideMenuItem.button({
                      value: "lout",
                      text: "logout",
                      icon: <LogoutTwoTone />,
                      color: "text.error",
                      bgcolor: "background.white",
                    }),
                  ]}
                />
              }
              header={
                <>
                  <BtnIcon
                    onClick={() => {
                      sm.value = !sm.value;
                    }}
                    children={
                      sm.value ? <ExpandLessTwoTone /> : <ExpandMoreTwoTone />
                    }
                  />
                </>
              }
            />
          </MuiApp>
        );
      }}
    />
  );
};
export default App;
