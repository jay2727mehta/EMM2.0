import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import Draggable from "react-draggable";
import { Box } from "@mui/material";

const ResizableBoxComponent = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);

  const handleResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: "orange",
        borderColor: "orange",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
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
        radius: 0,
      },
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
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
          text: "Label",
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
          text: "Value",
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

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  return (
    <div>
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[250, 250]}
        maxConstraints={[800, 800]}
        onResize={handleResize}
      >
        <Draggable>
          <Box
            sx={{
              height: height ? height : "400px",
              width: width ? width : "400px",
              border: styles.thinBorder,
              borderRadius: "20px",
              padding: "20px",
              cursor : 'grab'
            }}
          >
            <Line data={data} options={options} height="100%" width="100%" />
          </Box>
        </Draggable>
      </ResizableBox>
    </div>
  );
};

export default ResizableBoxComponent;
