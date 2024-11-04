import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useBarContext } from "../context/barcontext";
import { ReactComponent as Logo } from '../config/svgfiles/PowerOptimus_Logo_WithoutBG.svg'
import { Dropdown } from "../Home/config";
import ConfigData from "../Home/config.json";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Navbar = ({ handlecomp, handleOpen, selectedMenuItem, openDrawer, component }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedMenu, setSelectedMenuItem] = useState(selectedMenuItem);
  const [selectedValue, setSelectedValue] = useState(component);
  const [comp,setComp] = useState(component)
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  const { barData, updateBarData } = useBarContext();

  const handlecards = () => {
    updateBarData(!barData);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    navigate("/setting/devices");
  };

  const handleGadget = () => {
    if (component) {

      const state = {
        key: component,
      };
      navigate("/addgadgets", { state });
    } else {
      alert("Please select a menu item");
    }
  };

  useEffect(() => {
    console.log(component,'comp');
    
    const storedValue = sessionStorage.getItem("selectedValue");
    const storedMenuItem = sessionStorage.getItem("selectedMenuItem");

    if (storedMenuItem !== null && storedMenuItem !== undefined) {
      setSelectedMenuItem(parseInt(storedMenuItem, 10));
    }

    if (storedValue !== null && storedValue !== undefined) {
        //setSelectedValue(storedValue);
        setSelectedValue(component);
    }
  }, [selectedValue, component]);

  useEffect(() => {
    if (selectedMenuItem !== null && selectedMenuItem !== undefined) {
      setSelectedMenuItem(selectedMenuItem);
    }
  }, [selectedMenuItem, openDrawer]);

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  };

  const handleLogoClick = () => {
    sessionStorage.removeItem('selectedValue');
    setComp('');
    navigate("/home");
  };

  useEffect(() => {
    setComp(component);
  },[component])

  return (
    <div>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "space-between",
          padding: "30px",
          position: "fixed",
          top: 0,
          width: openDrawer ? "calc(100% - 300px)" : "100%",
          zIndex: 1000,
          heigth : 130
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ position: "relative", top: 15 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => handleOpen((prev) => !prev)}
              edge="start"
              sx={[open && { display: "none" }]}
            >
              {openDrawer ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: 'flex-start',
              margin: 'auto',
              flexWrap: 'wrap',
              gap : '4px'
            }}
          >
            <Logo style={{ margin : 0, padding : 0, display : 'block',width: '400', height: '79', marginLeft : -15, marginTop : -38, top : 10, position : 'relative', cursor : 'pointer' }} onClick={handleLogoClick} />
            {/* <Typography variant="h4" position='relative' textAlign='left'>
            Smart Energy Monitoring & Management
          </Typography> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "flex-start",
                left: 0,
              }}
            >
            {comp ? <Typography sx={{textAlign : "left" , display : 'flex', gap : '5px'}}>
            あなたの カスタマイズ ダッシュボード について{" "}
              <Typography>{selectedValue}</Typography>
            </Typography> : <Typography textAlign="left">毎月のエネルギー配分</Typography>}
            </Box>
          </Box>
        </Box>
        <Box marginRight="50px" sx={{ display: "flex", gap: "15px" }}>
          {console.log(component,'compo')
          }
         {!(!comp || (comp === 'Solar Prediction' || comp === 'Solar Panel')) && (role === 'ADMIN') ? <Box sx={{ display: "flex", gap: "15px" }}><Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
              margin: "auto",
            }}
            onClick={handleGadget}
          >
            <AddIcon />
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
              margin: "auto",
            }}
            onClick={handlecards}
          >
            <TuneIcon sx={{ transform: "rotate(90deg)" }} />
          </Button> </Box> : null}
          {/* <Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
              margin: "auto",
            }}
          >
            <NotificationsNoneIcon />
          </Button> */}
          <Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
              margin: "auto",
            }}
            onClick={handleSettingsClick}
          >
            <SettingsOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
