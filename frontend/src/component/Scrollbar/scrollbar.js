import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ScrollableBox = styled(Box)({
  width: "100%",
  height: "750px",
  overflow : 'auto',
  padding: "10px",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px", // Adding height for horizontal scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "5px", // Thinner radius for smaller thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
});

export default ScrollableBox;
