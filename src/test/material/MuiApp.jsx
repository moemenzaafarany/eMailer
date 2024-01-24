// package
import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const MuiApp = ({ locale = "en", dir = "ltr", theme, children }) => {
  //========= rtl fix
  const RtlCache = createCache({
    key: "mui-rtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const LtrCache = createCache({ key: "mui-ltr" });

  // document
  document.documentElement.lang = locale;
  document.documentElement.dir = dir;

  // return
  return (
    <CacheProvider value={dir === "rtl" ? RtlCache : LtrCache}>
      {theme ? (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ) : (
        children
      )}
    </CacheProvider>
  );
};
MuiApp.propTypes = {
  locale: PropTypes.string,
  dir: PropTypes.string,
  theme: PropTypes.object,
  children: PropTypes.node,
};
export default MuiApp;
