// src/components/LineChartGadget.js
import React, { useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useDashboardContext } from "../../context/gadgetcontext";
import ClearIcon from "@mui/icons-material/Clear";
import Tempgadget from "../graphscomponent/tempgad";
import BarChart from "../graphscomponent/barchart";
import LineChart from "../graphscomponent/lineChart";
import PieChart from "../graphscomponent/piechart";
import OneXCard from "../gadgetTypeContentCard/oneXCard";
import TwoXCard from "../gadgetTypeContentCard/twoXCard";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LineChartGadget = ({ open, handleClose, selectedCard }) => {
  const [chartType, setChartType] = useState("line");
  const { addGadget } = useDashboardContext();
  const [chart, setChart] = useState();
  const [ showOne,setShowOne] = useState(false);
  const [ showTwo,setShowTwo] = useState(false);
  const [ showThree,setShowThree] = useState(false);
  const [ showFour,setShowFour] = useState(false);

  const handleAddToDashboard = () => {
    const graph = renderChart();

    addGadget(graph);
    handleClose();
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const renderChart = () => {
    let newChart = null;

    switch (chartType) {
      case "line":
        newChart = <LineChart />;
        break;
      case "bar":
        newChart = <BarChart />;
        break;
      case "pie":
        newChart = <PieChart />;
        break;
      case "doughnut":
        newChart = <Tempgadget />;
        break;
      default:
        newChart = <LineChart />; // Default to LineChart if chartType is not recognized
        break;
    }

    const object = {
      chart: newChart,
      type: chartType,
    };
    return object; // Return the JSX to render
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
          padding: "50px",
          bgcolor: "#F1F3F3",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle>Line Chart Gadget</DialogTitle>
        <IconButton
          onClick={handleClose}
          color="inherit"
          sx={{ marginRight: "50px" }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={(prevState) => setShowOne(!prevState)}
            sx={{
              width: 30, // Diameter of the circle
              height: 30,
              borderRadius: "50%", // Makes the button circular
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0, // Ensures the button remains circular even if it has a minimum width set
              padding: 0, // Ensures no extra padding inside the button
            }}
          >
            1x
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: 30, // Diameter of the circle
              height: 30,
              borderRadius: "50%", // Makes the button circular
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0, // Ensures the button remains circular even if it has a minimum width set
              padding: 0, // Ensures no extra padding inside the button
            }}
          >
            2x
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: 30, // Diameter of the circle
              height: 30,
              borderRadius: "50%", // Makes the button circular
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0, // Ensures the button remains circular even if it has a minimum width set
              padding: 0, // Ensures no extra padding inside the button
            }}
          >
            3x
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: 30, // Diameter of the circle
              height: 30,
              borderRadius: "50%", // Makes the button circular
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0, // Ensures the button remains circular even if it has a minimum width set
              padding: 0, // Ensures no extra padding inside the button
            }}
          >
            4x
          </Button>
        </Box>
        {/* <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <Button
            variant="contained"
            onClick={() => handleChartTypeChange("line")}
          >
            Line
          </Button>
          <Button
            variant="contained"
            onClick={() => handleChartTypeChange("bar")}
          >
            Bar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleChartTypeChange("pie")}
          >
            Pie
          </Button>
          <Button
            variant="contained"
            onClick={() => handleChartTypeChange("doughnut")}
          >
            Doughnut
          </Button>
        </Box> */}
        <Box sx={{ margin : 'auto', display : 'flex', justifyContent : 'center'}}>
          {/* {showOne ? <OneXCard /> : showTwo ? <TwoXCard /> : }         */}
        </Box>
        {/* {renderChart().chart} */}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToDashboard}
          sx={{ margin: "auto", borderRadius: "10px" }}
        >
          Add to Dashboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LineChartGadget;
