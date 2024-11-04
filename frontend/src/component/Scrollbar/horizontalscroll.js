import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const HorizontalScrollableBox = styled(Box)({
    position : 'relative',
    width: "100%",
    padding : '8px',
    overflowX: "auto",
    overflowY: "hidden", // Hide vertical scroll
    whiteSpace: "nowrap", // Ensures the content stays in one line for horizontal scrolling
    "&::-webkit-scrollbar": {
        //width : '5px',
      height: "4px", // Adding height for horizontal scrollbar
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "5px", // Thinner radius for smaller thumb
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
});

export default HorizontalScrollableBox;
