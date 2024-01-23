//
import React from "react";
import { Typography, Card, Stack, Radio, CardActionArea } from "@mui/material";
//
const MyRadioWideCard = ({ value, title, content, checked = false }) => {
  return (
    <Card
      variant={"outlined"}
      sx={{
        position: "relative",
        width: "100%",
        height: "auto",
        bgcolor: "background.white",
        borderColor: "light.main",
      }}
      square
    >
      <CardActionArea>
        <Stack direction="column" spacing={0.5} sx={{ px: 0.75, py: 1 }}>
          <Stack direction="row" spacing={0.5} alignItems={"center"}>
            <Radio
              value={value}
              checked={checked}
              size={"small"}
              color="secondary"
              sx={{ p: 0.5 }}
            />

            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: "bold",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {title}
            </Typography>
          </Stack>

          {content}
        </Stack>
      </CardActionArea>
    </Card>
  );
};
export default MyRadioWideCard;
