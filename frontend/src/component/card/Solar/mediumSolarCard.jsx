import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, FormControl, Menu, MenuItem, Tooltip as ToolTipBox } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';
import { type } from '@testing-library/user-event/dist/type';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumSolarCard = ({ Data, chartData }) => {
  const [energy, setEnergy] = useState('kW');
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();
  const min_energy = 20;
  const max_energy = 80;
  const critical_energy = 100;

  const convertEnergy = (value, unit) => {
    switch (unit) {
      case 'W':
        return value * 1000;
      case 'kW':
      default:
        return value;
    }
  };

  const formatValue = (value) => {
    if (!value) {
      return 0; // Return a default value if `value` is undefined or null
    }
    console.log(value);

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
    setEnergy(value);
    handleClose();
  };

  const convertDataValues = (values, unit) => {
    return values.map(value => convertEnergy(value, unit));
  };

  function convertToDateTimeString(isoString) {
    const date = new Date(isoString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const labels = Data && Data.length ? Data.map((item) => convertToDateTimeString(item.timestamp)) : [];
  const dataValues = Data && Data.length ? convertDataValues(Data.map((item) => item.solar_active_power_kw / 1000), energy) : [];
  console.log(dataValues);

  chartData = {
    labels: labels,
    data: dataValues,
  };

  const data = {
    labels: chartData ? chartData.labels : '',
    datasets: [
      {
        label: `Solar Power (${energy})`,
        data: chartData ? chartData.data : '',
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

  const convertedMinEnergy = Data ? convertEnergy(min_energy, energy) : null;
  const convertedMaxEnergy = Data ? convertEnergy(max_energy, energy) : null;
  const convertedCriticalEnergy = Data ? convertEnergy(critical_energy, energy) : null;

  function getGradient(ctx, chartArea, data) {
    if (!Data || isNaN(convertedMinEnergy) || isNaN(convertedMaxEnergy) || isNaN(convertedCriticalEnergy)) {
      console.error("Data object is missing required properties.");
      return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    }

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    if (minValue === maxValue || isNaN(minValue) || isNaN(maxValue)) {
      return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    }

    const sortedData = [...data].sort((a, b) => a - b);

    const colorScale = (value) => {
      if (value >= convertedMinEnergy && value <= convertedMaxEnergy) {
        return '#76C739'; // Green
      } else if (value > convertedMaxEnergy && value < convertedCriticalEnergy) {
        return '#e7af84'; // Orange
      } else if (value >= convertedCriticalEnergy || value < convertedMinEnergy) {
        return '#F26457'; // Red
      } else {
        return '#000000'; // Fallback color in case value is undefined
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
          display: true,
          text: 'Time Period' ,
          font: {
            weight : 'bold',
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
            weight : 'bold',
            color: '#9e9e9e',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `Solar Power (${energy})`,
          font: {
            weight : 'bold',
            color: '#9e9e9e',
          },
        },
        display: true,
        ticks: {
          font: {
            size: 10,
            weight : 'bold',
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
      }
    },

  };

  const getColorSettings = (value) => {
    if (Data.length) { 
        return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
    }
    else {
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    }
};

  const energyValue = (Data && Array.isArray(Data) && Data.length) ? (Data[Data.length - 1].solar_active_power_kw) / 1000 : 0;
  const convertedValue = Data ? convertEnergy(energyValue, energy) : 0;
  const formattedValue = Data ? formatValue(convertedValue) : 0;
  const tempCheck = getColorSettings(energyValue);
  const fontSize = formattedValue ? formattedValue.length > 4 ? '50px' : '60px' : '60px';

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  return (
    <Card sx={{ ...styles.thinBorder, width: 1500, height: '275px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
            <TemperatureIcon className="temperature-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
              Solar Power
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            {Data && (Array.isArray(Data) ? Data.length > 0 : false) ? (
              <Box>
                <Box sx={{ textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 10 , whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',}}>
                  {formattedValue}
                  <sup>
                    <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                      <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                        <sup style={{ fontSize: formattedValue.length > 4 ? '20px' : '24px', verticalAlign: 'top', color: tempCheck.colors }}>{energy}</sup>
                      </Box>
                      <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleMenuItemClick("kW")}>kw</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("W")}>w</MenuItem>
                      </Menu>
                    </FormControl>
                  </sup>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px' }}>
                <WifiOffIcon className="temperature-icon" width={72} height={72} />
              </Box>
            )}
            <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: fontSize === '45px' ? 10 : 6, top: fontSize === '45px' ? 8 : '', }}>
              {/* <Typography sx={{
                        textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        
                    }}>{Data?.meter_name.toUpperCase() || 'N/A'}</Typography> */}
              <ToolTipBox title={`Current Solar Power, SEZ Campus`} arrow>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                  }}
                >
                  {Data?.meter_name?.toUpperCase() || 'Current Solar Power'}
                </Typography>
              </ToolTipBox>

              <Typography sx={{
                textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{Data?.node_location?.toUpperCase() || 'SEZ Campus'}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'relative', bottom: fontSize === '50px' ? 0 : 8 }}>
          <Line data={data} options={options} width='1200' height='210' />
        </Box>
      </Box>
    </Card>
  );
};

export default MediumSolarCard;

