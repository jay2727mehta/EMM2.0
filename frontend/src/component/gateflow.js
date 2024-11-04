// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import siteData from './TreeView/LOCATION_1.json';

// const transformData = (data) => {
//   const result = [];
//   const { Facilities } = data.Site || {};

//   Facilities.forEach((facility, index) => {
//     const facilityId = `facility-${index}`;
//     result.push({
//       id: facilityId,
//       label: facility.Name,
//       children: facility.Floors.map((floor, floorIndex) => {
//         const floorId = `${facilityId}-floor-${floorIndex}`;
//         return {
//           id: floorId,
//           label: `${floor.Floor_Number} Floor`,
//           children: floor.Location.map((location, locationIndex) => ({
//             id: `${floorId}-location-${locationIndex}`,
//             label: location.Name,
//           })),
//         };
//       }),
//     });
//   });

//   return result;
// };

// const OctopusDiagram = ({ data }) => {
//   const centerX = 500;
//   const centerY = 350;
//   const radius = 200;

//   return (
//     <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
//       <svg width="1500" height="1200">
//         {/* Central node (Site) */}
//         <circle cx={centerX} cy={centerY} r="70" fill="#3f51b5" />
//         <text x={centerX} y={centerY} textAnchor="middle" fill="white" dy=".3em">
//           Site
//         </text>

//         {/* Facilities */}
//         {data.map((facility, index) => {
//           const angle = (index / data.length) * 2 * Math.PI;
//           const x = centerX + (radius * 2) * Math.cos(angle);
//           const y = centerY + (radius * 2) * Math.sin(angle);

//           return (
//             <g key={facility.id}>
//               <line
//                 x1={centerX}
//                 y1={centerY}
//                 x2={x}
//                 y2={y}
//                 stroke="#3f51b5"
//                 strokeWidth="2"
//               />
//               <circle cx={x} cy={y} r="60" fill="#f50057" />
//               <text x={x} y={y} textAnchor="middle" fill="white" dy=".3em">
//                 {facility.label}
//               </text>

//               {/* Floors */}
//               {facility.children.map((floor, floorIndex) => {
//                 const floorAngle = angle + (floorIndex - (facility.children.length - 1) / 2) * 0.58;
//                 const floorX = x + 250 * Math.cos(floorAngle);
//                 const floorY = y + 250 * Math.sin(floorAngle);

//                 return (
//                   <g key={floor.id}>
//                     <line
//                       x1={x}
//                       y1={y}
//                       x2={floorX}
//                       y2={floorY}
//                       stroke="#f50057"
//                       strokeWidth="1"
//                     />
//                     <circle cx={floorX} cy={floorY} r="60" fill="#ff9800" />
//                     <text x={floorX} y={floorY} textAnchor="middle" fill="black" dy=".4em">
//                       {floor.label}
//                     </text>
//                   </g>
//                 );
//               })}
//             </g>
//           );
//         })}
//       </svg>
//     </Box>
//   );
// };

import { Box, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const App = ({ handleDrawerItem }) => {
  // const SITE_STRUCTURE = transformData(siteData);
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      p={3}
    >
      <img
        src="/soon_10246815.gif"
        alt="Coming Soon GIF"
        style={{ width: "300px", marginBottom: "20px" }}
      />
      <Typography variant="h4" gutterBottom>
        Feature Coming Soon!
      </Typography>
      <Typography variant="body1" gutterBottom>
        We're working hard to bring you this feature. Stay tuned!
      </Typography>
      {/* <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon fontSize="small" />
        Go Back
      </Button> */}
    </Box>
  );
};

export default App;
