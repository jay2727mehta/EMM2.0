import React, { useState } from 'react';
import { Box, Typography, Card, MenuItem, Menu, FormControl, Tooltip as ToolTipBox } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/loader.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumTemperatureCard = ({ Data, chartData }) => {
  const [temperature, setTemperature] = useState('°C');
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setTemperature(value);
    handleClose();
  };

  const convertTemperature = (value, unit) => {
    switch (unit) {
      case '°K': return value + 273.15;
      case '°F': return (value * 9 / 5) + 32;
      case '°C':
      default: return value;
    }
  };

  const convertDataValues = (values, unit) => {
    return values.map(value => convertTemperature(value, unit));
  };

  const labels = Data && Data.timestamp ? Data.timestamp : [];
  const dataValues = Data && Data.meter_reading ? convertDataValues(Data.meter_reading, temperature) : [];

  chartData = {
    labels: labels,
    data: dataValues,
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: `Temperature (${temperature})`,
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

  const convertedMinTemp = Data ? convertTemperature(Data.min_temp, temperature) : null;
  const convertedMaxTemp = Data ? convertTemperature(Data.max_temp, temperature) : null;
  const convertedCriticalTemp = Data ? convertTemperature(Data.critical_temp, temperature) : null;

  function getGradient(ctx, chartArea, data) {
    if (!Data || isNaN(convertedMinTemp) || isNaN(convertedMaxTemp) || isNaN(convertedCriticalTemp)) {
      console.error("Data object is missing required properties.");
      return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    }

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    if (minValue === maxValue || isNaN(minValue) || isNaN(maxValue) || !isFinite(minValue) || !isFinite(maxValue)) {
      return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    }

    const sortedData = [...data].sort((a, b) => a - b);

    const colorScale = (value) => {
      if (value >= convertedMinTemp && value <= convertedMaxTemp) {
        return '#76C739'; // Green
      } else if (value > convertedMaxTemp && value < convertedCriticalTemp) {
        return '#e7af84'; // Orange
      } else if (value >= convertedCriticalTemp || value < convertedMinTemp) {
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
        radius: 0,
      },
      line: {
        tension: 0.4,
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
          text: `temperature` // Label for the x-axis
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
    // Ensure Data and its properties are defined
    if (!Data || typeof Data.min_temp === 'undefined' || typeof Data.max_temp === 'undefined' || typeof Data.critical_temp === 'undefined') {
      return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    }

    // Apply the color settings based on the value
    if (value >= Data.min_temp && value <= Data.max_temp) {
      return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
    } else if (value > Data.max_temp && value < Data.critical_temp) {
      return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
    } else if (value >= Data.critical_temp || value < Data.min_temp) {
      return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
    }

    return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
  };

  const temperatureValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = convertTemperature(temperatureValue, temperature);
  const tempCheck = getColorSettings(temperatureValue);
  const fontSize = convertedValue ? convertedValue.toString().length > 3 ? '48px' : '60px' : '60px';

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors, position: 'relative', bottom: 18, left: -25 }}>
            <TemperatureIcon className="temperature-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
              Temperature
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            {Data?.meter_reading?.length ? (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 20 }}>
                  <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{convertedValue?.toFixed(1)}</Typography>
                  <sup style={{ position: 'relative', bottom: 25 }}>
                    <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                      <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                        <sup style={{ fontSize: '18px', verticalAlign: 'top', color: tempCheck.colors }}>{temperature}</sup>
                      </Box>
                      <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleMenuItemClick("°C")}>°C</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("°K")}>°K</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("°F")}>°F</MenuItem>
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
            <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: Data?.meter_reading?.length ? 5 : 15, }}>
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
        <Box sx={{ position: 'relative', bottom: fontSize === '48px' ? 0 : 8 }}>
          <Line data={data} options={options} width='600' height='195' />
        </Box>
      </Box>
    </Card>
  );
};

export default MediumTemperatureCard;
