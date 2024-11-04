import React from "react";
import Detailgateway from "./gateway/Detailgateway";
import { Box, Button, Typography } from "@mui/material";
import NodewayCard from "./nodeCard";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function SpecificGateway({ nodes, parkingGateway, dataButton }) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <Button
          sx={{ color: "#464AA6", marginLeft: "0px" }}
          color="inherit"
          variant="inherit"
          size="small"
        >
          <IoArrowBackCircleOutline sx={{ margin: "20px", fontSize: "25px" }} />
          <Typography fontWeight="bold">All Gateways</Typography>
        </Button>
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="left"
          fontSize="28px"
          marginLeft="20px"
          marginTop="10px"
        >
          Total of {nodes.length} Nodes
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          //flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "space-evenly",
          gap: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignContent: "space-evenly",
            gap: "40px",
          }}
        >
          {nodes.map((data) => (
            <NodewayCard key={data.id} data={data} />
          ))}
        </Box>
        <Box sx={{ width: "500px", marginTop: 0 }}>
          <Detailgateway data={parkingGateway} Buttondata={dataButton} />
        </Box>
      </Box>
    </div>
  );
}

export default SpecificGateway;
