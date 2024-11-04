import React, { useState } from "react";
import { Button, Box } from "@mui/material";

const Gadgetstypes = ({ handleGadgettype }) => {
  const [typeGraph, setGraphtypes] = useState('energy');

  const handleButtonClick = (type) => {
    handleGadgettype(type);

    switch (type) {
      case "alltypes":
        return setGraphtypes(type);

      case "energy":
        return setGraphtypes(type);

      case "temperature":
        return setGraphtypes(type);

      case "power":
        return setGraphtypes(type);

      case "alert":
        return setGraphtypes(type);

      case "control":
        return setGraphtypes(type);

      case "humidty":
        return setGraphtypes(type);

      case "noise":
        return setGraphtypes(type);

      case "co2":
        return setGraphtypes(type);

      case "lux":
        return setGraphtypes(type);

      default:
        return setGraphtypes(type);
    }
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid rgba(255, 255, 255, 0.02)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.02)",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "20px",
        padding: 2,
      }}
    >
      {/* <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          borderRadius: 25,
          padding: "10px 20px",
          border: styles.thinBorder,
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "alltypes" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("alltypes")}
      >
        All Types
      </Button> */}
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "energy" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("energy")}
      >
        エネルギー
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "power" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("power")}
      >
         パワー
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "temperature" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("temperature")}
      >
        温度
      </Button>
      {/* <Button
        color="inherit"
        variant="contained"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "alert" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("alert")}
      >
        Alert
      </Button> */}
      {/* <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "control" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("control")}
      >
        Control
      </Button> */}
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "humidity" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("humidity")}
      >
        湿度
      </Button>
      {/* <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "noise" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("noise")}
      >
        Noise
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "co2" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("co2")}
      >
        CO2
      </Button>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          fontWeight: "550",
          border: styles.thinBorder,
          borderRadius: 25,
          padding: "10px 20px",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
          borderWidth: 2,
          borderColor: typeGraph === "lux" ? "#565759" : "",
        }}
        onClick={() => handleButtonClick("lux")}
      >
        Lux
      </Button> */}
    </Box>
  );
};

export default Gadgetstypes;
