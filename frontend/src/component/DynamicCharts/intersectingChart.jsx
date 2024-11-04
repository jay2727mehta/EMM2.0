import React from "react";
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
import { intersectingLineData } from "../config/chartDataConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IntersectingLineChart = ({
  title,
  label,
  dataset1,
  dataset2,
  xAxis1,
  xAxis2,
  yAxis1,
  yAxis2,
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
      : intersectingLineData.label,
    datasets: [
      dataset1
        ? {
          label: yAxis1,
          data: dataset1,
          fill: false,
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4, // Controls the curvature of the line
          cubicInterpolationMode: "monotone",
        }
        : {
          label: intersectingLineData.yAxis1,
          data: intersectingLineData.data1,
          fill: false,
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4, // Controls the curvature of the line
          cubicInterpolationMode: "monotone",
        },
      dataset2
        ? {
          label: yAxis2,
          data: dataset2,
          fill: false,
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4, // Controls the curvature of the line
          cubicInterpolationMode: "monotone",
        }
        : {
          label: intersectingLineData.yAxis2,
          data: intersectingLineData.data2,
          fill: false,
          backgroundColor: "red",
          borderColor: "red",
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
          text: xAxis1 ? xAxis1 : intersectingLineData.xAxis1,
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
          text: yAxis1 ? yAxis1 : intersectingLineData.yAxis1,
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
        border: styles.thinBorder,
        borderRadius: "20px",
        padding: "20px",
        //   cursor: "move",
      }}
    >
      {" "}
      <Line data={data} options={options} height="100%" width="100%" />{" "}
    </Box>
  );
};

export default IntersectingLineChart;
