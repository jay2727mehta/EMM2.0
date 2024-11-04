import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, FormControl, Menu, MenuItem, Tooltip as ToolTipBox } from '@mui/material';
import { Line,Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';
import { criticalpowerMail } from "../../Services/emailservice";
import { iconsCon } from "../../config/iconsConfig";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumCard = ({ Data, chartData }) => {

  const getConversion = (type) => {
    switch (type) {
      case 'intermidiateEnergy': return 'kWh';
      case 'intermidiatePower': return 'kW';
      case 'intermidiateTemp': return '°C';
      case 'intermidiateHumidity': return '%';
      case 'intermidiateNoise': return 'dB';
      case 'intermidiateCO2': return 'ppm';
      case 'intermidiateLux': return 'LUX';
      case 'intermidiateCurrent': return 'A';
      default: return '';
    }
  };

  const [power, setpower] = useState();
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [criticalValue, setCriticalValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();

  const convertPower = (value, unit) => {
    try {
      if (value == null || isNaN(value)) return 0;

      switch (unit) {
        case 'W': return value * 1000;
        case 'kW': return (value);
        case '°C': return value;
        case '°K': return (value + 273.15);
        case '°F': return (value * 9 / 5) + 32;
        case 'Wh': return value * 1000;
        case 'kWh': return (1.0 * value);
        default:
          return value;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatValue = (value) => {
    try {
      if (value == null || isNaN(value)) {
        return '0'; // Return default '0' for undefined, null, or NaN values
      }
  
      if (value >= 1_000_000_000) {
        return (value / 1_000_000_000)?.toFixed(1) + 'B'; // Billions
      } else if (value >= 1_000_000) {
        return (value / 1_000_000)?.toFixed(1) + 'M'; // Millions
      } else if (value >= 1_000) {
        return (value / 1_000)?.toFixed(1) + 'K'; // Thousands
      } else {
        return value?.toFixed(2); // For values less than 1,000
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setpower(value);
    handleClose();
  };

  const convertDataValues = (values, unit) => {
    try {
      if (!Array.isArray(values)) return []; // Handle cases where `values` is not an array
      return values?.map(value => convertPower(value, unit));
    } catch (error) {
      console.log(error);
    }
  };

  const labelsData = Data?.timestamp?.slice(1) ?? [];
  const dataValuesData = Data?.meter_reading ? convertDataValues(Data?.meter_reading?.slice(1), power) : [];
  


  // console.log(labelsData,'chdata',dataValuesData);


  chartData = {
    labels: labelsData,
    data: dataValuesData,
  };

  
  

  const data = {
    labels: chartData?.labels || '',
    datasets: [
      {
        label: `${Data?.gadget_name} (${power})`,
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

  const dataBar = {
    labels: chartData?.labels || '',
    datasets: [
      {
        label: `${Data?.gadget_name} (${power})`,
        data: chartData?.data || '',
        backgroundColor: chartData ? (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea, context.dataset.data);
        } : '',
        tension: 0.4,
        fill : true,
        //borderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const getCriticalValues = (type) => {
    try {
      if (type === ('intermidiateEnergy')) {
        setMinValue(Data?.min_energy);
        setMaxValue(Data?.max_energy);
        setCriticalValue(Data?.critical_energy);
      }
  
      if (type === ('intermidiatePower')) {
        setMinValue(Data?.min_power);
        setMaxValue(Data?.max_power);
        setCriticalValue(Data?.critical_power);
      }
  
      if (type === ('intermidiateTemp')) {
        setMinValue(Data?.min_temp);
        setMaxValue(Data?.max_temp);
        setCriticalValue(Data?.critical_temp);
      }
  
      if (type === ('intermidiateHumidity')) {
        setMinValue(Data?.min_humidity);
        setMaxValue(Data?.max_humidity);
        setCriticalValue(Data?.critical_humidity);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const convertedMinPower = minValue ? convertPower(minValue, power) : null;
  const convertedMaxPower = maxValue ? convertPower(maxValue, power) : null;
  const convertedCriticalPower = criticalValue ? convertPower(criticalValue, power) : null;

  function getGradient(ctx, chartArea, data) {
    try {
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
        if (!minValue || !maxValue || !criticalValue) {
            return '#757676'
        }
        
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
    } catch (error) {
      console.log(error);
    }
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
          text: `${Data?.gadget_name} (${power})`,
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

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    elements: {
      bar: {
        borderWidth: 2, // Customize bar border
      },
    },
    scales: {
      x: {
        title: {
          display: false, // Show the title for x-axis
          text: `Time Period`,
          font: {
            weight: 'bold',
            color: '#9e9e9e',
          },
        },
        grid: {
          display: true, // Optionally display grid lines
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
          text: `${Data?.gadget_name} (${power})`,
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
  

  // const getColorSettings = (value) => {
  //   try {
  //     if (!value) {
  //       // If any of the required values are null, return default colors
  //       return {
  //         bgColor: '#E5EBEB',
  //         borderColor: '#E5EBEB',
  //         colors: '#757676',
  //         fontColor: '#757676',
  //       };
  //     }
  
  //     if (value > minValue && value < maxValue) {
  //       // Within normal range (Green)
  //       return {
  //         bgColor: '#E9EEEF',
  //         borderColor: '#E9EEEF',
  //         colors: '#006DBC',
  //         fontColor: '#878A8B',
  //       };
  //     } else if (value >= maxValue && value < criticalValue) {
  //       // In the warning range (Orange)
  //       return {
  //         bgColor: '#FFF0D9',
  //         borderColor: '#FF740E',
  //         colors: '#FF6B00',
  //         fontColor: '#FF6B00',
  //       };
  //     } else if (value >= criticalValue || value <= minValue) {
  //       // Outside critical range (Red)
  //       return {
  //         bgColor: '#FFD9D9',
  //         borderColor: '#FF0E0E',
  //         colors: '#FF0000',
  //         fontColor: '#FF0000',
  //       };
  //     }
  
  //     // Return default colors if conditions are not met
  //     return {
  //       bgColor: '#E5EBEB',
  //       borderColor: '#E5EBEB',
  //       colors: '#757676',
  //       fontColor: '#757676',
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  const getColorSettings = (value) => {
    try {
      if (!value|| (!minValue || !maxValue)) {
        // If any of the required values are null, return default colors
        return {
          bgColor: '#E5EBEB',
          borderColor: '#E5EBEB',
          colors: '#757676',
          fontColor: '#757676',
        }
      // }else if (value &&!minValue && !maxValue) {
      //   // Within normal range (Green)
      //   return {
      //     bgColor: '#E9EEEF',
      //     borderColor: '#E9EEEF',
      //     colors: '#006DBC',
      //     fontColor: '#878A8B',
      //   };
      // }
      }else if (value > minValue && value < maxValue) {
        // Within normal range (Green)
        return {
          bgColor: '#E9EEEF',
          borderColor: '#E9EEEF',
          colors: '#006DBC',
          fontColor: '#878A8B',
        };
      } else if (value >= maxValue && value < criticalValue) {
        // In the warning range (Orange)
        return {
          bgColor: '#FFF0D9',
          borderColor: '#FF740E',
          colors: '#FF6B00',
          fontColor: '#FF6B00',
        };
      } else if (value >= criticalValue || value <= minValue) {
        // Outside critical range (Red)
        return {
          bgColor: '#FFD9D9',
          borderColor: '#FF0E0E',
          colors: '#FF0000',
          fontColor: '#FF0000',
        };
      }
  
      // Return default colors if conditions are not met
      return {
        bgColor: '#E5EBEB',
        borderColor: '#E5EBEB',
        colors: '#757676',
        fontColor: '#757676',
      };
    } catch (error) {
      console.log(error);
    }
  };
  const powerValue = Data?.meter_reading?.length ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = Data ? convertPower(powerValue, power) : 0;
  const formattedValue = Data ? formatValue(parseFloat(convertedValue)) : 0;  
  const tempCheck = getColorSettings(powerValue);
  const numericValue = formattedValue.match(/(\d+(\.\d+)?)/g)?.join('') || "";
  const textValue = formattedValue.match(/[a-zA-Z]+/g)?.join('') || "";

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

  const getIcon = (type) => {
    try {
      if (type === ('intermidiateEnergy')) {
        return iconsCon.find((item) => item.gadget_name === 'energy')
      }
  
      if (type === ('intermidiatePower')) {
        return iconsCon.find((item) => item.gadget_name === 'power')
      }
  
      if (type === ('intermidiateTemp')) {
        return iconsCon.find((item) => item.gadget_name === 'temperature')
      }
  
      if (type === ('intermidiateHumidity')) {
        return iconsCon.find((item) => item.gadget_name === 'humidity')
      }
  
      if (type === ('intermidiateNoise')) {
        return iconsCon.find((item) => item.gadget_name === 'noise')
      }
  
      if (type === ('intermidiateCO2')) {
        return iconsCon.find((item) => item.gadget_name === 'co2')
      }
  
      if (type === ('intermidiateLux')) {
        return iconsCon.find((item) => item.gadget_name === 'lux')
      }
  
      if (type === ('intermidiateCurrent')) {
        return iconsCon.find((item) => item.gadget_name === 'current')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (Data?.gadget_type) {
      setpower(getConversion(Data.gadget_type));
    }

    getCriticalValues(Data?.gadget_type)
  }, [Data])

  return (
    <Card sx={{ ...styles.thinBorder, width: 920, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 4, borderRadius: '20px', bgcolor: tempCheck?.bgColor, borderColor: tempCheck?.borderColor, borderWidth: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.3, }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck?.colors, position: 'relative', left: -15, gap: 1 }}>
            {getIcon(Data?.gadget_type)?.render({ width: 32, height: 32 })}
            <Typography variant='h6' fontWeight='bold'>
              {Data?.gadget_name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: Data?.meter_reading?.length ? 3 : 0 }}>
            {Data?.meter_reading?.length ?
              <Box>
                <Box sx={{
                  display: 'flex', justifyContent: 'center',
                  textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck?.colors, whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{numericValue}</Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 2 }}>{textValue}</Typography>
                  <sup style={{ position: 'relative', bottom: 25, }}>
                    <FormControl sx={{ color: tempCheck?.colors }} size="small" variant="outlined">
                      <Box onClick={handleClick} size='small' sx={{
                        cursor: 'pointer', height: 35, marginTop: '30px',
                      }}>
                        <sup style={{ fontSize: 18, verticalAlign: 'top', color: tempCheck?.colors, }}>{power}</sup>
                      </Box>
                      <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {(() => {
                          switch (Data?.gadget_type) {
                            case 'intermidiateEnergy':
                              return (
                                <>
                                  <MenuItem onClick={() => handleMenuItemClick("Wh")}>Wh</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("kWh")}>kWh</MenuItem>
                                </>
                              );
                            case 'intermidiateTemp':
                              return (
                                <>
                                  <MenuItem onClick={() => handleMenuItemClick("°C")}>°C</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("°F")}>°F</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("°K")}>°K</MenuItem>
                                </>
                              );
                            case 'intermidiatePower':
                              return (
                                <>
                                  <MenuItem onClick={() => handleMenuItemClick("W")}>W</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("kW")}>kW</MenuItem>
                                </>
                              );
                            case 'intermidiateHumidity':
                              return (
                                <>
                                  {/* <MenuItem onClick={() => handleMenuItemClick("KW")}>KW</MenuItem> */}
                                  <MenuItem onClick={() => handleMenuItemClick("%")}>%</MenuItem>
                                </>
                              );
                            default:
                              return null; // No menu items for other gadget types
                          }
                        })()}
                      </Menu>

                    </FormControl>
                  </sup>
                </Box>
              </Box>
              : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck?.colors, marginTop: '5px', marginBottom: '25px' }}>
                  <WifiOffIcon className="temperature-icon" width={60} height={60} />
                </Box>
              )}
            <Box ref={ref} sx={{ color: tempCheck?.fontColor, width: 175 }}>
              <ToolTipBox title={`${'デバイス名 : ' + (Data?.meter_name || 'N/A')} ${'位置 : ' + (Data?.node_location || 'フジタ技術センター')}`} arrow>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {/* {Data?.range?.toUpperCase()}, */}
                  {Data?.meter_name?.toUpperCase() || 'N/A'}
                </Typography>
              </ToolTipBox>
              <Typography sx={{
                textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{Data?.node_location_jp?.toUpperCase() || 'フジタ技術センター'}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'relative', bottom: 0 }}>
          {(Data?.gadget_type === 'intermidiateEnergy' && Data?.range !== 'live') ? <Bar data={dataBar} options={optionsBar} width='600' height='185' /> :  <Line data={data} options={options} width='600' height='185' /> }
        </Box>
      </Box>
    </Card>
  );
};

export default MediumCard;


