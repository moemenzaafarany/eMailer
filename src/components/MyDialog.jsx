import { InfoTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { cloneElement } from "react";
import { eList, eUseRef, eUseState } from "react-e-utils";

const useMyDialog = () => {
  return {
    createMyDialog,
    createMyAlert,
    createMyConfirm,
    MyDialogWidget: MyDialogWidget,
    MyDialogAction: MyDialogAction,
  };
};
export default useMyDialog;

export const createMyDialog = ({
  maxWidth = "xs",
  icon = <InfoTwoTone />,
  iconColor = "secondary",
  content,
  actions = [],
}) => {
  const open = eUseState(false);
  const contRef = eUseRef(content);
  const actionsRef = eUseRef(actions);

  const openDialog = ({ content, actions }) => {
    if (content) contRef.value = content;
    if (actions) actionsRef.value = actions;
    open.value = true;
  };
  const closeDialog = () => (open.value = false);

  return {
    openDialog,
    closeDialog,
    dialogWidget: MyDialogWidget({
      open: open.value,
      onClose: closeDialog,
      maxWidth,
      icon,
      iconColor,
      content: contRef.value,
      actions: actionsRef.value,
    }),
  };
};
export const createMyAlert = ({
  maxWidth = "xs",
  icon = <InfoTwoTone />,
  iconColor = "secondary",
  content,
  action,
}) => {
  return createMyDialog({
    maxWidth,
    icon,
    iconColor,
    content,
    actions: [action],
  });
};
export const createMyConfirm = ({
  maxWidth = "xs",
  icon = <InfoTwoTone />,
  iconColor = "secondary",
  content,
  yesAction,
  noAction,
}) => {
  return createMyDialog({
    maxWidth,
    icon,
    iconColor,
    content,
    actions: [yesAction, noAction],
  });
};
export const MyDialogWidget = ({
  open,
  onClose,
  maxWidth = "xs",
  icon = <InfoTwoTone />,
  iconColor = "secondary",
  content,
  actions = [],
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
      PaperProps={{ sx: { overflow: "visible", overflowY: "visible" } }}
    >
      <Box
        sx={{ textAlign: "center", mt: -10 }}
        children={
          <Box
            sx={{
              bgcolor: "background.white",
              borderRadius: "100%",
              width: 125,
              height: 125,
              overflow: "hidden",
              mx: "auto",
            }}
            children={cloneElement(icon, {
              className: "animate-pulsate-fwd",
              sx: {
                width: "100%",
                height: "100%",
              },
              color: iconColor,
            })}
          />
        }
      />

      <DialogTitle children={content} sx={{ textAlign: "center" }} />
      <DialogActions>
        <Grid container spacing={1}>
          {eList.toArray(
            actions,
            (
              index,
              { linkTo, onClick, close, variant, color, startIcon, text, flex }
            ) => {
              if (close) {
                linkTo = null;
                onClick = onClose;
              }

              return (
                <Grid key={`dal-${index}`} item xs={flex}>
                  <Button
                    {...(linkTo
                      ? { component: Link, to: linkTo }
                      : { onClick: onClick })}
                    variant={variant}
                    color={color}
                    startIcon={startIcon}
                    children={text}
                    fullWidth={true}
                    sx={{ px: 0.5 }}
                  />
                </Grid>
              );
            }
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
export const MyDialogAction = ({
  linkTo,
  onClick,
  close = false,
  variant = "outlined",
  color = "secondary",
  startIcon,
  text,
  flex = 6,
}) => {
  return { linkTo, onClick, close, variant, color, startIcon, text, flex };
};
