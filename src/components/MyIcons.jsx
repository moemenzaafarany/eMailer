import { Box } from "@mui/material";

const MyIcons = ({ baseIcon, children }) => {
  return (
    <Box
      sx={{
        display: "contents",
        position: "relative",
        width: "min-content",
        height: "min-content",
      }}
    >
      {baseIcon}
      {children}
    </Box>
  );
};
export default MyIcons;

export const MySubIcon = ({ icon, h, v }) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: "auto",
        left: "auto",
        width: "min-content",
        height: "min-content",
        transform: `translateX(${h && h !== 0 ? h / 10 : 0}rem) translateY(${
          v && v !== 0 ? v / 10 : 0
        }rem)`,
      }}
      children={icon}
    />
  );
};
