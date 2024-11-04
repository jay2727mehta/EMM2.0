import React, { useEffect, useState } from "react";
import { Container, Button, Grid, Box, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GadgetDialog from "./gadgetDialog";
import gadgets from "./graphscomponent"; // Assuming you have an array of gadgets
import { useNavigate } from "react-router-dom";
import Gadgetstypes from "./gadgettype/typesGadgets";
import EnergyHome from "../dynamicgraph/home";
import backgroundImage from "./graphscomponent/home.png";
import SearchIcon from "@mui/icons-material/Search";
import ScrollableBox from "../Scrollbar/scrollbar";
import { useLocation } from 'react-router-dom';

const styles = {
  thinBorder: {
    border: "0.5px solid #E5E7EB",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
};

const GadgetDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedGadget, setSelectedGadget] = useState(null);
  const [dashboardGadgets, setDashboardGadgets] = useState([]);
  const [typeGraph, setGraphtypes] = useState("energy");
  const [component, setselectedComponent] = useState(null)
  const location = useLocation();

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGadget = () => {
    navigate("/home");
  };

  const handleGadgettype = (type) => {
    setGraphtypes(type);
  };

  const handleAddToDashboard = () => {
    setDashboardGadgets([...dashboardGadgets, selectedGadget]);
    setOpen(false);
  };

  useEffect(() => {
    const comp = sessionStorage.getItem('selectedValue')
    console.log(comp, "selected component gadgethome");
    setselectedComponent(comp)
  }, [location])

  return (
    <Container
      maxWidth=""
      sx={{
        paddingTop: "40px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          textAlign="left"
          fontSize="30px"
          fontWeight="500"
        >

          利用可能なガジェット
        </Typography>
        <Box sx={{ display: "flex", gap: "20px" }}>
          {/* <Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
            }}
          // onClick={handleGadget}
          >
            <SearchIcon />
          </Button> */}
          <Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
            }}
            onClick={handleGadget}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Gadgetstypes handleGadgettype={handleGadgettype} />
      </Box>
      <Box>
        <ScrollableBox>
          {/* <Box
            sx={{
              display: "flex",
              marginTop: "30px",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontWeight="bold"
              color="primary"
              sx={{ marginLeft: "20px" }}
            >
              Suggested
            </Typography>
            <Typography
              fontWeight="bold"
              color="primary"
              sx={{ marginRight: "50px" }}
            >
              View All
            </Typography>
          </Box> */}
          <Box padding="30px">
            <EnergyHome typeGraph={typeGraph} componentType={component} />
          </Box>
        </ScrollableBox>
      </Box>
    </Container>
  );
};

export default GadgetDashboard;
