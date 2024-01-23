//
import React from "react";
import PropTypes from "prop-types";
import { eType } from "react-e-utils";
import MyItem from "./MyItem";
import { breakPoints } from "./params";

//==============================< Grid
export const MyGrid = (p) => {
  return (
    <MyItem
      className="my-Grid"
      width={"100%"}
      spacing={p.spacing}
      main={p.main}
      cross={p.cross}
      mainItem={p.mainItem}
      crossItem={p.crossItem}
      sx={{
        ...p.sx,
        display: "grid",
        gridTemplateColumns: breakPoints(p.cols, 0, (v) =>
          !eType.num(v) ? "auto" : `repeat(${v}, minmax(0, 1fr))`
        ),
        gridAutoRows: breakPoints(p.rowHeight, "minmax(0, 1fr)"),
      }}
      children={p.children}
      loading={p.loading}
      hidden={p.hidden}
    />
  );
};
export const MyGridItem = (p) => {
  return (
    <MyItem
      className="my-GridItem"
      children={p.children}
      width={"100%"}
      height={"100%"}
      sx={{
        ...p.sx,
        gridColumn: breakPoints(p.rows, null, (v) =>
          !eType.num(v) ? "auto" : `span ${v}`
        ),
        gridRow: breakPoints(p.spacing, null, (v) =>
          !eType.num(v) ? "auto" : `span ${v}`
        ),
      }}
      loading={p.loading}
      hidden={p.hidden}
    />
  );
};
MyGrid.propTypes = {
  sx: PropTypes.object,
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  rowHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  main: PropTypes.string,
  cross: PropTypes.string,
  mainItem: PropTypes.string,
  crossItem: PropTypes.string,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};
MyGridItem.propTypes = {
  sx: PropTypes.object,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};
