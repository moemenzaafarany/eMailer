import { Box, Skeleton } from "@mui/material";
import { ImageNotSupportedTwoTone } from "@mui/icons-material";
import { eUseState } from "react-e-utils";

const MyImage = ({
  src,
  alt,
  width = "auto",
  height = "auto",
  imgWidth,
  imgHeight,
  objectFit = "contain",
  lazy = true,
  bgcolor = "white",
  ...props
}) => {
  const loading = eUseState(!!src);
  const error = eUseState(!src);

  return (
    <Box
      sx={{
        ...(props?.sx ?? {}),
        width: width,
        height: height,
        position: "relative",
        bgcolor: bgcolor,
        display: "block",
        overflow: "hidden",
      }}
    >
      {!error.value && (
        <img
          src={src}
          alt={alt}
          onLoad={() => {
            loading.value = false;
          }}
          onError={() => {
            loading.value = false;
            error.value = true;
          }}
          style={{
            ...(props?.style ?? {}),
            width: imgWidth ?? width,
            height: imgHeight ?? height,
            objectFit,
          }}
          loading={lazy ? "lazy" : "eager"}
          draggable={false}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          inset: 0,
          pointerEvents: "none",
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: bgcolor,
        }}
      >
        {loading.value && (
          <Skeleton variant="rectangle" height={height} width={width} />
        )}
        {error.value && (
          <ImageNotSupportedTwoTone color="primary2" fontSize={"large"} />
        )}
      </Box>
    </Box>
  );
};
export default MyImage;
