//
import React from "react";
import PropTypes from "prop-types";
import {
  breakPoints,
  flexFlow,
  flexWrap,
  mainAlign,
  crossAlign,
  mainItemAlign,
  crossItemAlign,
} from "./params";
// material
import { Box, Skeleton } from "@mui/material";
//==============================< Item
const MyItem = (p) => {
  return p.hidden === true ? null : (
    <Box
      className={`my-Item ${p.className ?? ""}`}
      sx={{
        ...(p.flex === true
          ? {
              display: "inline-flex",
              flexDirection: p.flow ?? flexFlow.col,
              flexWrap: p.wrap ?? flexWrap.wrap,
              justifyContent: p.main ?? mainAlign.start,
              alignContent: p.cross ?? crossAlign.start,
              justifyItems: p.mainItem ?? mainItemAlign.start,
              alignItems: p.crossItem ?? crossItemAlign.start,
            }
          : { display: "inline-block" }),
        gap: breakPoints(p.spacing),
        ...p.sx,
        width: breakPoints(p.width),
        height: breakPoints(p.height),
        flexGrow: breakPoints(p.grow, 0),
        flexShrink: breakPoints(p.shrink, 0),
        flexBasis: breakPoints(p.basis, "auto"),
      }}
      children={
        p.loading === true ? <Skeleton variant="rectangular" /> : p.children
      }
    />
  );
};
MyItem.propTypes = {
  sx: PropTypes.object,
  className: PropTypes.string,
  flow: PropTypes.string,
  wrap: PropTypes.string,
  main: PropTypes.string,
  cross: PropTypes.string,
  mainItem: PropTypes.string,
  crossItem: PropTypes.string,
  flex: PropTypes.bool,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  grow: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  shrink: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  basis: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
};
export default MyItem;
