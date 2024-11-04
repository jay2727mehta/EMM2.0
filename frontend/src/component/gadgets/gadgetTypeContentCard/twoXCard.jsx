import { Box, Typography } from "@mui/material";
import React from "react";
import twoImg from "./images/mediumcard.png";

const TwoXCard = () => {
  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
  };

  return (
    <Box sx={{ borderRadius: "15px", border: styles.thinBorder }}>
      <img
        width="100%"
        height="100%"
        src={twoImg}
        style={{ borderRadius: "15px" }}
      />
    </Box>
  );
};

export default TwoXCard;
