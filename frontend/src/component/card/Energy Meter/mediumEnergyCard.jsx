import React, { useState } from 'react';
import { Box, Typography, Card, FormControl, Menu, MenuItem, Tooltip as ToolTipBox } from '@mui/material';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumEnergyCard = ({ Data, chartData }) => {

  const [energy, setEnergy] = useState('kWh');
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();

  const convertEnergy = (value, unit) => {
    if (value < 0) {
      return 0;
    }

    switch (unit) {
      case 'Wh':
        return value * 1000;
      case 'kWh':
      default:
        return value;
    }
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return 0; // Return a default value if `value` is undefined or null
    }

    const isNegative = value < 0; // Check if the value is negative
    value = isNegative ? 0 : value; // Work with the absolute value for formatting

    let formattedValue;
    if (value >= 1_000_000_000) {
      formattedValue = (value / 1_000_000_000).toFixed(1) + 'B'; // Billions
    } else if (value >= 1_000_000) {
      formattedValue = (value / 1_000_000).toFixed(1) + 'M'; // Millions
    } else if (value >= 1_000) {
      formattedValue = (value / 1_000).toFixed(1) + 'K'; // Thousands
    } else {
      formattedValue = value.toFixed(1); // For values less than 1,000
    }

    return formattedValue; // Add the negative sign if applicable
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

  const labels = Data && Data.timestamp ? Data.timestamp : [];
  const dataValues = Data && Data.meter_reading ? convertDataValues(Data.meter_reading, energy) : [];

  chartData = {
    labels: labels,
    data: dataValues,
  };

  const data = {
    labels: chartData ? chartData.labels : '',
    datasets: [
      {
        label: `Energy (${energy})`,
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

  const convertedMinEnergy = Data ? convertEnergy(Data.min_energy, energy) : null;
  const convertedMaxEnergy = Data ? convertEnergy(Data.max_energy, energy) : null;
  const convertedCriticalEnergy = Data ? convertEnergy(Data.critical_energy, energy) : null;

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
          text: `energy`,
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
      }
    },

  };

  const getColorSettings = (value) => {
    if (!Data) {
      return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    }

    if (value > Data.min_energy && value < Data.max_energy) {
      return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
    } else if (value < Data.critical_energy && value >= Data.max_energy) {
      return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
    } else if (value >= Data.critical_energy || value <= Data.min_energy) {
      return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
    }
    return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
  };

  const energyValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
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
    <Card sx={{
      ...styles.thinBorder, width: 920, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2, whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors, position: 'relative', bottom: 18, left: -0 }}>
            <TemperatureIcon className="temperature-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
              Energy Meter
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            {Data?.meter_reading?.length ? (
              <Box>
                <Box sx={{
                  display: 'flex', justifyContent: 'center',
                  textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 20,
                }}>
                  <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{formattedValue}</Typography>
                  <sup style={{ position: 'relative', bottom: 25, }}>
                    <FormControl sx={{ color: tempCheck.colors, width: 50, wordBreak: 'break-word' }} size="small" variant="outlined" >
                      <Box ref={ref} onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                        <sup style={{ fontSize: 18, verticalAlign: 'top', color: tempCheck.colors, wordBreak: 'break-word' }}>{energy}</sup>
                      </Box>
                      <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleMenuItemClick("kWh")}>kwh</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("Wh")}>wh</MenuItem>
                      </Menu>
                    </FormControl>
                  </sup>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px', position: 'relative', bottom: 13 }}>
                <WifiOffIcon className="temperature-icon" width={72} height={72} />
              </Box>
            )}
            <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: Data?.meter_reading?.length ? 5 : 15, width: 150, justifyContent: 'center', margin: 'auto' }}>
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
          <Line data={data} options={options} width='600' height='195' />
        </Box>
      </Box>
    </Card>
  );
};

export default MediumEnergyCard;

