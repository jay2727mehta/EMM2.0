import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as FlowIcon } from "../../config/svgfiles/git-commit.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './flow.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MediumFlowCard = ({ Data, chartData }) => {
  const data = {
    labels: chartData ? chartData.labels : [],
    datasets: [
      {
        label: 'Flow (L/S)',
        data: chartData ? chartData.data : [],
        borderColor: chartData
          ? (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return null;
            }

            return getGradient(ctx, chartArea, context.dataset.data);
          }
          : 'transparent',  // Fallback to a transparent color if no data is available
        tension: 0.4,
        borderWidth : 4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  function getGradient(ctx, chartArea, data) {
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    if (minValue === maxValue || minValue === undefined || maxValue === undefined) {
      console.error("Invalid minValue or maxValue");
      return ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    }

    // Define color thresholds and their corresponding colors
    const thresholds = [
      { value: minValue, color: '#A28EBF' }, // Color for the lowest range
      { value: (maxValue + minValue) / 2, color: '#F25E6B' }, // Midpoint color
      { value: maxValue, color: '#A28EBF' }  // Color for the highest range
    ];

    // Create a gradient from left to right
    const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);

    // Add color stops based on thresholds
    thresholds.forEach((threshold, index) => {
      const nextThreshold = thresholds[index + 1];
      if (nextThreshold) {
        // Calculate position as a ratio of the data range
        const position1 = (threshold.value - minValue) / (maxValue - minValue);
        const position2 = (nextThreshold.value - minValue) / (maxValue - minValue);

        // Ensure positions are within the range [0, 1]
        const clampedPosition1 = Math.max(0, Math.min(1, position1));
        const clampedPosition2 = Math.max(0, Math.min(1, position2));

        // Add color stops
        gradient.addColorStop(clampedPosition1, threshold.color);
        gradient.addColorStop(clampedPosition2, nextThreshold.color);
      }
    });

    // Ensure the gradient covers the entire range
    gradient.addColorStop(1, thresholds[thresholds.length - 1].color);

    return gradient;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
          borderColor: '#e0e0e0', // Color of the grid lines
          borderWidth: 1, // Width of the grid lines
          borderDash: [5, 5], // Dashed lines (5px dash, 5px gap)
        },
        ticks: {
          font: {
            size: 10,
            color: '#9e9e9e',
          },
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          borderColor: '#e0e0e0', // Color of the grid lines
          borderWidth: 1.5, // Width of the grid lines
          borderDash: [2, 5], // Dashed lines (5px dash, 5px gap)
        },
        ticks: {
          font: {
            size: 10,
            color: '#9e9e9e',
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
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
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const getColorSettings = (value) => {
    if (value >= 1) {
        return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B', fillCol: '#0477BF' };
    } else if (value < 1 && value >= 0.5) {
        return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00', fillCol: '#F25C05' };
    } else if (value < 0.5) {
        return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000', fillCol: '#F20505' };
    }
    return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676', fillCol: '#D6D6D6' };
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
    <Card sx={{ ...styles.thinBorder, width: 800, height: '275px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors, gap: '8px' }}>
            <FlowIcon className="temperature-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
              Flow
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            {Data.value ? <Box>
              <Box sx={{ textAlign: 'center', fontSize: '72px', fontWeight: 'bold', color: tempCheck.colors }}>{Data.value}<sup style={{ fontSize: '24px', verticalAlign: 'top' }}>L/S</sup></Box>
            </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginBottom: '20px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
            <Box sx={{ color: tempCheck.fontColor }}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.meter_name}</Typography>
              <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ margin: 'auto' }}>
          <Line data={data} options={options} width='500' height='200' />
        </Box>
      </Box>
    </Card>
  );
};

export default MediumFlowCard;

