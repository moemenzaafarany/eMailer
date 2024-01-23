// package
import React from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import PropTypes from "prop-types";
import { Box, ThemeProvider } from "@mui/material";

const MyMuiApp = ({ dir, theme, children, fixedPage }) => {
  //========= rtl fix
  const RtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const LtrCache = createCache({ key: "muiltr" });
  //========= return
  return (
    <CacheProvider value={dir === "rtl" ? RtlCache : LtrCache}>
      <ThemeProvider theme={theme}>
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
          {children}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};
export default MyMuiApp;
MyMuiApp.propTypes = {
  dir: PropTypes.string,
  theme: PropTypes.object,
  children: PropTypes.element,
  fixedPage: PropTypes.bool,
};
