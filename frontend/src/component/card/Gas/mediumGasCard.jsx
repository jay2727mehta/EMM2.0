import React, { useState } from 'react';
import { Box, Typography, Card, MenuItem, Menu, FormControl, Tooltip as ToolTipBox } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as GasIcon } from "../../config/svgfiles/wind.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumGasCard = ({ Data, chartData }) => {
  const [Gas, setGas] = useState('ppm');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setGas(value);
    handleClose();
  };

  const convertGas = (value, unit) => {
    if (value < 0) {
      return 0;
    }
    switch (unit) {
      case 'ppm': return value;
      default: return value;
    }
  };

  const convertDataValues = (values, unit) => {
    return values.map(value => convertGas(value, unit));
  };

  const labels = Data && Data.timestamp ? Data.timestamp : [];
  const dataValues = Data && Data.meter_reading ? convertDataValues(Data.meter_reading, Gas) : [];

  chartData = {
    labels: labels,
    data: dataValues,
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: `Gas (${Gas})`,
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

  const convertedMinTemp = Data ? convertGas(Data.min_co2, Gas) : null;
  const convertedMaxTemp = Data ? convertGas(Data.max_co2, Gas) : null;
  const convertedCriticalTemp = Data ? convertGas(Data.critical_co2, Gas) : null;

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
          display: false,
          text: `Time Period` // Label for the x-axis
        },
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            color: '#9e9e9e',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `Gas` // Label for the x-axis
        },
        display: true,
        ticks: {
          font: {
            size: 10,
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
    if (!Data || !Data.min_co2 || !Data.max_co2 || !Data.critical_co2) {
      return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    }
  
    if (value > Data.min_co2 && value < Data.max_co2) {
      return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
    } else if (value < Data.critical_co2 && value >= Data.max_co2) {
      return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
    } else if (value >= Data.critical_co2 || value <= Data.min_co2) {
      return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
    }
    return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
  };

  const GasValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = convertGas(GasValue, Gas);
  const tempCheck = getColorSettings(GasValue);
  const fontSize = convertedValue ? convertedValue.toString().length > 3 ? '45px' : '60px' : '60px';

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
            <GasIcon className="Gas-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
              CO2
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            {Data && Data.status === '1' && (Array.isArray(Data.meter_reading) ? Data.meter_reading.length > 0 : false) ? (
              <Box>
                <Box sx={{ textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 10, whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', }}>
                  {convertedValue?.toFixed(1)}
                  <sup>
                    <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                      <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                        <sup style={{ fontSize: '24px', verticalAlign: 'top', color: tempCheck.colors }}>{Gas}</sup>
                      </Box>
                      <Menu id="Gas-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
                      </Menu>
                    </FormControl>
                  </sup>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px' }}>
                <WifiOffIcon className="Gas-icon" width={72} height={72} />
              </Box>
            )}
            <Box sx={{ color: tempCheck.fontColor, position: 'relative', bottom: fontSize === '45px' ? 10 : 6, top: fontSize === '45px' ? 8 : '', }}>
              {/* <Typography sx={{
                        textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        
                    }}>{Data?.meter_name.toUpperCase() || 'N/A'}</Typography> */}
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

export default MediumGasCard;
