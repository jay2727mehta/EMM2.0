import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import AllGateways from "./allGateways";
import AllNodes from "./allNodes";
import { useNavigate } from 'react-router-dom';

const StyledToggleButton = styled(ToggleButton)(({ selected }) => ({
  width: "100px",
  height: "30px",
  // fontSize : 10,
  background: selected ? "#FFFFFF" : "#EBEBEB",
  borderRadius: "5px",
  transition: "background-color 0.5s ease",
  boxShadow: selected ? "0 1px 2px" : "none",
  "&.Mui-selected": {
    animation: selected === 'gateway' ?  "fadeIn 3s" : "fadeOut 3s",
    backgroundColor: "#FFFFFF",
    color: "#202020",
    borderRadius: "5px",
    boxShadow: '0 1px 2px',
  },
  "&.Mui-disabled": {
    opacity: 1, // Maintain the opacity for the selected disabled button
    backgroundColor: "#FFFFFF", // Light gray background for disabled state
  },
}));

const ToggleButtonComponent = ({ handleValue }) => {
  const [value, setValue] = useState("gateway");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  const handleGateways = () => {
    handleValue('gateway')
  }

  const handleNodes = () => {
    handleValue('node')
  }

  return (
    <Box>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="toggle button group"
        sx={{
          justifyContent: "center",
          padding: "5px",
          width: "250px",
          gap: "5px",
          bgcolor: "#EBEBEB",
          borderRadius: "10px",
        }}
      >
        <StyledToggleButton
          value="gateway"
          aria-label="gateway"
          selected={value === "gateway"}
          sx={{ width: "100%", border: "none" }}
          onClick={handleGateways}
          disabled={value === "gateway"}
        >
          ゲートウェイ
        </StyledToggleButton>
        <StyledToggleButton
          value="node"
          aria-label="node"
          selected={value === "node"}
          sx={{ width: "100%", border: "none" }}
          onClick={handleNodes}
          disabled={value === "node"}
        >
          ノード
        </StyledToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleButtonComponent;
