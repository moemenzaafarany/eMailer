import {
  EmailTwoTone,
  PhoneTwoTone,
  SmartphoneTwoTone,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { eDom, eList, eUseState } from "react-e-utils";

const useMyForm = () => {
  const modal = eUseState(null);

  const openAdd = (data) => {
    modal.value = {
      type: 0,
      data: data,
    };
  };
  const openEdit = (data) => {
    modal.value = {
      type: 1,
      data: data,
    };
  };
  const openView = (data) => {
    modal.value = {
      type: 2,
      data: data,
    };
  };
  const closeForm = () => {
    modal.value = null;
  };

  return {
    get modal() {
      return modal.value;
    },
    openAdd,
    openEdit,
    openView,
    closeForm,
  };
};
export default useMyForm;

export const MyFormDialog = ({
  maxWidth = "xl",
  modal,
  title,
  inputs,
  actions,
  onAddSubmit,
  onEditSubmit,
}) => {
  const parse = (arr) => {
    return eList.toArray(arr, (i, item) => {
      let ID = item?.ID;
      delete item?.ID;
      switch (ID) {
        case "input":
          return (
            <MyFormInput
              key={`mdti-${i}`}
              formType={modal?.type}
              formData={modal?.data}
              {...item}
            />
          );
        case "select":
          return (
            <MyFormSelect
              key={`mdts-${i}`}
              formType={modal?.type}
              formData={modal?.data}
              {...item}
            />
          );
        case "action":
          return (
            <MyFormAction
              key={`mdta-${i}`}
              formType={modal?.type}
              formData={modal?.data}
              {...item}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <Dialog fullWidth={true} maxWidth={maxWidth} open={!!modal}>
      <form
        onSubmit={eDom.eventPreventDefault(async (event, target) => {
          let fd = new FormData(target);
          if (modal?.type === 0 && onAddSubmit)
            onAddSubmit({ data: modal?.data, formData: fd });
          if (modal?.type === 1 && onEditSubmit)
            onEditSubmit({ data: modal?.data, formData: fd });
        })}
        encType="multipart/form-data"
      >
        <DialogTitle children={title} />
        <DialogContent>
          <Grid container spacing={1} justifyContent={"space-between"}>
            {inputs && parse(inputs)}
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ pt: 2 }}
            justifyContent={"space-between"}
          >
            {actions && parse(actions)}
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};

const MyFormInput = ({
  formType,
  formData,

  name,
  type = "text",
  label,
  placeholder,
  required,
  startIcon,
  endIcon,
  cols = { xs: 6 },
  view = true,
  add = true,
  edit = true,
  sx,

  min,
  step,
  max,
  minLength,
  maxLength,
  accept,
  multiple = false,
  pattern,
}) => {
  const value = eUseState(formData?.[name] ?? "");

  useEffect(() => {
    if (formData?.[name]) value.value = formData?.[name];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, formData]);

  if (formType === 2) {
    if (view !== true) return null;
    return (
      <MyFormView
        {...{ value: value.value, label, startIcon, endIcon, cols }}
      />
    );
  } else {
    if (formType === 0 && add !== true) return null;
    if (formType === 1 && edit !== true) return null;
    return (
      <Grid item {...cols}>
        <TextField
          name={name}
          type={type}
          label={label}
          required={required}
          placeholder={placeholder}
          value={value.value}
          onChange={(event) => {
            value.value = event.target.value;
          }}
          size="small"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start" children={startIcon} />
            ),
            endAdornment: endIcon && (
              <InputAdornment position="end" children={endIcon} />
            ),
            sx: { py: 1, height: "auto" },
          }}
          inputProps={{
            style: { height: "auto" },
            min,
            step,
            max,
            minLength,
            maxLength,
            accept,
            multiple,
            pattern,
          }}
          sx={sx}
        />
      </Grid>
    );
  }
};

const MyFormSelect = ({
  formType,
  formData,

  name,
  label,
  required,
  startIcon,
  endIcon,
  cols = { xs: 6 },
  view = true,
  add = true,
  edit = true,
  sx,

  options,
  valueKey = "value",
  labelKey = "label",
}) => {
  const value = eUseState(formData?.[name] ?? "");

  useEffect(() => {
    if (formData?.[name]) value.value = formData?.[name];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, formData]);

  if (formType === 2) {
    if (view !== true) return null;
    return (
      <MyFormView
        {...{
          formType,
          value: eList.findInArr(
            options,
            (i, o) => o?.[valueKey] === value.value
          )?.[labelKey],
          label,
          startIcon,
          endIcon,
          cols,
        }}
      />
    );
  } else {
    if (formType === 0 && add !== true) return null;
    if (formType === 1 && edit !== true) return null;
    return (
      <Grid item {...cols}>
        <TextField
          select={true}
          name={name}
          label={label}
          required={required}
          value={value.value}
          onChange={(event) => {
            value.value = event.target.value;
          }}
          size="small"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start" children={startIcon} />
            ),
            endAdornment: endIcon && (
              <InputAdornment position="end" children={endIcon} />
            ),
            sx: { py: 1, height: "auto" },
          }}
          inputProps={{ style: { height: "auto" } }}
          children={eList.toArray(options, (i, item) => (
            <MenuItem
              key={`so-${i}`}
              value={item?.[valueKey] ?? ""}
              children={item?.[labelKey] ?? ""}
            />
          ))}
          sx={sx}
        />
      </Grid>
    );
  }
};

const MyFormView = ({ value, label, startIcon, endIcon, cols = { xs: 6 } }) => {
  return (
    <Grid item {...cols}>
      <TextField
        label={label}
        value={value}
        variant="standard"
        size="small"
        margin="dense"
        fullWidth
        readOnly={true}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start" children={startIcon} />
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end" children={endIcon} />
          ),
          sx: { py: 1, height: "auto" },
        }}
        inputProps={{ style: { height: "auto" } }}
      />
    </Grid>
  );
};

const MyFormAction = ({
  formType,
  formData,
  closeForm,

  name,
  label,
  type = "button",
  variant = "outlined",
  icon,
  color = "primary",
  onClick,
  cols = { xs: 6 },
  close = false,
  sx,
  fullWidth,

  add = true,
  edit = true,
  view = true,
}) => {
  if (formType === 0 && add !== true) return null;
  if (formType === 1 && edit !== true) return null;
  if (formType === 2 && view !== true) return null;
  return (
    <Grid item {...cols}>
      <LoadingButton
        type={type}
        variant={variant}
        color={color}
        startIcon={icon}
        onClick={close === true ? closeForm : onClick}
        children={label}
        sx={sx}
        name={name}
        fullWidth={fullWidth}
      />
    </Grid>
  );
};

// view, edit, add
// onView, onEdit, onAdd
// show/hide based on view edit and

export const MyForm = {
  input: {
    custom: ({
      name,
      type = "text",
      label,
      placeholder,
      required,
      startIcon,
      endIcon,
      cols = { xs: 6 },
      view = true,
      add = true,
      edit = true,
      sx,
      min,
      step,
      max,
      minLength,
      maxLength,
      accept,
      multiple = false,
      pattern,
    }) => {
      return {
        ID: "input",

        name,
        type,
        label,
        placeholder,
        required,
        startIcon,
        endIcon,
        cols,
        view,
        add,
        edit,
        sx,

        min,
        step,
        max,
        minLength,
        maxLength,
        accept,
        multiple,
        pattern,
      };
    },
    text: ({
      name,
      type = "text",
      label,
      placeholder,
      required,
      startIcon,
      endIcon,
      cols = { xs: 6 },
      view = true,
      add = true,
      edit = true,
      sx,

      minLength,
      maxLength,
      pattern,
    }) =>
      MyForm.input.custom({
        name,
        type,
        label,
        placeholder,
        required,
        startIcon,
        endIcon,
        cols,
        view,
        add,
        edit,
        sx,

        minLength,
        maxLength,
        pattern,
      }),
    email: ({
      name,
      type = "email",
      label,
      placeholder,
      required,
      startIcon = <EmailTwoTone />,
      endIcon,
      cols = { xs: 6 },
      view = true,
      add = true,
      edit = true,
      sx,

      minLength,
      maxLength,
    }) =>
      MyForm.input.custom({
        name,
        type,
        label,
        placeholder,
        required,
        startIcon,
        endIcon,
        cols,
        view,
        add,
        edit,
        sx,

        minLength,
        maxLength,
      }),
    number: ({
      name,
      type = "number",
      label,
      placeholder,
      required,
      startIcon,
      endIcon,
      cols = { xs: 6 },
      view = true,
      add = true,
      edit = true,
      sx,

      minLength,
      maxLength,
      min,
      max,
      step,
    }) =>
      MyForm.input.custom({
        name,
        type,
        label,
        placeholder,
        required,
        startIcon,
        endIcon,
        cols,
        view,
        add,
        edit,
        sx,

        minLength,
        maxLength,
        min,
        max,
        step,
      }),
    amount: ({
      name,
      type = "number",
      label,
      placeholder,
      required,
      startIcon,
      endIcon,
      cols = { xs: 6 },
      view = true,
      add = true,
      edit = true,
      sx,

      minLength,
      maxLength,
      min,
      max,
      step = "0.01",
    }) =>
      MyForm.input.custom({
        name,
        type,
        label,
        placeholder,
        required,
        startIcon,
        endIcon,
        cols,
        view,
        add,
        edit,
        sx,

        minLength,
        maxLength,
        min,
        max,
        step,
      }),
    phone: ({
      name,
      type = "tel",
      label,
      placeholder,
      required,
      startIcon = <PhoneTwoTone />,
      endIcon,
      cols = { xs: 6 },
      view = true,
      add = true,
      edit = true,
      sx,

      minLength,
      maxLength,
    }) =>
      MyForm.input.custom({
        name,
        type,
        label,
        placeholder,
        required,
        startIcon,
        endIcon,
        cols,
        view,
        add,
        edit,
        sx,

        minLength,
        maxLength,
      }),
    mobile: ({
      name,
      type = "tel",
      label,
      placeholder,
      required,
      startIcon = <SmartphoneTwoTone />,
      endIcon,
      cols = { xs: 6 },
      view = true,
      add = true,
      edit = true,
      sx,

      minLength,
      maxLength,
    }) =>
      MyForm.input.custom({
        name,
        type,
        label,
        placeholder,
        required,
        startIcon,
        endIcon,
        cols,
        view,
        add,
        edit,
        sx,

        minLength,
        maxLength,
      }),
  },
  select: ({
    name,
    label,
    required,
    startIcon,
    endIcon,
    cols = { xs: 6 },
    options,
    valueKey = "value",
    labelKey = "label",
    sx,

    view = true,
    add = true,
    edit = true,
  }) => {
    return {
      ID: "select",

      name,
      label,
      required,
      startIcon,
      endIcon,
      cols,
      options,
      valueKey,
      labelKey,
      sx,

      view,
      add,
      edit,
    };
  },
  action: ({
    name,
    label,
    type = "button",
    icon,
    color = "primary",
    variant = "outlined",
    onClick,
    cols = {},
    close = false,
    sx,
    loading = false,
    fullWidth,

    view = true,
    add = true,
    edit = true,
  }) => {
    return {
      ID: "action",

      name,
      label,
      type,
      icon,
      color,
      variant,
      onClick,
      cols,
      close,
      sx,
      loading,
      fullWidth,

      view,
      add,
      edit,
    };
  },
};
