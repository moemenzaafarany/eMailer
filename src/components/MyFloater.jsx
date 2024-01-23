import { Box } from "@mui/material";

const MyFloater = ({ children, start, end, top, bottom }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        display: "inline",
        top: top,
        bottom: bottom,
        left: start,
        right: end,
      }}
      children={children}
    />
  );
};
export default MyFloater;
