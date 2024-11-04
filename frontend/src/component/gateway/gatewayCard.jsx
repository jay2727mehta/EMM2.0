import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { HiWifi } from "react-icons/hi";
import { AiOutlineNodeExpand } from "react-icons/ai";
import { FiCpu } from "react-icons/fi";
import { useFitText } from "../config/fontResizeConfig";

const styles = {
  thinBorder: {
    border: "0.5px solid #E5E7EB",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
    backgroundColor: "white",
  },
};

const GatewayCard = ({ data, getIndividualNodeConnected, handleIsClicked, getIndividualGatewayConn }) => {
  const { ref } = useFitText();

  const handleClick = () => {
    getIndividualNodeConnected(data.gateway_mac);
    getIndividualGatewayConn(data.gateway_mac);
    handleIsClicked(true);
  };

  return (
    <Card
      sx={{
        border: styles.thinBorder,
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor:
          data.active === "active" ? "white" : "rgba(250, 250, 250, 0.8)",
        width: 325,
        height: 180,
        filter: data.status === 1 ? "none" : "#FAFAFA",
        transition: "filter 0.3s ease-in-out",
        position: "relative",
        color: data.status === 1 ? "black" : "rgba(0, 0, 0, 0.5)",
        opacity: data.status ? "100%" : "80%",
        "&:hover": {
          opacity: 1,
          boxShadow: "0 4px 12px rgba(149, 19, 230, 0.25)",
        },
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              ref={ref}
              variant="h6"
              component="div"
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                fontSize : 14,
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: 0,
                opacity: data.status === 1 ? "100%" : "80%",
                // whiteSpace: 'nowrap',
                // overflow: 'hidden',
                // textOverflow: 'ellipsis',
              }}
            >
              {data?.gateway_name_jp?.toUpperCase()}
            </Typography>
            <Typography
              ref={ref}
              variant="h6"
              component="div"
              color="textSecondary"
              sx={{
                textAlign: "left",
                fontSize: 14,
                marginLeft: "20px",
                opacity: data.status === 1 ? "100%" : "80%",
                marginBottom: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data?.location_jp}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px",
              width: "40px",
              height: "40px",
              paddingTop: 2,
              opacity: data.status === 1 ? "100%" : "40%",
            }}
          >
            <HiWifi
              fontSize={30}
              color={
                data.status === 1
                  ? "#10AB1F"
                  : data.status === 0
                    ? "#F20505"
                    : "#F2E205"
              }
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            opacity: data.status === "active" ? "100%" : "80%",
            bottom: 5, // Adjust as needed
            left: 16, // Adjust as needed, width: '100%',
            zIndex: 1,
            paddingBottom: 2,
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          <FiCpu fontSize={20} />
          <Typography
            variant="body2"
            color="textPrimary"
            sx={{
              fontWeight: "bold",
              marginLeft: "20px",
              marginBottom: "10px",
              opacity: data.status === "active" ? "100%" : "80%",
            }}
          >
            {data?.assigned_node} 接続されたノード
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GatewayCard;
