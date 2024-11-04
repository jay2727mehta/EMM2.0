import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Box } from "@mui/material";
import { lineData } from "../config/chartDataConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AreaChart = ({
  title,
  label,
  dataset,
  xAxis,
  yAxis,
  chartHeight,
  chartWidth,
}) => {
  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  const data = {
    labels: label ? label : lineData.labels,
    datasets: dataset
      ? [
        {
          label: yAxis ? yAxis : lineData.yAxis,
          data: dataset,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "#0099FF",
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4, // Controls the curvature of the line
          cubicInterpolationMode: "monotone",
        },
      ]
      : [
        {
          label: lineData.yAxis,
          data: lineData.data,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "#0099FF",
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4, // Controls the curvature of the line
          cubicInterpolationMode: "monotone",
        },
      ],
  };

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
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
       enabled: true,
      },
      title: {
        display: true, 
        text: title, 
        font: {
          size: 16, 
          weight: 'bold', 
        },
        padding: {
          top: 10, 
          bottom: 10,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        offset: true,
        title: {
          display: true,
          text: xAxis ? xAxis : lineData.xAxis,
          font: {
            weight: "bold",
            style: "normal",
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {},
        },
      },
      y: {
        offset: false,
        title: {
          display: true,
          text: yAxis ? yAxis : lineData.yAxis,
          font: {
            weight: "bold",
            style: "normal",
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {},
        },
      },
    },
  };

  return (
    <Box
      sx={{
        height: chartHeight ? chartHeight : lineData.chartHeight,
        width: chartWidth ? chartWidth : lineData.chartWidth,
        padding: "20px",
        backgroundColor : 'none'
        //   cursor: "move",
      }}
    >
      <Line data={data} options={options} />{" "}
    </Box>
  );
};

export default AreaChart;
