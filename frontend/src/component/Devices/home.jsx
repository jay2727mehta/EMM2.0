import React, { useState } from "react";
import GatewayCard from "./gatewayCard";
import { Box, Divider, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButtonComponent from "../toggleButton";
import AllGateways from "./allGateways";
import AllNodes from "./allNodes";

const GatewayHome = () => {
  const [value,setValue] = useState('gateway')

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
  };

  const handleValue = (val) => {
    setValue(val)
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // position: "fixed",
          top: 0,
          width: "100%",
          marginTop: -10,
        }}
      >
        <TextField
          type="search"
          placeholder="Search"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CiSearch />
              </InputAdornment>
            ),
          }}
        />
        <Box marginRight="50px">
          <ToggleButtonComponent handleValue={handleValue} />
        </Box>
      </Box>
      <Divider sx={{ marginTop: "20px", marginLeft: "-40px" }} />
      {value === 'gateway' ? <AllGateways /> : <AllNodes />}
    </div>
  );
};

export default GatewayHome;
