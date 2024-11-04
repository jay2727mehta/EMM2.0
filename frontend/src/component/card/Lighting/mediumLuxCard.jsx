import React, { useState } from 'react';
import { Box, Typography, Card, MenuItem, Menu, FormControl, Tooltip as ToolTipBox } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/loader.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumLuxCard = ({ Data, chartData }) => {
  const [temperature, setTemperature] = useState('LUX');
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setTemperature(value);
    handleClose();
  };

  const convertTemperature = (value, unit) => {
    if (value < 0) {
      return 0;
    }
    switch (unit) {
      default: return value;
    }
  };

  const convertDataValues = (values, unit) => {
    return values.map(value => convertTemperature(value, unit));
  };


  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return 0; // Return a default value if `value` is undefined or null
    }

    const isNegative = value < 0; // Check if the value is negative
    value = isNegative ? 0 : value; // Work with the absolute value for formatting

    let formattedValue;
    if (value >= 1_000_000_000) {
      formattedValue = (value / 1_000_000_000).toFixed(1) + 'b'; // Billions
    } else if (value >= 1_000_000) {
      formattedValue = (value / 1_000_000).toFixed(1) + 'm'; // Millions
    } else if (value >= 1_000) {
      formattedValue = (value / 1_000).toFixed(1) + 'k'; // Thousands
    } else {
      formattedValue = value.toFixed(2); // For values less than 1,000
    }

    return formattedValue; // Add the negative sign if applicable
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

  const convertedMinTemp = Data ? convertTemperature(Data.min_lux, temperature) : null;
  const convertedMaxTemp = Data ? convertTemperature(Data.max_lux, temperature) : null;
  const convertedCriticalTemp = Data ? convertTemperature(Data.critical_lux, temperature) : null;

  function getGradient(ctx, chartArea, data) {
    if (!Data) {
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
      }
      else if (value > convertedMaxTemp && value < convertedCriticalTemp) {
        return '#e7af84'; // Orange
      } else if (value >= convertedCriticalTemp || value < convertedMinTemp) {
        return '#F26457'; // Red
      }
      else {
        return '#757676'
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
          text: `LUX` // Label for the x-axis
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
    if (Data) {
      return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' }
    }

    return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };

  };

  const temperatureValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = convertTemperature(temperatureValue, temperature);
  const tempCheck = getColorSettings(temperatureValue);
  const formattedValue = Data ? formatValue(convertedValue) : 0;
  const fontSize = formattedValue ? formattedValue?.length > 3 ? '45px' : '60px' : '60px';

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
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
            <TemperatureIcon className="temperature-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
              LUX Level
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            {Data?.meter_reading?.length ? (
              <Box>
                <Box sx={{ textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 10, whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', }}>
                  {formattedValue}
                  <sup>
                    <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                      <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                        <sup style={{ fontSize: '18px', verticalAlign: 'top', color: tempCheck.colors }}>{temperature}</sup>
                      </Box>
                      <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleMenuItemClick("LUX")}>LUX</MenuItem>
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
            <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: fontSize === '45px' ? 5 : 6, top: fontSize === '45px' ? 10 : '', }}>
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
        <Box sx={{ position: 'relative', bottom: fontSize === '45px' ? 0 : 8 }}>
          <Line data={data} options={options} width='600' height='195' />
        </Box>
      </Box>
    </Card>
  );
};

export default MediumLuxCard;
