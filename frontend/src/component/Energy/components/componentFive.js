import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDashboardContext } from "../../context/gadgetcontext";
import { Grid, Box } from "@mui/material";
import CardComponent from "../../card/graphcard/card";
import {
  getCompleteGraphConfig,
  getdataEnergyDynamicindi,
  deleteGraphConfig,
  getdata10minSelectedMeter,
  getHumidityInfoIndivisualDeviceCurrent,
  getTempInfoIndivisualDeviceCurrent,
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

const ComponentFive = () => {
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
  const initialDataFetched = useRef(false);
  const [labletime, setlabletime] = useState("");

  const fetchGraphConfig = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const resp = await getCompleteGraphConfig(userId);
      // const filteredgraphData  = resp.result.filter(item=>item.component =="home/componentOne")
      console.log(resp.result, "res");

      const filteredgraphData = resp.result.filter(
        (item) => item.component === "home/ComponentFive"
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

  const fetchTemperatureData = async (meterConfig) => {
    try {
      setIsLoading(true);
      const result = await getTempInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      console.log(result, "tempd");
      setChartData((prevData) => [...prevData, [result]]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred while fetching data");
    }
  };

  const fetchHumidityData = async (meterConfig) => {
    try {
      setIsLoading(true);
      const result = await getHumidityInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      console.log(result, "humd");
      setChartData((prevData) => [...prevData, [result]]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred while fetching data");
    }
  };

  const fetchCharts = useCallback(() => {
    setChartData([]);
    setChartTitle([]);
    setChartType([]);
    setChartSize([]);

    graphConfig.forEach((item) => {
      const meterConfig = renderChart(item);
      console.log(meterConfig,'metercon');
      
      setChartType((prevData) => [...prevData, item.chart_type]);
      setChartSize((prevData) => [
        ...prevData,
        {
          height: parseInt(item.chart_height),
          width: parseInt(item.chart_width),
        },
      ]);

      if ("energy" in meterConfig) {
        setChartTitle((prevTitles) => [
          ...prevTitles,
          item.meter_name + " Energy Consumption",
        ]);
        fetchEnergyData(meterConfig);
      } else if ("power" in meterConfig) {
        setChartTitle((prevTitles) => [
          ...prevTitles,
          item.meter_name + " Power Trendline",
        ]);
        fetchPowerData(meterConfig);
      } else if ("temperature" in meterConfig) {
        setChartTitle((prevTitles) => [...prevTitles, item.meter_name]);
        fetchTemperatureData(meterConfig);
      } else if ("humidity" in meterConfig) {
        console.log(1);

        setChartTitle((prevTitles) => [...prevTitles, item.meter_name]);
        fetchHumidityData(meterConfig);
      }
    });
  }, [graphConfig, selectedRange]);

  const renderChart = (meter) => {
    console.log(meter);

    switch (meter.gadget_type) {
      case "alltypes":
      case "energy":
        return { dbTable: meter.name_of_table, energy: meter.energy_watt_hr };
      case "temperature":
        return {
          dbTable: meter.name_of_table,
          temperature: meter.temperature_c,
        };
      case "power":
        return { dbTable: meter.name_of_table, power: meter.power_watt };
      case "alert":
        return { dbTable: meter.name_of_table, power: meter.power_watt };
      case "control":
        return { dbTable: meter.name_of_table, moisture: meter.moisture_g_m3 };
      case "humidity":
        return { dbTable: meter.name_of_table, humidity: meter.humidity_g_m3 };
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
      const title = titleChart.includes(" ")
        ? titleChart.trim().split(/\s+/).slice(0, -2).join(" ")
        : titleChart.trim().split(/\s+/).join(" ");
      console.log(title);
      const table_config_id = graphConfig.filter(
        (item) => item.meter_name === title
      );

      console.log(table_config_id);
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
    <Grid container spacing={1} padding={2}>
      {chartData.map((data, index) => {
        const chartConfig = chartsObj.find(
          (chart) => chart.chartId === chartType[index]
        );
        if (chartConfig) {
          let filteredData;
          if (data.length === 1) {
            return (
              <Grid item key={index}>
                <CardComponent
                  Data={data}
                  chartConfig={chartConfig}
                  chartTitle={chartTitle[index]}
                  removeGadget={handleRemoveGadget}
                  index={index}
                />
              </Grid>
            );
          } else {
            filteredData = data.slice(1);
            return (
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
            );
          }
        }
        return null;
      })}
      {/* <Grid container spacing={2} padding={2}>
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
    </Grid> */}
      {/* <Grid container spacing={2} padding={2}>
      <Grid item xs={12} sm={6}>
        <TemperatureDisplay Data={tempData} chartData={tempChartData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MediumProximityCard Data={proxData} chartData={proxChartData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MediumNoiseCard Data={noiseData} chartData={noiseChartData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MediumPressureCard
          Data={preesureData}
          chartData={pressureChartData}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MediumHumidCard Data={humidityData} chartData={humidityChartData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MediumFlowCard Data={flowData} chartData={flowChartData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MediumEnergyCard Data={tempData} chartData={tempChartData} />
      </Grid>
    </Grid> */}
      {/* <Grid container spacing={2} padding={2}>
      <Grid item xs={2}>
        <LargeFlowCard Data={flowData} />
      </Grid>
      <Grid item xs={2}>
        <LargeEnergyCard Data={energyData} />
      </Grid>
      <Grid item xs={2}>
        <LargeAirCard Data={energyData} />
      </Grid>
    </Grid>
    <Grid container spacing={2} padding={2}>
      <Grid item>
        <MediumAirCard Data={airData} />{" "}
      </Grid>
      <Grid item >
        <MediumWhetherCard Data={whetherData} />{" "}
      </Grid>
    </Grid> */}
    </Grid>
  );
};

export default ComponentFive;
