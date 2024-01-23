//
import React from "react";
import { breakPoints } from "./params";
import PropTypes from "prop-types";
import MyItem from "./MyItem";

export const MyLayout = (p) => {
  return (
    <MyItem
      className="my-Layout"
      children={p.children}
      width={"100%"}
      height={"100%"}
      spacing={p.spacing}
      sx={{
        ...p.sx,
        display: "grid",
        gridTemplateAreas: breakPoints(p.areas),
        gridTemplateColumns: breakPoints(p.cols),
        gridTemplateRows: breakPoints(p.rows),
      }}
      loading={p.loading}
      hidden={p.hidden}
    />
  );
};
export const MyLayoutItem = (p) => {
  return (
    <MyItem
      className="my-LayoutItem"
      children={p.children}
      sx={{
        ...p.sx,
        overflowX: p.scrollX ? "scroll" : "hidden",
        overflowY: p.scrollY ? "scroll" : "hidden",
        gridArea: breakPoints(p.area),
      }}
      loading={p.loading}
      hidden={p.hidden}
    />
  );
};
/*
  "'header header' 'aside main' 'footer footer'"
  auto 1fr
  auto
  */
MyLayout.propTypes = {
  sx: PropTypes.object,
  areas: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cols: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};
MyLayoutItem.propTypes = {
  sx: PropTypes.object,
  scrollX: PropTypes.bool,
  scrollY: PropTypes.bool,
  area: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
