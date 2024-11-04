// src/App.js
import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import InitialCards from "../gadgets/cards/cradsEnergy";
import AllTypeGadget from "../gadgets/gadgettype/AllTypesGadget";
import { Box } from "@mui/material";
import ScrollableBox from "../Scrollbar/scrollbar";
import HorizontalScrollableBox from "../Scrollbar/horizontalscroll";
import { getAllMeters } from "../Services/nodeService";;

const EnergyHome = ({ typeGraph, componentType }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [allMeters, setAllMeters] = useState([]);
  const [meters, setMeters] = useState([]);

  const fetchAllMeters = async () => {
    try {
      const response = await getAllMeters();
      console.log(response, 'res');

      setAllMeters(response);
    } catch (error) {
      console.log('Error fetching meters : ', error);
    }
  };

  const filterMeterData = () => {

    switch (typeGraph) {

      case 'alltypes':
        setMeters(allMeters);
        break;

      case 'energy':
        setMeters(allMeters?.filter((meter) => meter.energy_watt_hr !== null).sort((a, b) => {
          if (a.meter_name_jp < b.meter_name_jp) return -1; // a comes first
          if (a.meter_name_jp > b.meter_name_jp) return 1;  // b comes first
          return 0;                                    // they're equal
        }));
        break;

      case 'temperature':
        setMeters(allMeters?.filter((meter) => meter.temperature_c !== null).sort((a, b) => {
          if (a.meter_name_jp < b.meter_name_jp) return -1; // a comes first
          if (a.meter_name_jp > b.meter_name_jp) return 1;  // b comes first
          return 0;                                    // they're equal
        }));
        break;

      case 'power':
        setMeters(allMeters?.filter((meter) => meter.power_watt !== null).sort((a, b) => {
          if (a.meter_name_jp < b.meter_name_jp) return -1; // a comes first
          if (a.meter_name_jp > b.meter_name_jp) return 1;  // b comes first
          return 0;                                    // they're equal
        }));
        break;

      case 'humidity':
        setMeters(allMeters?.filter((meter) => meter.humidity_g_m3 !== null).sort((a, b) => {
          if (a.meter_name_jp < b.meter_name_jp) return -1; // a comes first
          if (a.meter_name_jp > b.meter_name_jp) return 1;  // b comes first
          return 0;                                    // they're equal
        }));
        break;
    }
  }

  const handleAdd = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchAllMeters();
  }, []);

  useEffect(() => {
    filterMeterData();
  }, [allMeters, typeGraph]);

  return (
    <Box>
      <Box sx={{ overflowX: "auto" }}>
        <InitialCards onAdd={handleAdd} typeGraph={typeGraph} />
      </Box>
      <Box>
        <AllTypeGadget
          open={open}
          handleClose={handleClose}
          selectedCard={selectedCard}
          typeGraph={typeGraph}
          allMeters={meters}
          componentType={componentType}
        />
      </Box>
      {/* <Dashboard /> */}
    </Box>
  );
};

export default EnergyHome;
