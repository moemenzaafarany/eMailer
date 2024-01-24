// package
import React from "react";
import { Typography } from "@mui/material";

const T = {
  p: (props) => <Typography {...props} />,
  h1: (props) => <Typography variant="h1" {...props} />,
  h2: (props) => <Typography variant="h2" {...props} />,
  h3: (props) => <Typography variant="h3" {...props} />,
  h4: (props) => <Typography variant="h4" {...props} />,
  h5: (props) => <Typography variant="h5" {...props} />,
  h6: (props) => <Typography variant="h6" {...props} />,
  subtitle1: (props) => <Typography variant="subtitle1" {...props} />,
  subtitle2: (props) => <Typography variant="subtitle2" {...props} />,
  body1: (props) => <Typography variant="body1" {...props} />,
  body2: (props) => <Typography variant="body2" {...props} />,
  button: (props) => <Typography variant="button" {...props} />,
  caption: (props) => <Typography variant="caption" {...props} />,
  overline: (props) => <Typography variant="overline" {...props} />,
  inherit: (props) => <Typography variant="inherit" {...props} />,
};
export default T;
