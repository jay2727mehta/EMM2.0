import { Box, Button, Divider, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import IntegrationCard from "./integrationcard";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import { getAllIntegrations } from "../Services/integrationService";
import ScrollableBox from "../Scrollbar/scrollbar";
import Loading from "../Loading/loading";
import PersistentDrawerLeft from "../Sidebar/sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import SlidingButton from "../SlidingButton/slidingButton";
import MqttConfigure from "./MQTT/mqttConfigure";

function IntegrationHome({ handleSettings }) {
  const [integration, setIntegrations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      backgroundColor: "white",
    },
  };

  const handleCloseSettings = () => {
    handleSettings(false);
    navigate("/home");
  };

  const fetchAllIntegrations = () => {
    setIsLoading(true);
    const data = getAllIntegrations();
    setIntegrations(data);
    setIsLoading(false);
  };

  const handleCardNavigate = (item) => {
    if (item === "MQTT") {
      navigate("/setting/integration/MQTT");
    }
    console.log(item);
  };

  useEffect(() => {
    fetchAllIntegrations();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          top: 0,
          width: "100%",
          marginTop: -10,
        }}
      >
        {/* <TextField
          type=""
          // placeholder="Search"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
          size="small"
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <CiSearch />
          //     </InputAdornment>
          //   ),
          // }}
        /> */}
        <Box marginRight="50px" sx={{ display: "flex", gap: "15px" }}>
          {/* <Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
              width: "20px",
            }}
          >
            <AddIcon />
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ background: "#FFFFFF", border: styles.thinBorder }}
          >
            <TuneIcon sx={{ transform: "rotate(90deg)" }} />
          </Button> */}
          <Button
            variant="contained"
            color="inherit"
            onClick={handleCloseSettings}
            sx={{ background: "#FFFFFF", border: styles.thinBorder }}
          >
            <ClearIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "20px", marginLeft: "-40px" }} />
      {integration.length === 0 ? (
        <Loading />
      ) : (
        <ScrollableBox>
          <Box
            marginTop="30px"
            sx={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
              animation: "fadeIn 3s",
            }}
          >
            {integration.map((data) => (
              <IntegrationCard
                key={data.id}
                data={data}
                handleCardNavigate={handleCardNavigate}
              />
            ))}
          </Box>
        </ScrollableBox>
      )}
    </div>
  );
}

export default IntegrationHome;
