import { Box, Button, Switch, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function Controlcard() {
  return (
    <div>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          width: "250px",
          height: "200px",
          padding: "30px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "space-evenly",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", margin: "auto" }}
          >
            <Typography variant="h6" fontWeight="bold">
              AC
            </Typography>
            <Typography variant="body2">Admin Building</Typography>
          </Box>
          <Box margin="auto">
            <IOSSwitch />
          </Box>
        </Box>
        <Box>
          <Button sx={{ color: "#527AF2" }}>Set Auto Rule</Button>
        </Box>
      </Box>
    </div>
  );
}

export default Controlcard;
