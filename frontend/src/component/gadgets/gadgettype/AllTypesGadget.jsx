// src/components/LineChartGadget.js
import React, { useEffect, useState } from "react";
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
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Menu,
} from "@mui/material";
import { useDashboardContext } from "../../context/gadgetcontext";
import ClearIcon from "@mui/icons-material/Clear";
import Tempgadget from "../graphscomponent/tempgad";
import BarChart from "../graphscomponent/barchart";
import LineChart from "../graphscomponent/lineChart";
import PieChart from "../graphscomponent/piechart";
import OneXCard from "../gadgetTypeContentCard/oneXCard";
import TwoXCard from "../gadgetTypeContentCard/twoXCard";
import ThreeXCard from "../gadgetTypeContentCard/threeXCard";
import FourXCard from "../gadgetTypeContentCard/fourXCard";
import { chartsObj } from "../../config/chartsConfigObj";
import { addGraphConfig } from "../../Services/graph.service";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { tempIntData,tempBaseData,enBasicData,enIntData,powBasicData,powIntData,humBasicData,humIntData,noiseBasicData,noiseIntData } from '../../config/cardsConfigData'
import CardComponent from "../../card/graphcard/card";
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



const AllTypeGadget = ({ open, handleClose, typeGraph, allMeters, componentType }) => {
  const [chartType, setChartType] = useState("");
  const [chart, setChart] = useState();
  const [sizeSelected, setSizeSelected] = useState('1x');
  const [chartWidth, setChartWidth] = useState(450);
  const [chartHeight, setChartHeight] = useState(450);
  const [selectedMeter, setSelectedMeter] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const handleAddToDashboard = async () => {
    try {
      console.log(selectedMeter,"okokokookoko");
      
      const completeGadget = {
        userId: sessionStorage.getItem('userId'),
        gadgetType: typeGraph,
        chartType: chartType,
        meter: selectedMeter.node_mac,
        chartHeight: chartHeight,
        chartWidth: chartWidth,
        componentType: componentType,
        timePeriod: timePeriod,
        gadgetTypeJp : typeGraph === 'energy' ? 'エネルギー' : typeGraph === 'power' ? 'パワー' : typeGraph === 'temperature' ? '温度' : typeGraph === 'humidity' ? '湿度' : '湿度'
      }
      if (!completeGadget.gadgetType || !completeGadget.chartType || !completeGadget.meter || !completeGadget.timePeriod) {
        setError(true)
        setMessage('All Field Needs to be select');
        setOpenSnackbar(true);
        return
      }
      console.log(completeGadget, 'compgad');
      const response = await addGraphConfig(completeGadget);
      setSuccess(!!response);
      setError(!response);
      setMessage(response?.message || "An error occurred");
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      console.log('Error in handleAddToDashboard', error);
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
  };

  const handleChartSize = (size, width, height) => {
    setSizeSelected(size)
    setChartWidth(width);
    setChartHeight(height);
  }

  const renderChart = () => {
    let newChart = null;

    switch (chartType) {
      case "line":
        newChart = chartsObj.find((chart) => chart.chartId === 'line')?.render({ chartHeight, chartWidth });
        break;

      case "bar":
        newChart = chartsObj.find((chart) => chart.chartId === 'bar')?.render({ chartHeight, chartWidth });
        break;

      case "area":
        newChart = chartsObj.find((chart) => chart.chartId === 'area')?.render({ chartHeight, chartWidth });
        break;

      case "basicEnergy":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicEnergy')?.render({ Data: enBasicData });
        break;

      case "intermidiateEnergy":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateEnergy')?.render({ Data: enIntData });
        break;

      case "basicPower":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicPower')?.render({ Data: powBasicData });
        break;

      case "intermidiatePower":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiatePower')?.render({ Data: powIntData });
        break;

      case "basicTemp":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicTemp')?.render({ Data: tempBaseData });
        break;

      case "intermidiateTemp":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateTemp')?.render({ Data: tempIntData });
        break;

      case "basicHumidity":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicHumidity')?.render({ Data: humBasicData });
        break;

      case "intermidiateHumidity":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateHumidity')?.render({ Data: humIntData });
        console.log(newChart,'ch');
        
        break;

      case "basicNoise":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicNoise')?.render({ Data: noiseBasicData });
        break;

      case "intermidiateNoise":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateNoise')?.render({ Data: noiseIntData });
        break;

      case "basicCO2":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicCO2')?.renderImg();
        break;

      case "intermidiateCO2":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateCO2')?.renderImg();
        break;

      case "basicLux":
        newChart = chartsObj.find((chart) => chart.chartId === 'basicLux')?.renderImg();
        break;

      case "intermidiateLux":
        newChart = chartsObj.find((chart) => chart.chartId === 'intermidiateLux')?.renderImg();
        break;

      default:
        console.warn("Unknown chart type:", chartType);
        break;
    }

    return {
      chart: newChart,
      type: chartType,
    };
  };

  useEffect(() => {

  }, [])

  return (
    <Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} sx={{ margin: 'auto' }}>
        <Alert
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
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
            height: "auto",
            width: "90%",
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>{typeGraph.toUpperCase()} GADGET</DialogTitle>
          <IconButton
            onClick={handleClose}
            color="inherit"
            sx={{
              marginRight: "50px",
              "&:hover": { opacity: 1, background: "transparent" },
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {chartsObj
              .filter((chart) => chart.type.includes(typeGraph))
              .map((chart) => (
                <Button
                  key={chart.chartId}
                  onClick={() => handleChartTypeChange(chart.chartId)}
                  sx={{
                    border: styles.thinBorder,
                    color: chartType === chart.chartId ? "white" : "black",
                    background: chartType === chart.chartId ? "#446FF2" : "",
                  }}
                >
                  {chart.chartName}
                </Button>
              ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            <FormControl fullWidth sx={{
              maxWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}>
              <InputLabel htmlFor="select-meter">Select Meter</InputLabel>
              <Select
                input={<OutlinedInput label="Select Meter" />}
                defaultValue="Select Meter"
                value={selectedMeter}
                onChange={(e) => setSelectedMeter(e.target.value)}
              >
                {allMeters?.map((meter, index) => (
                  <MenuItem key={index} value={meter}>
                    {meter.meter_name_jp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{
              maxWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}>
              <InputLabel htmlFor="firm-status">Select Time Period</InputLabel>
              <Select
                input={<OutlinedInput label="Select Time Period" />}
                defaultValue="Select Time Period"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                {/* {typeGraph !== 'energy' ? <MenuItem value={'live'}>Live</MenuItem> : null
                } */}
                 <MenuItem value={'live'}>Live</MenuItem>
                <MenuItem value={'day'}>Day</MenuItem>
                <MenuItem value={'week'}>Week</MenuItem>
                <MenuItem value={'month'}>Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // margin : 'auto',
              paddingTop: "20px",
              width: 'auto',
              height: 'auto',
            }}
          >
            {renderChart().chart}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToDashboard}
            sx={{ margin: "auto", borderRadius: "10px", bgcolor: "#446FF2" }}
          >
            Add to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllTypeGadget;
