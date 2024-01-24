import { createTheme, responsiveFontSizes } from "@mui/material";
import { eList, eColor } from "react-e-utils";

const eCreateMuiTheme = ({
  dir = "ltr",
  mode = "light",
  fontSize = 14,
  fontResizeFactor = 5,
  fontFamily = "sans-serif",

  defaultTextColor = "#333",
  defaultBGColor = "#000",
  colors = {
    primary: "#0099ff",
    secondary: "#000",
    tertiary: "#000",
    accent: "#000",

    light: "rgb(238, 238, 238)",
    dark: "rgb(51, 51, 51)",
    error: "rgb(220, 53, 69)",
    warning: "rgb(255, 193, 7)",
    success: "rgb(40, 167, 69)",
    info: "rgb(23, 162, 184)",
    link: "rgb(138, 180, 248)",
    linkClicked: "rgb(197, 138, 249)",
    white: "#fff",
    black: "#000",
  },

  sizeBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xx: 1440,
  },
  deviceBreakpoints = {
    mobile: 0,
    tablet: 640,
    laptop: 1024,
    desktop: 1440,
  },
} = {}) => {
  function getShadesObj(key, color, palette = true, shades = 10, alphas = 10) {
    return eList.generateObject(shades - 1, (i) => {
      let num = (i + 1) * (100 / shades);
      let change = num / 100;
      let k2 = `${key}${num}`;
      let subColor = color.setShade(change);
      return {
        [k2]: palette ? getPalette(subColor) : subColor.getRGBA,
        ...getAlphasObj(k2, subColor, palette, alphas),
      };
    });
  }
  function getAlphasObj(key, color, palette = true, alphas = 10) {
    return eList.generateObject(alphas - 1, (i) => {
      let num = (i + 1) * (100 / alphas);
      let change = num / 100;
      let k2 = `${key}t${num}`;
      let subColor = color.setFade(change);
      return {
        [k2]: palette ? getPalette(subColor) : subColor.getRGBA,
      };
    });
  }
  function getPalette(color) {
    return {
      main: color.RGBA,
      dark: color.darken(0.35).RGBA,
      light: color.lighten(0.35).RGBA,
      contrastText: color.contrastShadeColor.RGBA,
    };
  }

  var paletteColors = eList.toObject(colors, (k, v, obj) => {
    let c = eColor.parse(v);
    return {
      [k]: getPalette(c),
      ...getAlphasObj(k, c),
      ...getShadesObj(k, c),
    };
  });
  var bgColors = eList.toObject(colors, (k, v, obj) => {
    let c = eColor.parse(v);
    return {
      [k]: c.RGBA,
      ...getAlphasObj(k, c, false),
      ...getShadesObj(k, c, false),
    };
  });

  var theme = createTheme({
    direction: dir,
    palette: {
      mode: mode,
      ...paletteColors,
      text: {
        default: defaultTextColor,
        ...bgColors,
      },
      background: {
        default: defaultBGColor,
        ...bgColors,
      },
    },
    typography: {
      fontFamily: fontFamily,
      fontSize: fontSize,
      htmlFontSize: fontSize + 2,
    },
    breakpoints: {
      values: { ...sizeBreakpoints, ...deviceBreakpoints },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: "unset", // unset minwidth of buttons
          },
        },
      },
    },
  });
  theme = responsiveFontSizes(theme, {
    breakpoints: eList.keysOfObj(sizeBreakpoints),
    factor: fontResizeFactor,
  });
  return theme;
};
export default eCreateMuiTheme;
