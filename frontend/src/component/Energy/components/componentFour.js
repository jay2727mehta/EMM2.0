import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDashboardContext } from "../../context/gadgetcontext";
import { Grid, Box } from "@mui/material";
import CardComponent from "../../card/graphcard/card";
import {
  getCompleteGraphConfig,
  getdataEnergyDynamicindi,
  deleteGraphConfig,
  getdata10minSelectedMeter,
} from "../../Services/graph.service";
import { chartsObj } from "../../config/chartsConfigObj";
import SmallTemperatureCard from "../../card/Temperature/smallTemperatureCard";
import TemperatureDisplay from "../../card/Temperature/mediumTemperatureCard";
import SmallProximityCard from "../../card/Proximity/smallProximityCard";
import MediumProximityCard from "../../card/Proximity/mediumProximityCard";
import SmallAirCard from "../../card/Air/smallAirCard";
import MediumAirCard from "../../card/Air/mediumAirCard";
import Draggable from "react-draggable";
import SmallNoiseCard from "../../card/Noise/smallNoiseCard";
import MediumNoiseCard from "../../card/Noise/mediumNoiseCard";
import {
  airData,
  proxData,
  tempChartData,
  tempData,
  proxChartData,
  noiseChartData,
  noiseData,
  preesureData,
  pressureChartData,
  humidityData,
  humidityChartData,
  flowData,
  flowChartData,
  whetherData,
  energyData,
} from "../../config/cardsConfigData";
import SmallPressureCard from "../../card/Pressure/smallPressureCard";
import SmallPressureMeter from "../../card/Pressure/smallPressureMeter";
import MediumPressureCard from "../../card/Pressure/mediumPressureCard";
import SmallHumidityCard from "../../card/Humidity/smallHumidCard";
import MediumHumidCard from "../../card/Humidity/mediumHumidCard";
import SmallFlowCard from "../../card/Flow/smallFlowCard";
import MediumFlowCard from "../../card/Flow/mediumFlowCard";
import LargeFlowCard from "../../card/Flow/largeFlowCard";
import SmallWhetherCard from "../../card/Whether/smallWhetherCard";
import MediumWhetherCard from "../../card/Whether/mediumWhetherCard";
import SmallEnergyCard from "../../card/Energy Meter/smallEnergyCard";
import LargeEnergyCard from "../../card/Energy Meter/largeEnergyCard";
import MediumEnergyCard from "../../card/Energy Meter/mediumEnergyCard";
import SmallEnergyUseCard from "../../card/Energy Meter/smallEnergyUseCard";

const ComponentFour = () => {
  const { dashboardGadgets, removeGadget } = useDashboardContext();
  const [graphConfig, setGraphConfig] = useState([]);
  const [selectedRange, setSelectedRange] = useState("month");
  const [labelgraph, setLabel] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState([]);
  const [chartType, setChartType] = useState([]);
  const [chartSize, setChartSize] = useState([]);
  const component = "home/dghome";
  const initialDataFetched = useRef(false);
  const [labletime, setlabletime] = useState("");

  const fetchGraphConfig = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const resp = await getCompleteGraphConfig(userId);
      // const filteredgraphData  = resp.result.filter(item=>item.component =="home/componentOne")
      console.log(resp.result,'res');
      
      const filteredgraphData = resp.result.filter(
        (item) => item.component === "home/componentFour"
      );
      if (resp) {
        setGraphConfig(filteredgraphData);
      }
    } catch (error) {
      setError("Error fetching graph configuration");
    }
  };

  const fetchEnergyData = async (meterConfig) => {
    try {
      setIsLoading(true);
      const Redata = await getdataEnergyDynamicindi(selectedRange, meterConfig);
      if (!Redata.data.datarange.length) throw new Error("No Data Found!");
      const filteredData = filterData(Redata.data.datarange);
      setChartData((prevData) => [...prevData, filteredData]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred while fetching data");
    }
  };

  const fetchPowerData = async (meterConfig) => {
    try {
      setIsLoading(true);

      const result = await getdata10minSelectedMeter(
        selectedRange,
        meterConfig
      );
      const data = result.data.datarange;
      if (data.length <= 0) {
        throw new Error("No Data Found!");
      }

      const filterData = filterData1(result.data);
      
      setChartData((prevData) => [...prevData, filterData]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred while fetching data");
    }
  };

  // const fetchCharts = useCallback(() => {
  //   if (initialDataFetched.current) return;
  //   initialDataFetched.current = true;
  //   graphConfig.forEach((item) => {
  //     const meterConfig = renderChart(item);
  //     setChartTitle((prevTitles) => [...prevTitles, item.meter_name]);
  //     setChartType((prevData) => [...prevData, item.chart_type]);
  //     setChartSize((prevData) => [...prevData, { height: parseInt(item.chart_height), width: parseInt(item.chart_width) }]);
  //     fetchData(meterConfig);
  //   });
  // }, [graphConfig, selectedRange,chartData]);

  const fetchCharts = useCallback(() => {
    setChartData([]);
    setChartTitle([]);
    setChartType([]);
    setChartSize([]);

    graphConfig.forEach((item) => {
      const meterConfig = renderChart(item);
      setChartType((prevData) => [...prevData, item.chart_type]);
      setChartSize((prevData) => [
        ...prevData,
        {
          height: parseInt(item.chart_height),
          width: parseInt(item.chart_width),
        },
      ]);
      
      if ("energy" in meterConfig) {
        setChartTitle((prevTitles) => [...prevTitles, item.meter_name+" Energy Consumption"]);
        fetchEnergyData(meterConfig);
      } else if ("power" in meterConfig) {
        setChartTitle((prevTitles) => [...prevTitles, item.meter_name+" Power Trendline"]);
        fetchPowerData(meterConfig);
      }
    });
  }, [graphConfig, selectedRange]);

  const renderChart = (meter) => {
    switch (meter.gadget_type) {
      case "alltypes":
      case "energy":
        return { dbTable: meter.name_of_table, energy: meter.energy_watt_hr };
      case "temperature":
        return { dbTable: meter.name_of_table, temperature: meter.temperature_c };
      case "power":
        return { dbTable: meter.name_of_table, power: meter.power_watt };
      case "alert":
        return { dbTable: meter.name_of_table, power: meter.power_watt };
      case "control":
        return { dbTable: meter.name_of_table, moisture: meter.moisture_g_m3 };
      default:
        return {};
    }
  };

  const filterData1 = (Redata) => {
    let label = "";
    switch (selectedRange) {
      case "day":
        label = "Hour";
        setlabletime("Hours");
        break;
      case "week":
        label = "Week";
        setlabletime("Weeks");
        break;
      case "month":
        label = "Month";
        setlabletime("Months");
        break;
      default:
        return Redata;
    }

    const filterData = Redata.datarange.map((item) =>
      // [item.date,item.Apower, item.Rpower, item.ApPower]);
      [item.date, item.Apower]
    );
    // filterData.unshift([label, 'Apparent_power', 'Reactive_power', 'Actual_power']);
    // filterData.unshift([label, "Average power"]);

    return filterData;
  };

  const filterData = (data) => {
    const labelMap = { day: "Days", week: "Weeks", month: "Months" };
    const label = labelMap[selectedRange] || "X-axis";
    setLabel(label);
    return data.map((item) => [item.date, Math.max(0, item.u59)]);
  };

  const handleRemoveGadget = async (titleChart, index) => {
    try {
      const table_config_id = graphConfig.filter(
        (item) => item.meter_name === titleChart
      );
      const resp = await deleteGraphConfig(table_config_id[0].graph_id);
      console.log(resp);
      if (resp) {
        setGraphConfig((prevConfig) =>
          prevConfig.filter((item) => item.meter_name !== titleChart)
        );
        setChartData((prevData) => prevData.filter((_, i) => i !== index));
        setChartTitle((prevTitles) => prevTitles.filter((_, i) => i !== index));
        setChartType((prevTypes) => prevTypes.filter((_, i) => i !== index));
        setChartSize((prevSizes) => prevSizes.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.log("Error deleting gadget: " + error);
    }
  };

  useEffect(() => {
    fetchGraphConfig();
  }, []);

  useEffect(() => {
    if (graphConfig.length) {
      fetchCharts();
    }
  }, [graphConfig, selectedRange]);

  return (
    <Grid container spacing={2}>
      {chartData.map((data, index) => {
        const chartConfig = chartsObj.find(
          (chart) => chart.chartId === chartType[index]
        );
        if (chartConfig) {
          const filteredData = data.slice(1);
          return (
            // <Draggable>
            <Grid item key={index}>
              <CardComponent
                chartData={filteredData}
                chartTitle={chartTitle[index]}
                chartConfig={chartConfig}
                chartHeight={chartSize[index].height}
                chartWidth={chartSize[index].width}
                removeGadget={handleRemoveGadget}
                index={index}
              />
            </Grid>
            // </Draggable>
          );
        }
        return null;
      })}
      {/* <Draggable> */}
      <Grid container spacing={2} padding={5}>
        <Grid item xs={2}>
          <SmallTemperatureCard Data={tempData} />
        </Grid>
        <Grid item xs={2}>
          <SmallProximityCard Data={proxData} />
        </Grid>
        <Grid item xs={2}>
          <SmallAirCard Data={airData} />
        </Grid>
        <Grid item xs={2}>
          <SmallNoiseCard Data={noiseData} />
        </Grid>
        <Grid item xs={2}>
          <SmallPressureCard Data={preesureData} />
        </Grid>
        <Grid item xs={2}>
          <SmallPressureMeter Data={preesureData} />
        </Grid>
        <Grid item xs={2}>
          <SmallHumidityCard Data={humidityData} />
        </Grid>
        <Grid item xs={2}>
          <SmallFlowCard Data={flowData} />
        </Grid>
        <Grid item xs={2}>
          <SmallWhetherCard Data={whetherData} />
        </Grid>
        <Grid item xs={2}>
          <SmallEnergyCard Data={energyData} />
        </Grid>
        <Grid item xs={2}>
          <SmallEnergyUseCard Data={energyData} />
        </Grid>
      </Grid>

      {/* </Draggable><Draggable> */}
      <Box
        sx={{
          display: "flex",
          marginLeft: "75px",
          marginTop: "20px",
          gap: "20px",
          flexWrap: "wrap",
          paddingX: 10,
        }}
      >
        <TemperatureDisplay Data={tempData} chartData={tempChartData} />
        <MediumProximityCard Data={proxData} chartData={proxChartData} />
        <MediumNoiseCard Data={noiseData} chartData={noiseChartData} />
        <MediumPressureCard Data={preesureData} chartData={pressureChartData} />
        <MediumHumidCard Data={humidityData} chartData={humidityChartData} />
        <MediumFlowCard Data={flowData} chartData={flowChartData} />
        <MediumEnergyCard Data={tempData} chartData={tempChartData} />
      </Box>
      {/* </Draggable>
      <Draggable> */}
      <Box
        sx={{
          display: "flex",
          marginLeft: "30px",
          marginTop: "20px",
          gap: "20px",
          flexWrap: "wrap",
          paddingX: 10,
        }}
      >
        <LargeFlowCard Data={flowData} />
        <LargeEnergyCard Data={energyData} />
      </Box>
      <Box
        sx={{
          display: "flex",
          marginLeft: "30px",
          marginTop: "20px",
          gap: "20px",
          flexWrap: "wrap",
          paddingX: 10,
        }}
      >
        <MediumAirCard Data={airData} />
        <MediumWhetherCard Data={whetherData} />
      </Box>
      {/* </Draggable> */}
    </Grid>
  );
};

export default ComponentFour;
