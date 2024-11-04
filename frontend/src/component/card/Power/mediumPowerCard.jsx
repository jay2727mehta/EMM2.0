// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Card, CardContent, FormControl, Menu, MenuItem, Tooltip as ToolTipBox } from '@mui/material';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
// import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/zap.svg";
// import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
// import { useFitText } from '../../config/fontResizeConfig';
// import { criticalpowerMail } from "../../Services/emailservice";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// const MediumPowerCard = ({ Data, chartData }) => {
//   const [power, setpower] = useState('kW');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const { ref } = useFitText();

//   const convertPower = (value, unit) => {
//     if (value == null || isNaN(value)) return 0; // Handle null, undefined, and non-numeric values
//     switch (unit) {
//       case 'W':
//         return value * 1000;
//       case 'kW':
//       default:
//         return value;
//     }
//   };

//   const formatValue = (value) => {
//     if (value == null || isNaN(value)) {
//       return '0'; // Return default '0' for undefined, null, or NaN values
//     }

//     if (value >= 1_000_000_000) {
//       return (value / 1_000_000_000).toFixed(1) + 'b'; // Billions
//     } else if (value >= 1_000_000) {
//       return (value / 1_000_000).toFixed(1) + 'm'; // Millions
//     } else if (value >= 1_000) {
//       return (value / 1_000).toFixed(1) + 'k'; // Thousands
//     } else {
//       return value.toFixed(2); // For values less than 1,000
//     }
//   };

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleMenuItemClick = (value) => {
//     setpower(value);
//     handleClose();
//   };

//   const convertDataValues = (values, unit) => {
//     if (!Array.isArray(values)) return []; // Handle cases where `values` is not an array
//     return values.map(value => convertPower(value, unit));
//   };

//   const labels = Data?.timestamp ?? []; // Safely check if `Data` and `Data.timestamp` exist
//   const dataValues = Data?.meter_reading ? convertDataValues(Data.meter_reading, power) : [];

//   chartData = {
//     labels: labels,
//     data: dataValues,
//   };

//   const data = {
//     labels: chartData?.labels || '',
//     datasets: [
//       {
//         label: `power (${power})`,
//         data: chartData?.data || '',
//         borderColor: chartData ? (context) => {
//           const chart = context.chart;
//           const { ctx, chartArea } = chart;
//           if (!chartArea) {
//             return null;
//           }
//           return getGradient(ctx, chartArea, context.dataset.data);
//         } : '',
//         tension: 0.4,
//         borderWidth: 4,
//         pointRadius: 0,
//         pointHoverRadius: 0,
//       },
//     ],
//   };

//   const convertedMinPower = Data?.min_power ? convertPower(Data.min_power, power) : null;
//   const convertedMaxPower = Data?.max_power ? convertPower(Data.max_power, power) : null;
//   const convertedCriticalPower = Data?.critical_power ? convertPower(Data.critical_power, power) : null;

//   function getGradient(ctx, chartArea, data) {
//     if (!Data || !Array.isArray(data)) {
//       console.error("Data object or required properties are missing.");
//       return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
//     }

//     const minValue = Math.min(...data);
//     const maxValue = Math.max(...data);

//     if (minValue === maxValue || isNaN(minValue) || isNaN(maxValue)) {
//       return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
//     }

//     const sortedData = [...data].sort((a, b) => a - b);

//     const colorScale = (value) => {
//       if (value > convertedMinPower && value < convertedMaxPower) {
//         return '#76C739'; // Green
//       } else if (value >= convertedMaxPower && value < convertedCriticalPower) {
//         return '#e7af84'; // Orange
//       } else if (value >= convertedCriticalPower || value <= convertedMinPower) {
//         return '#F26457'; // Red
//       }
//     };

//     const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);

//     sortedData.forEach((value) => {
//       const position = (value - minValue) / (maxValue - minValue);
//       const clampedPosition = Math.max(0, Math.min(1, position));
//       gradient.addColorStop(clampedPosition, colorScale(value));
//     });

//     return gradient;
//   }


//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       mode: "nearest",
//       intersect: false,
//     },
//     hover: {
//       mode: "nearest",
//       intersect: false,
//     },
//     elements: {
//       point: {
//         radius: 0, // Remove points
//       },
//       line: {
//         tension: 0.4, // Smooth lines
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: `Time Period`,
//           font: {
//             weight : 'bold',
//             color: '#9e9e9e',
//           },
//         },
//         offset: true,
//         grid: {
//           display: false,
//         },
//         ticks: {
//           font: {
//             size: 10,
//             weight : 'bold',
//             color: '#9e9e9e',
//           },
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: `power` ,
//           font: {
//             weight : 'bold',
//             color: '#9e9e9e',
//           },
//         },
//         display: true,
//         ticks: {
//           font: {
//             size: 10,
//             weight : 'bold',
//             color: '#9e9e9e',
//           },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         display: true,
//       }
//     },

//   };

//   const getColorSettings = (value) => {
//     if (!Data && !Data.min_power && !Data.max_power && !Data.critical_power) {
//       return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
//     }

//     if (value > Data.min_power && value < Data.max_power) {
//       return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
//     } else if (value < Data.critical_power && value >= Data.max_power) {
//       return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
//     } else if (value >= Data.critical_power || value <= Data.min_power) {
//       return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
//     }
//     return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
//   };

//   const powerValue = Data?.meter_reading[Data?.meter_reading?.length - 1];
//   const convertedValue = Data ? convertPower(powerValue, power) : 0;
//   const formattedValue = Data ? formatValue(convertedValue) : 0;
//   const tempCheck = getColorSettings(powerValue);
//   const fontSize = formattedValue ? formattedValue?.length > 4 ? '50px' : '60px' : '60px';

//   useEffect(() => {
//     const sendCriticalPower = async () => {
//       try {
//         if (powerValue > Data?.critical_power) {
//           await criticalpowerMail(powerValue);
//         } 
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     sendCriticalPower();
//   }, [powerValue, Data]);

//   const styles = {
//     thinBorder: {
//       border: "0.5px solid #E5E7EB",
//       boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
//       backgroundColor: "rgba(255, 255, 255, 0.68)",
//     },
//   };

//   return (
//     <Card sx={{ ...styles.thinBorder, width: 920, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
//     <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
//           <TemperatureIcon className="temperature-icon" width={32} height={32} />
//           <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
//             Power Meter
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', flexDirection: 'column', }}>
//           {Data && Data.status === '1' && (Array.isArray(Data.meter_reading) ? Data.meter_reading.length > 0 : false) ?
//             <Box>
//               <Box sx={{ textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 10 }}>
//                 {formattedValue}
//                 <sup>
//                   <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
//                     <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
//                       <sup style={{ fontSize: formattedValue ? formattedValue.length > 4 ? '20px' : '24px' : '24px', verticalAlign: 'top', color: tempCheck.colors }}>{power}</sup>
//                     </Box>
//                     <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//                       <MenuItem onClick={() => handleMenuItemClick("kW")}>kW</MenuItem>
//                       <MenuItem onClick={() => handleMenuItemClick("W")}>W</MenuItem>
//                     </Menu>
//                   </FormControl>
//                 </sup>
//               </Box>
//             </Box>
//             : (
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px' }}>
//                 <WifiOffIcon className="temperature-icon" width={72} height={72} />
//               </Box>
//             )}
//           <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: 15, top: fontSize === '50px' ? 1 : '', width: 150 }}>
//             <ToolTipBox title={`${'Meter Name : ' + Data?.meter_name?.toUpperCase() || 'N/A'} ${'Location : ' + Data?.node_location?.toUpperCase() || 'SEZ'}`} arrow>
//               <Typography
//                 sx={{
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 {Data?.meter_name?.toUpperCase() || 'N/A'}
//               </Typography>
//             </ToolTipBox>
//             <Typography sx={{
//               textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
//               overflow: 'hidden',
//               textOverflow: 'ellipsis',
//             }}>{Data?.node_location?.toUpperCase() || 'SEZ'}</Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Box sx={{ position: 'relative', bottom: fontSize === '50px' ? 0 : 8 }}>
//         <Line data={data} options={options} width='600' height='180' />
//       </Box>
//     </Box>
//   </Card>
//   );
// };

// export default MediumPowerCard;

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, FormControl, Menu, MenuItem, Tooltip as ToolTipBox } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';
import { criticalpowerMail } from "../../Services/emailservice";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumPowerCard = ({ Data, chartData }) => {
  // const [power, setpower] = useState('kW');
  // const [anchorEl, setAnchorEl] = useState(null);
  // const { ref } = useFitText();

  // const convertPower = (value, unit) => {
  //   switch (unit) {
  //     case 'W':
  //       return value * 1000;
  //     case 'kW':
  //     default:
  //       return value;
  //   }
  // };

  // const formatValue = (value) => {
  //   if (!value) {
  //     return 0; // Return a default value if `value` is undefined or null
  //   }

  //   if (value >= 1_000_000_000) {
  //     return (value / 1_000_000_000).toFixed(1) + 'b'; // Billions
  //   } else if (value >= 1_000_000) {
  //     return (value / 1_000_000).toFixed(1) + 'm'; // Millions
  //   } else if (value >= 1_000) {
  //     return (value / 1_000).toFixed(1) + 'k'; // Thousands
  //   } else {
  //     return value.toFixed(2); // For values less than 1,000
  //   }
  // };

  // const handleClick = (event) => setAnchorEl(event.currentTarget);
  // const handleClose = () => setAnchorEl(null);
  // const handleMenuItemClick = (value) => {
  //   setpower(value);
  //   handleClose();
  // };

  // const convertDataValues = (values, unit) => {
  //   return values.map(value => convertPower(value, unit));
  // };

  // const labels = Data && Data.timestamp ? Data.timestamp : [];
  // const dataValues = Data && Data.meter_reading ? convertDataValues(Data.meter_reading, power) : [];

  // chartData = {
  //   labels: labels,
  //   data: dataValues,
  // };

  // const data = {
  //   labels: chartData ? chartData.labels : '',
  //   datasets: [
  //     {
  //       label: `power (${power})`,
  //       data: chartData ? chartData.data : '',
  //       borderColor: chartData ? (context) => {
  //         const chart = context.chart;
  //         const { ctx, chartArea } = chart;

  //         if (!chartArea) {
  //           return null;
  //         }

  //         return getGradient(ctx, chartArea, context.dataset.data);
  //       } : '',
  //       tension: 0.4,
  //       borderWidth: 4,
  //       pointRadius: 0,
  //       pointHoverRadius: 0,
  //     },
  //   ],
  // };

  // const convertedMinPower = Data ? convertPower(Data.min_power, power) : null;
  // const convertedMaxPower = Data ? convertPower(Data.max_power, power) : null;
  // const convertedCriticalPower = Data ? convertPower(Data.critical_power, power) : null;

  // function getGradient(ctx, chartArea, data) {
  //   if (!Data) {
  //     console.error("Data object is missing required properties.");
  //     return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
  //   }

  //   const minValue = Math.min(...data);
  //   const maxValue = Math.max(...data);

  //   if (minValue === maxValue || isNaN(minValue) || isNaN(maxValue) || !isFinite(minValue) || !isFinite(maxValue)) {
  //     return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
  //   }

  //   const sortedData = [...data].sort((a, b) => a - b);

  //   const colorScale = (value) => {
  //     if (value > convertedMinPower && value < convertedMaxPower) {
  //       return '#76C739'; // Green
  //     } else if (value >= convertedMaxPower && value < convertedCriticalPower) {
  //       return '#e7af84'; // Orange
  //     } else if (value >= convertedCriticalPower || value <= convertedMinPower) {
  //       return '#F26457'; // Red
  //     }
  //   };

  //   const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);

  //   sortedData.forEach((value) => {
  //     const position = (value - minValue) / (maxValue - minValue);
  //     const clampedPosition = Math.max(0, Math.min(1, position));
  //     gradient.addColorStop(clampedPosition, colorScale(value));
  //   });

  //   return gradient;
  // }

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   interaction: {
  //     mode: "nearest",
  //     intersect: false,
  //   },
  //   hover: {
  //     mode: "nearest",
  //     intersect: false,
  //   },
  //   elements: {
  //     point: {
  //       radius: 0, // Remove points
  //     },
  //     line: {
  //       tension: 0.4, // Smooth lines
  //     },
  //   },
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: `Time Period`,
  //         font: {
  //           weight : 'bold',
  //           color: '#9e9e9e',
  //         },
  //       },
  //       offset: true,
  //       grid: {
  //         display: false,
  //       },
  //       ticks: {
  //         font: {
  //           size: 10,
  //           weight : 'bold',
  //           color: '#9e9e9e',
  //         },
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: `power` ,
  //         font: {
  //           weight : 'bold',
  //           color: '#9e9e9e',
  //         },
  //       },
  //       display: true,
  //       ticks: {
  //         font: {
  //           size: 10,
  //           weight : 'bold',
  //           color: '#9e9e9e',
  //         },
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       display: true,
  //     }
  //   },

  // };

  // const getColorSettings = (value) => {
  //   if (!Data && !Data.min_power && !Data.max_power && !Data.critical_power) {
  //     return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
  //   }

  //   if (value > Data.min_power && value < Data.max_power) {
  //     return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
  //   } else if (value < Data.critical_power && value >= Data.max_power) {
  //     return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
  //   } else if (value >= Data.critical_power || value <= Data.min_power) {
  //     return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
  //   }
  //   return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
  // };

  // const powerValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  // const convertedValue = Data ? convertPower(powerValue, power) : 0;
  // const formattedValue = Data ? formatValue(convertedValue) : 0;
  // const tempCheck = getColorSettings(powerValue);
  // const fontSize = formattedValue ? formattedValue.length > 4 ? '50px' : '60px' : '60px';

  // const sendCriticalPower = async () => {
  //   try {
  //     if (powerValue > Data?.critical_power) {
  //       const resp  = await criticalpowerMail(powerValue);
  //     } 
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // sendCriticalPower();

  // const styles = {
  //   thinBorder: {
  //     border: "0.5px solid #E5E7EB",
  //     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  //     backgroundColor: "rgba(255, 255, 255, 0.68)",
  //   },
  // };
  const [power, setpower] = useState('kW');
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();

  const convertPower = (value, unit) => {
    if (value == null || isNaN(value)) return 0; // Handle null, undefined, and non-numeric values
    switch (unit) {
      case 'W':
        return value * 1000;
      case 'kW':
      default:
        return value;
    }
  };

  const formatValue = (value) => {
    if (value == null || isNaN(value)) {
      return '0'; // Return default '0' for undefined, null, or NaN values
    }

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'b'; // Billions
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'm'; // Millions
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'k'; // Thousands
    } else {
      return value.toFixed(2); // For values less than 1,000
    }
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setpower(value);
    handleClose();
  };

  const convertDataValues = (values, unit) => {
    if (!Array.isArray(values)) return []; // Handle cases where `values` is not an array
    return values.map(value => convertPower(value, unit));
  };

  const labels = Data?.timestamp ?? []; // Safely check if `Data` and `Data.timestamp` exist
  const dataValues = Data?.meter_reading ? convertDataValues(Data.meter_reading, power) : [];

  chartData = {
    labels: labels,
    data: dataValues,
  };

  const data = {
    labels: chartData?.labels || '',
    datasets: [
      {
        label: `power (${power})`,
        data: chartData?.data || '',
        borderColor: chartData ? (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea, context.dataset.data);
        } : '',
        tension: 0.4,
        borderWidth: 4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const convertedMinPower = Data?.min_power ? convertPower(Data.min_power, power) : null;
  const convertedMaxPower = Data?.max_power ? convertPower(Data.max_power, power) : null;
  const convertedCriticalPower = Data?.critical_power ? convertPower(Data.critical_power, power) : null;

  function getGradient(ctx, chartArea, data) {
    if (!Data || !Array.isArray(data)) {
      console.error("Data object or required properties are missing.");
      return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    }

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    if (minValue === maxValue || isNaN(minValue) || isNaN(maxValue)) {
      return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    }

    const sortedData = [...data].sort((a, b) => a - b);

    const colorScale = (value) => {
      if (value > convertedMinPower && value < convertedMaxPower) {
        return '#76C739'; // Green
      } else if (value >= convertedMaxPower && value < convertedCriticalPower) {
        return '#e7af84'; // Orange
      } else if (value >= convertedCriticalPower || value <= convertedMinPower) {
        return '#F26457'; // Red
      }
    };

    const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);

    sortedData.forEach((value) => {
      const position = (value - minValue) / (maxValue - minValue);
      const clampedPosition = Math.max(0, Math.min(1, position));
      gradient.addColorStop(clampedPosition, colorScale(value));
    });

    return gradient;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0, // Remove points
      },
      line: {
        tension: 0.4, // Smooth lines
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: `Time Period`,
          font: {
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `power`,
          font: {
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
        display: true,
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        display: true,
      },
    },
  };


  const getColorSettings = (value) => {
    if (!Data) {
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    }

    if (value > convertedMinPower && value < convertedMaxPower) {
        return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
    } else if (value < convertedCriticalPower && value >= convertedMaxPower) {
        return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
    } else if (value >= convertedCriticalPower || value <= convertedMinPower) {
        return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
    }
    return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
};

  const powerValue = Data?.meter_reading?.length ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = Data ? convertPower(powerValue, power) : 0;
  const formattedValue = Data ? formatValue(convertedValue) : 0;
  const tempCheck = getColorSettings(powerValue);
  const fontSize = formattedValue.length > 4 ? '50px' : '60px';

  const sendCriticalPower = async () => {
    try {
      const criticalPower = {
        power: powerValue,
        critical_power: Data?.critical_power,
        meter_name: Data?.meter_name?.toUpperCase(),
        meter_location: Data?.node_location
      }
      if (powerValue > Data?.critical_power) {
        await criticalpowerMail(criticalPower);
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendCriticalPower();

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };


  return (
    <Card sx={{ ...styles.thinBorder, width: 920, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors,position : 'relative', left : -15, bottom : 10 }}>
            <TemperatureIcon className="temperature-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
              Power Meter
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            {Data?.meter_reading?.length  ?
              <Box>
                <Box sx={{
                  textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 10, whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {formattedValue}
                  <sup>
                    <FormControl sx={{ color: tempCheck.colors, width : 50 }} size="small" variant="outlined">
                      <Box onClick={handleClick} size='small' sx={{
                        cursor: 'pointer', height: 35, marginTop: '30px',
                      }}>
                        <sup style={{ fontSize: 18, verticalAlign: 'top', color: tempCheck.colors, }}>{power}</sup>
                      </Box>
                      <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleMenuItemClick("kW")}>kW</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("W")}>W</MenuItem>
                      </Menu>
                    </FormControl>
                  </sup>
                </Box>
              </Box>
              : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px',position : 'relative',bottom : 13  }}>
                  <WifiOffIcon className="temperature-icon" width={72} height={72} />
                </Box>
              )}
            <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: Data?.meter_reading?.length ? -8 : 15, width: 150,justifyContent : 'center', margin : 'auto' }}>
              <ToolTipBox title={`${'Meter Name : ' + Data?.meter_name?.toUpperCase() || 'N/A'} ${'Location : ' + Data?.node_location?.toUpperCase() || 'SEZ'}`} arrow>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {Data?.range?.toUpperCase()},{Data?.meter_name?.toUpperCase() || 'N/A'}
                </Typography>
              </ToolTipBox>
              <Typography sx={{
                textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{Data?.node_location?.toUpperCase() || 'SEZ'}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'relative', bottom: fontSize === '50px' ? 0 : 8 }}>
          <Line data={data} options={options} width='600' height='185' />
        </Box>
      </Box>
    </Card>
  );
};

export default MediumPowerCard;


