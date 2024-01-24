import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const Scaffold = ({
  header,
  headerProps,
  body,
  bodyProps,
  footer,
  footerProps,
  menuLeft,
  menuLeftProps,
  menuRight,
  menuRightProps,
  fixedPage = true,
  bodyScroll = true,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas:
          "'header header header' 'menuLeft body menuRight' 'footer footer footer'",
        gridTemplateColumns: "auto 1fr auto",
        gridTemplateRows: "auto 1fr auto",
        ...(fixedPage && {
          position: "fixed",
          width: "100%",
          height: "100%",
          overflow: "auto",
          ...(bodyScroll && {
            overflow: "hidden",
          }),
        }),
      }}
    >
      {header && (
        <Box
          {...headerProps}
          sx={{
            ...headerProps?.sx,
            width: "100%",
            display: "block",
            gridArea: "header",
          }}
          children={header}
        />
      )}
      {body && (
        <Box
          {...bodyProps}
          sx={{
            ...bodyProps?.sx,
            width: "100%",
            display: "block",
            gridArea: "body",
            ...(bodyScroll && {
              height: "100%",
              overflow: "auto",
            }),
          }}
          children={body}
        />
      )}
      {menuLeft && (
        <Box
          {...menuLeftProps}
          sx={{
            ...menuLeftProps?.sx,
            display: "block",
            gridArea: "menuLeft",
          }}
          children={menuLeft}
        />
      )}
      {menuRight && (
        <Box
          {...menuRightProps}
          sx={{
            ...menuRightProps?.sx,
            display: "block",
            gridArea: "menuRight",
          }}
          children={menuRight}
        />
      )}
      {footer && (
        <Box
          {...footerProps}
          sx={{
            ...footerProps?.sx,
            width: "100%",
            display: "block",
            gridArea: "footer",
          }}
          children={footer}
        />
      )}
    </Box>
  );
};
Scaffold.propTypes = {
  header: PropTypes.node,
  headerProps: PropTypes.object,
  body: PropTypes.node,
  bodyProps: PropTypes.object,
  footer: PropTypes.node,
  footerProps: PropTypes.object,
  menuLeft: PropTypes.node,
  menuLeftProps: PropTypes.object,
  menuRight: PropTypes.node,
  menuRightProps: PropTypes.object,
  fixedPage: PropTypes.bool,
  bodyScroll: PropTypes.bool,
};
export default Scaffold;
