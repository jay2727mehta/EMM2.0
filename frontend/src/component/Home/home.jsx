import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import backgroundImage from "../config/images/BG1.png";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import ComponentOne from "../Energy/components/componentOne";
import PersistentDrawerLeft from "./homeSidebar";
import SolarPanel from "../Energy/components/Solar/solarpanel";
import SolarPredictionHome from "../Energy/components/Solar/solarPredictionHome";
import HomePage from "./homePage";

function Home() {
  const [component, setComponent] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);


  const handleOpen = (val) => {
    setOpen(val);
  };

  const handleNodeClickValue = (value) => {
    setComponent(value)
  }

  const handleMenuClick = (item, value) => {
    setSelectedMenuItem(item);
    setComponent(value)
  };

  useEffect(() => {

  }, [selectedMenuItem])

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        boxShadow: 'none'
      }}
    >
      <Box>
        <PersistentDrawerLeft open={open} component={component} handleOpen={handleOpen} handleMenuClick={handleMenuClick} handleNodeClickValue={handleNodeClickValue} />
        <Box
          sx={{
            marginTop: "20px",
            position: "relative",
            marginLeft: open ? "300px" : "0px",
            width: open ? "calc(100% - 300px)" : "100%",
            transition: "margin-left 0.3s, width 0.3s",
          }}
        >
          <Navbar openDrawer={open} handleOpen={handleOpen} selectedMenuItem={selectedMenuItem} component={component} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="componentOne" element={<ComponentOne componentMap={component} />} />
            <Route path="Solar_Panel" element={<SolarPanel />} />
            <Route path="Solar_Prediction" element={<SolarPredictionHome />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
