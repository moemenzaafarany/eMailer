// package
import React from "react";
import { Button, ButtonBase, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const BtnBase = (props) => <ButtonBase {...props} />;
export const BtnText = (props) => <Button variant="text" {...props} />;
export const BtnFill = (props) => <Button variant="contained" {...props} />;
export const BtnBrdr = (props) => <Button variant="outlined" {...props} />;
export const BtnTextLoading = (props) => (
  <LoadingButton variant="text" {...props} />
);
export const BtnFillLoading = (props) => (
  <LoadingButton variant="contained" {...props} />
);
export const BtnBrdrLoading = (props) => (
  <LoadingButton variant="outlined" {...props} />
);
export const BtnIcon = (props) => <IconButton {...props} />;
