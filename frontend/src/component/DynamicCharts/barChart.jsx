import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";
import { lineData } from "../config/chartDataConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
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
      backgroundColor: "rgba(255, 255, 255, 0.60)",
    },
  };
  const data = {
    labels: label ? label : lineData.labels,
    datasets: dataset
      ? [
        {
          label: yAxis ? yAxis : lineData.yAxis,
          data: dataset,
          fill: false,
          backgroundColor: "green",
          borderColor: "green",
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
          fill: false,
          backgroundColor: "green",
          borderColor: "green",
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
    <Box
      sx={{
        height: chartHeight ? chartHeight : "400px",
        width: chartWidth ? chartWidth : "400px",
        padding: "20px",
        //   cursor: "move",
      }}
    >
      {" "}
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChart;
