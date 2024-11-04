import { Button, Typography } from "@mui/material";
import React from "react";

const CustomButton = ({ data }) => {
  return (
    <Button
      onClick={() => {
        data.handleClick();
      }}
      sx={{
        color: data.color ? data.color : "inherit", // Text color
        border: data.border ? data.border : "none", // Border
        backgroundColor: data.backgroundColor
          ? data.backgroundColor
          : "transparent", // Background color
        fontSize: data.fontSize ? data.fontSize : "16px", // Font size
        "&:hover": {
          backgroundColor: data.hoverBackgroundColor
            ? data.hoverBackgroundColor
            : "darkblue", // Background color on hover
        },

        width: data.width,
        height: data.height,
      }}
    >
      <Typography sx={{ textDecoration: "underline", textAlign: "left" }}>
        {data.label}
      </Typography>
    </Button>
  );
};

export default CustomButton;
