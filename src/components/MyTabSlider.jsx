import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import MyImage from "./MyImage";
import { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { eList, eUse } from "react-e-utils";

const MyTabSlider = forwardRef(
  (
    {
      data,
      value,
      onChange, // = (index, item) => null,
      onClick, // = (index, item) => null,
      linkTo, // = (index, item)=>null,
      customKey, // = (item) => null,
      label, // = (item, selected) => null,
      icon, // = (item, selected) => null,
      scrollButtons = "auto",
      orientation = "horizontal",
      iconPosition = "top",
      spacing = 1,
      borderRadius = 1,
      width,
      height,
      sx,
    },
    ref
  ) => {
    const val = eUse.State((value && parseInt(value)) ?? 0);

    // on mounted
    useEffect(() => {
      // reset current func
      if (ref?.current) {
        ref.current.setValue = (index) => {
          val.value = parseInt(index);
        };
        ref.current.value = val.value;
      }
      // eslint-disable-next-line
    }, []);

    return (
      <Tabs
        ref={ref}
        value={val.value}
        onChange={(evt, index) => {
          index = parseInt(index);
          val.value = index;
          if (onChange) onChange(index, data?.[index]);
        }}
        variant="scrollable"
        scrollButtons={scrollButtons}
        allowScrollButtonsMobile={true}
        orientation={orientation}
        sx={{
          width: orientation === "vertical" ? "auto" : "100%",
          height: orientation === "vertical" ? "100%" : "auto",
          minHeight: "unset",
        }}
        TabIndicatorProps={{
          sx: { display: "none" },
        }}
        // TabScrollButtonProps={{ }}
      >
        {eList.toArray(data, (index, item) => {
          index = parseInt(index);

          var labelEl = label && label(item, index === val.value);
          var iconEl = icon && icon(item, index === val.value);

          if (linkTo && labelEl) {
            labelEl = (
              <Link
                to={linkTo(index, item)}
                style={{
                  display: "contents",
                  textDecoration: "none",
                  color: "unset",
                  width: "100%",
                  height: "100%",
                }}
                children={labelEl}
              />
            );
          }
          if (linkTo && iconEl) {
            iconEl = (
              <Link
                to={linkTo(index, item)}
                style={{
                  display: "contents",
                  textDecoration: "none",
                  color: "unset",
                  width: "100%",
                  height: "100%",
                }}
                children={iconEl}
              />
            );
          }

          return (
            <Tab
              key={`${customKey && customKey(item)}msv-${index}`}
              iconPosition={iconPosition}
              onClick={onClick && (() => onClick(index, item))}
              value={index}
              icon={iconEl ?? null}
              label={labelEl ?? null}
              sx={{
                borderWidth: 2,
                borderStyle: "solid",
                padding: 0,
                borderRadius: borderRadius,
                bgcolor: "light",
                ...((sx && sx(index === val.value)) ?? {}),
                minWidth: "unset",
                maxWidth: "unset",
                width: width,
                height: height,
                mx: orientation === "vertical" ? 0 : spacing,
                my: orientation === "vertical" ? spacing : 0,
                alignSelf: "stretch",
                justifyContent: "start",
                overflow: "hidden",
                minHeight: "unset",
              }}
            />
          );
        })}
      </Tabs>
    );
  }
);
export default MyTabSlider;

export const MyTabSliderLabel = ({
  text,
  variant = "caption",
  maxLines = 2,
  width = "auto",
  height = "max-content",
  px = 0.1,
  py = 0.1,
  color = "primary",
}) => {
  return (
    <Typography
      variant={variant}
      sx={{
        width: width,
        height: height,
        px: px,
        py: py,
        display: "-webkit-box",
        overflow: "hidden",
        ...((maxLines && {
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: maxLines,
        }) ??
          {}),
        color: color,
        opacity: 1,
        verticalAlign: "middle",
      }}
      children={text}
    />
  );
};

export const MyTabSliderImage = ({
  src,
  alt,
  width,
  height,
  borderWidth = 0,
  borderRadius = 1,
  objectFit = "cover",
  borderColor = "inherit",
  bgcolor = "white",
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: width,
        height: height,
        overflow: "hidden",
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        borderColor: borderColor,
        bgcolor: bgcolor,
      }}
    >
      <MyImage
        bg="white"
        width="100%"
        height="100%"
        objectFit={objectFit}
        src={src}
        alt={alt}
        draggable={false}
      />
    </Card>
  );
};
export const MyTabSliderIcon = ({
  icon,
  width,
  height,
  borderWidth = 0,
  borderRadius = 1,
  borderColor = "inherit",
  bgcolor = "white",
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        width: width,
        height: height,
        overflow: "hidden",
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        borderColor: borderColor,
        bgcolor: bgcolor,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        children={icon}
      />
    </Card>
  );
};
