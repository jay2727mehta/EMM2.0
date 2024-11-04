import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as EnergyIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './energyCard.css'

const SmallEnergyUseCard = ({ Data }) => {

    const getColorSettings = (value) => {
        if (value < 40) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value >= 40 && value < 55) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value >= 55) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };

    const tempCheck = getColorSettings(Data.value ? Data.value : undefined);

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    return (
        <Card sx={{ ...styles.thinBorder, width: '300px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
                <EnergyIcon className="temperature-icon" width={32} height={32} />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                    Electricity Use
                </Typography>
            </Box>
            <CardContent>
                {Data.value ? <Box>
                    <Box sx={{ textAlign: 'center', fontSize: '60px', fontWeight: 'bold', color: tempCheck.colors, position : 'relative', bottom : 5 }}>{Data.consumption}<sup style={{ fontSize: '24px', verticalAlign: 'top' }}>kW</sup></Box>
                </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop : '5px',marginBottom : '15px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                <Box sx={{ color: tempCheck.fontColor,position : 'relative', bottom : 0 }}>
                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}></Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.period},{Data.meter_name}</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SmallEnergyUseCard;

// import React from 'react';
// import { Chart as ChartJS, Tooltip, Title, Legend, HeatmapController, CategoryScale, LinearScale, ColorScale } from 'chart.js';
// import { Heatmap } from 'react-chartjs-2';

// ChartJS.register(
//   Tooltip,
//   Title,
//   Legend,
//   HeatmapController,
//   CategoryScale,
//   LinearScale,
//   ColorScale
// );

// const HeatMapChart = () => {
//   const data = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     datasets: [{
//       label: 'Heat Map',
//       data: [
//         [0, 0, 50], [0, 1, 60], [0, 2, 70], [0, 3, 80], [0, 4, 90], [0, 5, 100], [0, 6, 110],
//         [1, 0, 60], [1, 1, 70], [1, 2, 80], [1, 3, 90], [1, 4, 100], [1, 5, 110], [1, 6, 120],
//         [2, 0, 70], [2, 1, 80], [2, 2, 90], [2, 3, 100], [2, 4, 110], [2, 5, 120], [2, 6, 130],
//         [3, 0, 80], [3, 1, 90], [3, 2, 100], [3, 3, 110], [3, 4, 120], [3, 5, 130], [3, 6, 140],
//         [4, 0, 90], [4, 1, 100], [4, 2, 110], [4, 3, 120], [4, 4, 130], [4, 5, 140], [4, 6, 150]
//       ],
//       backgroundColor: 'rgba(255, 99, 132, 0.6)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1
//     }]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `Value: ${context.raw[2]}`;
//           }
//         }
//       }
//     },
//     scales: {
//       x: {
//         type: 'category',
//         title: {
//           display: true,
//           text: 'Day of the Week'
//         }
//       },
//       y: {
//         type: 'category',
//         title: {
//           display: true,
//           text: 'Hour of the Day'
//         }
//       }
//     }
//   };

//   return <Heatmap data={data} options={options} />;
// };

// export default HeatMapChart;

// import React from 'react';
// import { Box, Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { ReactComponent as EnergyIcon } from "../../config/svgfiles/zap.svg";
// import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";

// const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// const ElectricityUseChart = ({ Data }) => {
//     // This would normally come from props or state
//     const usageData = Array(7 * 52).fill(0).map(() => Math.random());

//     const getColor = (value) => {
//         if (value < 0.3) return '#E3F2FD';
//         if (value < 0.6) return '#90CAF9';
//         return '#1E88E5';
//     };

//     const getColorSettings = (value) => {
//         if (value < 40) {
//             return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
//         } else if (value >= 40 && value < 55) {
//             return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
//         } else if (value >= 55) {
//             return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
//         }
//         return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
//     };

//     const tempCheck = getColorSettings(Data.value ? Data.value : undefined);
//     const styles = {
//         thinBorder: {
//             border: "0.5px solid #E5E7EB",
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
//             backgroundColor: "rgba(255, 255, 255, 0.68)",
//         },
//     };

//     return (
//         <Card sx={{ ...styles.thinBorder,width: 1650, height: '275px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2  }}>
//             <CardContent sx={{ display: 'flex', gap : '100px', justifyContent : 'space-between', alignContent : 'space-between' }}>
//                 <Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
//                         <EnergyIcon className="temperature-icon" width={32} height={32} />
//                         <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
//                             Energy Meter
//                         </Typography>
//                     </Box>
//                     <CardContent>
//                         {Data.value ? <Box>
//                             <Box sx={{ textAlign: 'center', fontSize: '72px', fontWeight: 'bold', color: tempCheck.colors }}>{Data.value}<sup style={{ fontSize: '24px', verticalAlign: 'top' }}>kwh</sup></Box>
//                         </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '15px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
//                         <Box sx={{ color: tempCheck.fontColor }}>
//                             <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.meter_name}</Typography>
//                             <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
//                         </Box>
//                     </CardContent>
//                 </Box>
//                 <Box sx={{ position : 'relative' , bottom : 70 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between',  }}>
//                         <Typography variant="h6" component="div" mb={2} margin='auto'>
//                             Utilization Pattern Throughout the Year
//                         </Typography>
//                         <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//                             <IconButton>
//                                 <ArrowBackIosNewIcon />
//                             </IconButton>
//                             <Box display="flex" alignItems="center">
//                                 <CalendarTodayIcon sx={{ mr: 1 }} />
//                                 <Typography variant="body1">2023</Typography>
//                             </Box>
//                             <IconButton>
//                                 <ArrowForwardIosIcon />
//                             </IconButton>
//                         </Box>
//                     </Box>
//                     <Box display="flex" justifyContent="space-between" mt={2}>
//                         {months.map(month => (
//                             <Typography key={month} variant="body2">{month}</Typography>
//                         ))}
//                     </Box>
//                     <Box sx={{ display: 'flex' }}>
//                         <Box sx={{ display: 'grid', mb: 1 }}>
//                             {daysOfWeek.map((day, index) => (
//                                 <Box key={index} sx={{ width: 20, mr: 0.5 }}>
//                                     <Typography variant="body2" align="center">{day}</Typography>
//                                 </Box>
//                             ))}
//                         </Box>
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
//                             {usageData.map((value, index) => (
//                                 <Box
//                                     key={index}
//                                     sx={{
//                                         width: 20,
//                                         height: 20,
//                                         backgroundColor: getColor(value),
//                                         mr: 0.5,
//                                         mb: 0.5,
//                                         borderRadius: 0.5,
//                                     }}
//                                 />
//                             ))}
//                         </Box>
//                     </Box>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default ElectricityUseChart;
