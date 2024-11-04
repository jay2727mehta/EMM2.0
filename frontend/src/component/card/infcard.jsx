import React from "react";
import { Box, Typography } from "@mui/material";
import { useFitText } from "../config/fontResizeConfig";

const Infocard = ({ data }) => {
  const { ref } = useFitText();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width: 200, height: 100, flexWrap: 'wrap' }}
    >
      <Typography fontWeight={"bold"}>{data.heading.toUpperCase()}</Typography>
      <Typography color={"blue"} style={{
         wordBreak: "break-word",
      }}>{data.value.toString().toUpperCase()}</Typography>
    </Box>
  );
};

export default Infocard;
