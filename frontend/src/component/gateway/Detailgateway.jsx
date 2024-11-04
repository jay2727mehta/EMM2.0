import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { FiCpu } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import CustomButton from "../button/colorButton";
import { useNavigate } from "react-router-dom";
import EditGateway from "./editGateway";

const Detailgateway = ({ data, Buttondata }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const info = {
    outputModel: "MQTT",
    brokerHost: "10.1.1.177",
    port: "1883",
    clientId: "Client ID",
    userName: "mqtt_user_iiot",
    subscribeTopic: "my/ltroom",
    publishTopic: "XYZ",
    password: "********",
  };

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#F7F7F7",
        borderRadius: "10px",
        // marginLeft: 1,
        flexWrap: "wrap",
        marginRight: 4,
        padding: "40px",
        height: "750px",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          {data[0]?.gateway_name_jp?.toUpperCase()}
        </Typography>
        <Typography variant="h6" sx={{ color: "grey" }} textAlign="center">
          {data[0]?.gateway_mac}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            bottom: 5, // Adjust as needed
            left: 16, // Adjust as needed, width: '100%',
            zIndex: 1,
            paddingBottom: 2,
          }}
        >
          <GrLocation fontSize={20} />
          <Typography marginLeft="20px" fontWeight="bold">
            {data[0]?.location_jp}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            bottom: 5, // Adjust as needed
            left: 16, // Adjust as needed, width: '100%',
            zIndex: 1,
            paddingBottom: 2,
          }}
        >
          <FiCpu fontSize={20} />
          <Typography marginLeft="20px" fontWeight="bold">
            {data[0]?.assigned_node} 接続されたノード
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        {Object.entries(info).map(([key, value]) => (
          <Box key={key} sx={{ padding: 1, marginLeft: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              {key}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
      <EditGateway info={info} open={isDialogOpen} onClose={handleDialogClose}/>
      {/* <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: 4,
          paddingLeft: 1,
          marginLeft: 4,
        }}
      >
        <Typography fontWeight="bold">ACTION</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
          }}
        >
          <Link sx={{ color: "#7292F2" }}>Add Node</Link>
          <Link
            sx={{ color: "#7292F2" }}
            onClick={handleDialogOpen}
          >
            Edit Device Information
          </Link>
          <Link sx={{ color: "#7292F2" }}>Reboot</Link>
          <Link sx={{ color: "#7292F2" }}>Disconnect Device</Link>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Detailgateway;
