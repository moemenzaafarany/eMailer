import { eList, eType } from "react-e-utils";

//==============================< styles
export const mainAlign = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  around: "space-around",
  between: "flex-between",
  evenly: "space-evenly",
};
export const crossAlign = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  around: "space-around",
  between: "flex-between",
  evenly: "space-evenly",
};
export const mainItemAlign = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
  around: "space-around",
  between: "flex-between",
  evenly: "space-evenly",
};
export const crossItemAlign = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
};
export const flexFlow = {
  row: "row",
  column: "column",
  rowReverse: "row-reverse",
  columnReverse: "column-reverse",
};
export const flexWrap = {
  wrap: "wrap",
  nowrap: "nowrap",
};
export const dialogTypes = {
  normal: "normal",
  info: "info",
  alert: "alert",
  success: "success",
  warning: "warning",
  error: "error",
};

//==============================< other ui shit
export const breakPoints = (value, fallback = null, process = null) => {
  if (eType.obj(value)) {
    return eList.forEach(
      ["xs", "sm", "md", "lg", "xl", "mobile", "tablet", "laptop", "desktop"],
      {},
      (k, v, obj) => {
        if (!eType.null(value[v])) {
          obj[v] = eType.func(process) ? process(value[v]) : value[v];
        }
      }
    );
  } else if (!eType.null(value)) {
    return value;
  }
  return fallback;
};
