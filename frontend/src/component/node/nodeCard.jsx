import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { HiWifi } from "react-icons/hi";
import { AiOutlineNodeExpand } from "react-icons/ai";
import { FiCpu } from "react-icons/fi";
import { useFitText } from "../config/fontResizeConfig";
import SettingsIcon from '@mui/icons-material/Settings';

const NodewayCard = ({
  data,
  onButtonClick,
  getSingleNode,
  handleIsClickedNode,
}) => {

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
  };
  const { ref } = useFitText();

  const handleClick = () => {
    getSingleNode(data?.node_mac);
    handleIsClickedNode(true);
  };

  return (
    <Card
      sx={{
        border: styles.thinBorder,
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor:
          data.status === "1" ? "white" : "rgba(250, 250, 250, 0.8)",
        width: 325,
        height: 220,
        filter: data?.status === "1" ? "none" : "#FAFAFA",
        transition: "filter 0.3s ease-in-out",
        position: "relative",
        color: data?.status === "1" ? "black" : "rgba(0, 0, 0, 0.5)",
        opacity: data?.status ? "100%" : "80%",
        "&:hover": {
          opacity: 1,
          boxShadow: "0 4px 12px rgba(149, 19, 230, 0.25)",
        },
      }}
      onClick={handleClick}
      ref={ref}
    >
      <CardContent sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              variant="h6"
              component="div"
              ref={ref}
              sx={{
                fontSize: "14px",
                textAlign: "left",
                fontWeight: "bold",
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: 0,
              }}
            >
              {data?.node_name_jp?.toUpperCase()}
            </Typography>
            <Typography
              ref={ref}
              variant="h6"
              component="div"
              color="textSecondary"
              sx={{
                textAlign: "left",
                fontSize: '14px',
                marginLeft: "20px",
                marginBottom: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data?.node_location_jp}
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
            }}
          >
            <HiWifi
              ref={ref}
              fontSize={30}
              color={
                data.status === "1"
                  ? "#10AB1F"
                  : data.status === "0"
                    ? "#F20505"
                    : "#F2E205"
              }
            />
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", position: "absolute", bottom: 75, marginLeft: "25px" }}
        >
          <FiCpu fontSize={13} style={{ marginTop: "2px" }} />
          <Typography
            variant="body2"
            color="textPrimary"
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              marginLeft: "10px",
              opacity: data.status === "1" ? "100%" : "80%",
            }}
          >
            {data?.type_jp?.toUpperCase()}
          </Typography>
        </Box>

        <Button
          onClick={handleClick}
          variant="outlined"
          size="small"
          sx={{
            marginTop: "20px",
            position: "absolute",
            bottom: 5,
            left: 16,
            borderRadius: "15px",
            padding: "5px 10px",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              marginLeft: "10px",
              textAlign: "center",
              margin: "auto",
              display: 'flex',
              gap: '5px'
            }}
          >
            <SettingsIcon fontSize="small" />
            設定する
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NodewayCard;
