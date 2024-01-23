// package
import React from "react";
import { RouterProvider } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import PropTypes from "prop-types";
import { Box, ThemeProvider } from "@mui/material";
import { eType, eUseTranslation } from "react-e-utils";

// myApp
export const MyApp = ({
  providers,
  router,
  routesBasename,
  themes,
  fixedPage,
}) => {
  //========= children
  let children = (
    <SubApp
      router={router}
      routesBasename={routesBasename}
      themes={themes}
      fixedPage={fixedPage}
    />
  );
  //========= providers
  if (!eType.arr(providers)) providers = [];
  // set children
  children = providers.reverse().reduceRight((accumulated, obj) => {
    if (eType.obj(obj)) {
      return <obj.provider {...obj.props}>{accumulated}</obj.provider>;
    }
    return accumulated;
  }, children);
  //========= return
  return children;
};
MyApp.propTypes = {
  providers: PropTypes.array,
  routes: PropTypes.array,
  routesBasename: PropTypes.string,
  materialTheme: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  fixedPage: PropTypes.bool,
};
// setup
export const MyAppProvider = (provider, props) => {
  return { provider, props };
};
//
const SubApp = ({ router, routesBasename, themes, fixedPage }) => {
  //========= settings
  const { dir, forDir } = eUseTranslation();
  //========= rtl fix
  const RtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const LtrCache = createCache({ key: "muiltr" });
  //========= theme
  themes = eType.func(themes) ? themes() : themes;
  //======== return
  return (
    <CacheProvider value={forDir(LtrCache, RtlCache)}>
      <ThemeProvider theme={themes.material}>
        <Box
          dir={dir}
          sx={{
            display: "block",
            overflow: "auto",
            color: "primary",

            ...(fixedPage === true
              ? {
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                }
              : {}),
          }}
        >
          <RouterProvider router={router} routesBasename={routesBasename} />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};
