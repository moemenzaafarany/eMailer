import { ShareTwoTone } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const MyShareBtn = ({ color, size, fontSize, url, title, text }) => {
  // Check if the navigator.share is supported
  const isSupported = navigator.share;

  const handleShare = () => {
    if (isSupported) {
      navigator
        .share({
          title: title, // Title of the thing you want to share.
          text: text, // Description or more detailed text to share.
          url: url, // URL to share.
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback code. Could be showing a modal, copying the URL to clipboard, etc.
      console.log(
        "Web Share not supported on this browser, implement fallback mechanism"
      );
    }
  };

  return (
    // Only render the button if Web Share API is available
    isSupported && (
      <IconButton onClick={handleShare} color={color} size={size}>
        <ShareTwoTone fontSize={fontSize} />
      </IconButton>
    )
  );
};
export default MyShareBtn;
