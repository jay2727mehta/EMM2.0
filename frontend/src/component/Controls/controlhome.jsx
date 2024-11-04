import React, { useState } from "react";
import Controlcard from "./controlcard";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ScrollableBox from "../scrollbar";

function Controlhome() {
  

  return (
    <ScrollableBox>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "20px",
              padding: "40px",
              flexWrap: "wrap",
            }}
          >
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
            <Controlcard />
          </Box>
        </ScrollableBox>
  );
}

export default Controlhome;
