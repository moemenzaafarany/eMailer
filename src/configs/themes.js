import { createTheme, responsiveFontSizes } from "@mui/material";
import { eUseTranslation, eList, eColor } from "react-e-utils";
import { primaryColor, primaryTextColor, secondColor } from "./params";

export function DefaultTheme() {
  const { fontfamily, dir } = eUseTranslation();
  const colors = {
    primary: eColor.parse(primaryColor),
    secondary: eColor.parse(secondColor),
    white: eColor.colors.white,
    light: eColor.parse("#eee"),
    dark: eColor.parse("#333"),
    black: eColor.colors.black,
    error: eColor.colors.error,
    warning: eColor.colors.warning,
    alert: eColor.colors.alert,
    info: eColor.parse("#0066cc"),
    success: eColor.colors.success,
  };

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

  var material = createTheme({
    direction: dir,
    palette: {
      mode: "light",
      ...paletteColors,
      text: {
        primary: eColor.parse(primaryTextColor).RGBA,
      },
      background: {
        default: "#eee",
        paper: "#fff",
        ...bgColors,
      },
    },
    typography: {
      fontFamily: fontfamily,
      fontSize: 14,
      htmlFontSize: 16,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xx: 1440,

        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1440,
      },
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

  material = responsiveFontSizes(material, {
    breakpoints: ["xs", "sm", "md", "lg", "xl", "xx"],
    factor: 5,
  });

  return { material: material };
}
