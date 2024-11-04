import React, { useEffect, useState } from "react";
import { Box, keyframes } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const flashAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const StatusIndicator = ({ isActive }) => {
  const [color, setColor] = useState(isActive ? "red" : "green");

  useEffect(() => {
    setColor(isActive ? "red" : "green");
  }, [isActive]);

  return (
    <Box
      width={25}
      height={25}
      borderRadius="50%"
      bgcolor={color}
      sx={{
        animation:
          isActive && color === "red"
            ? `${flashAnimation} 1.5s infinite`
            : "none",
      }}
    />
  );
};

export default StatusIndicator;
