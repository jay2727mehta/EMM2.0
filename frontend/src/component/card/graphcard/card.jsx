// import React, { useState } from "react";
// import { IconButton, Box } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useBarContext } from "../../context/barcontext"; // Adjust the path as needed
// import "../../css/cardbg.css";

// const CardComponent = ({ Data, chartData, chartTitle, chartConfig, chartHeight, chartWidth, removeGadget, index }) => {
//   const { barData } = useBarContext();

//   const handleRemove = () => {
//     removeGadget(chartTitle, index);
//   };

//   const styles = {
//     thinBorder: {
//       border: "0.5px solid #E5E7EB",
//       boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
//       backgroundColor: "rgba(255, 255, 255, 0.68)",
//     },
//   };

//   return (
//     <Box sx={{ ...styles.thinBorder, width: 'auto', height: 'auto', borderRadius: '20px', position: 'relative' }}>
//       {(barData &&
//         <IconButton
//           onClick={handleRemove}
//           sx={{ cursor: 'pointer', position: 'absolute', top: 8, right: 8, zIndex: 1000 }}>
//           <CloseIcon />
//         </IconButton>

//       )}{Data ? <Box sx={{ filter: barData ? "blur(3px)" : "none" }}>
//         {chartConfig.render({
//           Data: Data ? Object.assign(Data[0], { meter_name: chartTitle }) : '',
//         })}
//       </Box> : <Box sx={{ filter: barData ? "blur(3px)" : "none" }}>
//         {chartConfig.render({
//           title: `${chartTitle}`,
//           label: chartData.map(item => item[0]),
//           dataset: chartData.map(item => item[1]),
//           xAxis: 'Time Period',
//           yAxis: 'Energy (kWh)',
//           chartHeight,
//           chartWidth,
//         })}
//       </Box>}
//     </Box>
//   );
// };

// export default CardComponent;

import React, { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useBarContext } from "../../context/barcontext"; // Adjust the path as needed
import "../../css/cardbg.css";

const CardComponent = ({ Data, chartData, chartTitle, chartConfig, chartHeight, chartWidth, removeGadget, index, compData }) => {
  const { barData } = useBarContext();

  const handleRemove = () => {

    removeGadget(compData?.graph_id);
  };

  // console.log(Data,"Energy_data in CardComponent");
  

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  let renderedChart = null;
  try {
    if (Data && Data[0]) {
      renderedChart = chartConfig.render({
        Data: Object.assign(Data[0], {
          meter_name: chartTitle
        }),
      });
    }
    else if (chartData) {
      renderedChart = chartConfig.render({
        title: `${chartTitle}`,
        label: chartData ? chartData.map(item => item[0]) : [],
        dataset: chartData ? chartData.map(item => item[1]) : [],
        xAxis: 'Time Period',
        yAxis: 'Energy (kWh)',
        chartHeight,
        chartWidth,
      });
    }
  } catch (error) {
    console.log(error);
  }


  return (
    <Box sx={{ ...styles.thinBorder, width: 'auto', height: 'auto', borderRadius: '20px', position: 'relative' }}>
      {barData && (
        <IconButton
          onClick={handleRemove}
          sx={{ cursor: 'pointer', position: 'absolute', top: 8, right: 8, zIndex: 1000 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Box sx={{ filter: barData ? "blur(3px)" : "none" }}>
        {renderedChart}
      </Box>
    </Box>
  );
};

export default CardComponent;
