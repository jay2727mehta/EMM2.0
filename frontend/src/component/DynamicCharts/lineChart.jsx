// LineChart.js
import React, { useState } from "react";
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
} from "chart.js";
import { Box } from "@mui/material";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { lineData } from "../config/chartDataConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
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
    labels: label
      ? label
      : lineData.labels,
    datasets: dataset
      ? [
        {
          label: yAxis,
          data: dataset,
          fill: false,
          backgroundColor: "orange",
          borderColor: "orange",
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4, // Controls the curvature of the line
          cubicInterpolationMode: "monotone",
        },
      ]
      : [
        {
          label: lineData.labels,
          data: lineData.data,
          fill: false,
          backgroundColor: "orange",
          borderColor: "orange",
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
        display: true, // Set to true to display the title
        text: title, // Replace with your title text
        font: {
          size: 16, // Font size for the title
          weight: 'bold', // Font weight for the title
        },
        padding: {
          top: 10, // Padding above the title
          bottom: 10, // Padding below the title
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
        offset: true,
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
    // <Draggable>
    <Box
      sx={{
        height: chartHeight ? chartHeight : "400px",
        width: chartWidth ? chartWidth : "400px",
        padding: "20px",
        //   cursor: "move",
      }}
    >
      <Line data={data} options={options} height="100%" width="100%" />
    </Box>
    // </Draggable>
  );
};

export default LineChart;
