import React, { useEffect, useState, useRef, useCallback } from "react";
import { Grid, Box } from "@mui/material";
import CardComponent from "../../card/graphcard/card";
import {
  getCompleteGraphConfig,
  getdataEnergyDynamicindi,
  deleteGraphConfig,
  getdata10minSelectedMeter,
  getTempInfoIndivisualDeviceCurrent,
  getHumidityInfoIndivisualDeviceCurrent,
  getDeviceInfoIndivisualDeviceCurrent,
  getDeviceCombineIndivisualDeviceCurrent,
  getEnergyDataCombineDynamicallSpecificTable,
} from "../../Services/graph.service";
import { chartsObj } from "../../config/chartsConfigObj";
import { tempChartData } from "../../config/cardsConfigData";
import { energy_day } from '../../Services/congif_energy_combine/config_energy_file'

const ComponentOne = ({ componentMap }) => {
  const [graphConfig, setGraphConfig] = useState([]);
  const [labelgraph, setLabel] = useState("");
  const [resultantObj, setresultantObj] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState([]);
  const [chartType, setChartType] = useState([]);
  const [chartSize, setChartSize] = useState([]);
  const initialDataFetched = useRef(false);
  const [labletime, setlabletime] = useState("");
  const allocatedAdmin = sessionStorage.getItem("allocatedAdmin");
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");

  const fetchGraphConfig = async () => {
    try {


      setChartData([]);
      let resp;
      role === "ADMIN"
        ? (resp = await getCompleteGraphConfig(userId, componentMap))
        : (resp = await getCompleteGraphConfig(allocatedAdmin, componentMap));

      const filteredgraphData = resp.result.filter(
        (item) => item.component === componentMap
      );

      console.log(filteredgraphData, "fetchGraphConfig filteredgraphData", resp.result, componentMap);

      if (resp) {
        setGraphConfig(filteredgraphData);
      }
    } catch (error) {
      setError("Error fetching graph configuration");
    }
  };

  const handleFetchError = (error) => {
    setIsLoading(false);
    setError(error.message || "An error occurred while fetching data");
    return null;
  };

  // const fetchEnergyData = async (selectedRange, meterConfig) => {
  //   try {
  //     const Redata = await getdataEnergyDynamicindi(selectedRange, meterConfig);
  //     if (!Redata) throw new Error("No Data Found!");
  //     const chartData = ["basicEnergy", "intermidiateEnergy"].includes(
  //       meterConfig.chart_type
  //     )
  //       ? [Redata.responseData]
  //       : filterEnergyData(Redata.responseData);

  //     return chartData;
  //   } catch (error) {
  //     return handleFetchError(error);
  //   }
  // };

  const fetchEnergyData = async (selectedRange, meterConfig) => {
    try {
      const result = await getdataEnergyDynamicindi(
        selectedRange,
        meterConfig
      );
      const data = result;
      // if (data.length <= 0) throw new Error("No Data Found!");

      // const chartData = ["basicPower", "intermidiatePower"].includes(
      //   meterConfig.chart_type
      // )
      //   ? [result]
      //   : filterPowerData(result.data);

      // return chartData;
      const chartData = [result];
      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchPowerData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      const data = result;
      if (data.length <= 0) throw new Error("No Data Found!");

      const chartData = ["basicPower", "intermidiatePower"].includes(
        meterConfig.chart_type
      )
        ? [result]
        : filterPowerData(result.data);

      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchTemperatureData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      const chartData = [result];
      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCurrentData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      const chartData = [result];
      return chartData;
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchHumidityData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchNoiseData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCO2Data = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchLuxData = async (selectedRange, meterConfig) => {
    try {
      const result = await getDeviceInfoIndivisualDeviceCurrent(
        selectedRange,
        meterConfig
      );
      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCombineData = async (selectedRange) => {
    try {
      const floor = energy_day[componentMap];
      const result = await getDeviceCombineIndivisualDeviceCurrent(
        selectedRange,
        floor
      );
      console.log(result, 'resultcombine');

      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  };

  const fetchCombineDataEnergy = async (selectedRange) => {
    try {
      const floor = energy_day[componentMap];
      const result = await getEnergyDataCombineDynamicallSpecificTable(
        selectedRange,
        floor
      );

      return [result];
    } catch (error) {
      return handleFetchError(error);
    }
  }

  const fetchCharts = useCallback(async () => {
    setIsLoading(true); // Set loading state to true before starting fetch
    // setChartData([]);
    // setChartTitle([]);
    // setChartType([]);
    // setChartSize([]);
    setresultantObj([]);

    const newChartData = [];
    const newChartTitles = [];
    const newChartTypes = [];
    const newChartSizes = [];
    const newResultantObjs = [];

    const fetchData = async (item) => {
      try {


        const meterConfig = renderChart(item);
        let obj = {
          meterConfig,
          chart_type: item.chart_type,
          graph_id: item.graph_id,
        };
        newChartTypes.push(item.chart_type);
        newChartSizes.push({
          height: parseInt(item.chart_height),
          width: parseInt(item.chart_width),
        });

        if (item.gadget_type === "energy") {
          const energy_data_energy = await fetchEnergyData(
            item.time_period,
            meterConfig
          );
          // console.log(energy_data_energy,"fetch energy data respose");
          // const energy_data=energy_data_energy?.data
          let energy_data_obj = energy_data_energy[0].data
          //  console.log(energy_data,"data");
          let energy_data = []
          energy_data.push(energy_data_obj)
          obj = {
            ...obj,
            meter_name: item.meter_name_jp,
            energy_data,
            // key: item.chart_type+energy_data[0].name_of_table
          };
          newChartTitles.push(item.meter_name_jp);
          newChartData.push(energy_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "power") {
          const power_data = await fetchPowerData(
            item.time_period,
            meterConfig
          );
          obj = {
            ...obj,
            meter_name: item.meter_name_jp,
            energy_data: power_data,
            // key: item.chart_type+power_data[0].name_of_table
          };
          newChartTitles.push(item.meter_name_jp);
          newChartData.push(power_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "temperature") {
          const temperature_data = await fetchTemperatureData(
            item.time_period,
            meterConfig
          );
          console.log(temperature_data, 'tempdata');
          obj = {
            ...obj,
            meter_name: item.meter_name_jp,
            energy_data: temperature_data,
            // key: item.chart_type+tempChartData[0].name_of_table
          };
          newChartTitles.push(item.meter_name_jp);
          newChartData.push(temperature_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "humidity") {
          const humidity_data = await fetchHumidityData(
            item.time_period,
            meterConfig
          );
          obj = {
            ...obj,
            meter_name: item.meter_name_jp,
            energy_data: humidity_data,
            // key: item.chart_type+humidity_data[0].name_of_table
          };
          newChartTitles.push(item.meter_name_jp);
          newChartData.push(humidity_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "noise") {
          const noise_data = await fetchNoiseData(
            item.time_period,
            meterConfig
          );
          obj = {
            ...obj,
            meter_name: item.meter_name,
            energy_data: noise_data,
            // key: item.chart_type+humidity_data[0].name_of_table
          };
          newChartTitles.push(item.meter_name);
          newChartData.push(noise_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "co2") {
          const co2_data = await fetchCO2Data(item.time_period, meterConfig);
          obj = {
            ...obj,
            meter_name: item.meter_name,
            energy_data: co2_data,
            // key: item.chart_type+humidity_data[0].name_of_table
          };
          newChartTitles.push(item.meter_name);
          newChartData.push(co2_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "lux") {
          const lux_data = await fetchLuxData(item.time_period, meterConfig);
          obj = {
            ...obj,
            meter_name: item.meter_name,
            energy_data: lux_data,
            // key: item.chart_type+humidity_data[0].name_of_table
          };
          newChartTitles.push(item.meter_name);
          newChartData.push(lux_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "current") {
          const current_data = await fetchCurrentData(
            item.time_period,
            meterConfig
          );
          obj = {
            ...obj,
            meter_name: item.meter_name,
            energy_data: current_data,
            // key: item.chart_type+humidity_data[0].name_of_table
          };
          newChartTitles.push(item.meter_name);
          newChartData.push(current_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "combinePower") {
          const combine_data = await fetchCombineData(
            item.time_period
          );
          obj = {
            ...obj,
            meter_name: componentMap,
            energy_data: combine_data,
            meterConfig: { gadget: 'パワー' }
          }
          newChartTitles.push(componentMap);
          newChartData.push(combine_data);
          newResultantObjs.push(obj);
        } else if (item.gadget_type === "combineEnergy") {
          const combine_data = await fetchCombineDataEnergy(
            item.time_period
          );
          obj = {
            ...obj,
            meter_name: componentMap,
            energy_data: combine_data,
            meterConfig: { gadget: 'エネルギー' }
          }
          newChartTitles.push(componentMap);
          newChartData.push(combine_data);
          newResultantObjs.push(obj);
        }
      } catch (error) {
        handleFetchError(error);
      }
    };

    try {
      const data = await Promise.all(graphConfig.map(fetchData));
      const currentTime = new Date().toLocaleTimeString(); // Get current time in HH:MM:SS format
      console.log(`${currentTime} - Data fetched:`, data);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setIsLoading(false); // Ensure loading state is turned off
    }
    // setChartData(newChartData);
    // setChartTitle(newChartTitles);
    // setChartType(newChartTypes);
    // setChartSize(newChartSizes);
    newResultantObjs.sort((a,b) =>  {
      // if (a.graph_id === b.graph_id) {
      //   a.chart_type.localeCompare(b.chart_type);
      // }
      return a.graph_id - b.graph_id;
    }
    )
    setresultantObj(newResultantObjs);
  }, [graphConfig]);

  const renderChart = (meter) => {


    switch (meter.gadget_type) {
      case "alltypes":
      case "energy":
        return {
          dbTable: meter.name_of_table,
          energy: meter.energy_watt_hr,
          chart_type: meter.chart_type,
          range: meter.time_period,
          gadget: meter.gadget_type_jp,
          views: meter.name_of_table + "_energy",
        };
      case "temperature":
        return {
          dbTable: meter.name_of_table,
          temperature: meter.temperature_c,
          parameter: meter.temperature_c,
          range: meter.time_period,
          gadget: meter.gadget_type_jp,
          views: meter.name_of_table + "_temp",
        };
      case "power":
        return {
          dbTable: meter.name_of_table,
          power: meter.power_watt,
          parameter: meter.power_watt,
          chart_type: meter.chart_type,
          range: meter.time_period,
          gadget: meter.gadget_type_jp,
          views: meter.name_of_table + "_power",
        };

      case "humidity":
        return {
          dbTable: meter.name_of_table,
          humidity: meter.humidity_g_m3,
          parameter: meter.humidity_g_m3,
          range: meter.time_period,
          gadget: meter.gadget_type_jp,
          views: meter.name_of_table + "_hum",
        };

      case "noise":
        return {
          dbTable: meter.name_of_table,
          noise: meter.aud_db,
          parameter: meter.aud_db,
          range: meter.time_period,
          gadget: meter.gadget_type,
          views: meter.name_of_table + "_noise",
        };

      case "co2":
        return {
          dbTable: meter.name_of_table,
          co2: meter.co2_p,
          parameter: meter.co2_p,
          range: meter.time_period,
          gadget: meter.gadget_type,
          views: meter.name_of_table + "_co2",
        };

      case "lux":
        return {
          dbTable: meter.name_of_table,
          lux: meter.lux_l,
          parameter: meter.lux_l,
          range: meter.time_period,
          gadget: meter.gadget_type,
          views: meter.name_of_table + "_lux",
        };
      // case "lux":
      // return {
      //   dbTable: meter.name_of_table,
      //   lux: meter.lux_l,
      //   parameter: meter.lux_l,
      //   range: meter.time_period,
      //   gadget: meter.gadget_type,
      //   views: meter.name_of_table + "_lux",
      // };
      default:
        return {};
    }
  };

  const filterPowerData = (data) => {
    const filter = data.timestamp
      .splice(1)
      .map((timestamp, index) => [timestamp, data.meter_reading[index + 1]]);

    return filter;
  };

  const filterEnergyData = (data) => {
    const filter = data.date
      .splice(1)
      .map((date, index) => [date, data.u59[index + 1]]);

    return filter;
  };

  const handleRemoveGadget = async (graph_id) => {
    try {
      const resp = await deleteGraphConfig(graph_id);
      if (resp) {
        fetchGraphConfig();
      }
    } catch (error) {
      console.log("Error deleting gadget: " + error);
    }
  };

  useEffect(() => {
    setresultantObj([]);

    fetchGraphConfig();
  }, [componentMap]);

  useEffect(() => {
    fetchCharts();
    const intervalId = setInterval(() => {
      fetchCharts();
    }, 150000);
    console.log(intervalId);

    return () => clearInterval(intervalId);
  }, [graphConfig, componentMap]);

  return (
    <Grid container spacing={1} padding={2}>
      {console.log(resultantObj, "Data to be render in card")}
      {/* {resultantObj
          .sort((a, b) => {
            // if (a.graph_id === b.graph_id) {
            //   a.chart_type.localeCompare(b.chart_type);
            // }
          return a.graph_id - b.graph_id;
          })} */}
      {resultantObj?.map((data, index) => {
        const chartConfig = chartsObj?.find(
          (chart) => chart.chartId === data.chart_type
        );

        if (chartConfig) {
          let filteredData;
          if (data) {
            // { console.log(data, "in if part in componenet one each data point") }
            return (
              <Grid item key={index}>
                <CardComponent
                  key={data.graph_id}
                  Data={
                    data.energy_data !== null
                      ? [
                        Object.assign({}, data?.energy_data[0], {
                          range: data.meterConfig.range,
                          gadget_type: data?.chart_type,
                          gadget_name:
                            data?.meterConfig?.gadget
                              ?.charAt(0)
                              ?.toUpperCase() +
                            data?.meterConfig?.gadget?.slice(1),
                        }),
                      ]
                      : [
                        {
                          meter_name: data.meter_name,
                          range: data.meterConfig.range,
                          gadget_type: data?.chart_type,
                          gadget_name:
                            data?.meterConfig?.gadget
                              ?.charAt(0)
                              ?.toUpperCase() +
                            data?.meterConfig?.gadget?.slice(1),
                        },
                      ]
                  }
                  chartConfig={chartConfig}
                  chartTitle={data.meter_name}
                  removeGadget={handleRemoveGadget}
                  index={data.key}
                  compData={data}
                />
              </Grid>
            );
          } else {
            { console.log(data, "in else part in componenet one each data point") }
            return (
              <Grid item key={index}>
                <CardComponent
                  key={data.graph_id}
                  chartData={
                    data.energy_data !== null
                      ? [
                        Object.assign({}, data?.energy_data[0], {
                          range: data.meterConfig.range,
                          gadget_type: chartType,
                        }),
                      ]
                      : [
                        {
                          meter_name: data.meter_name,
                          range: data.meterConfig.range,
                        },
                      ]
                  }
                  chartTitle={data.meter_name}
                  chartConfig={chartConfig}
                  chartHeight={chartSize[data.key].height}
                  chartWidth={chartSize[data.key].width}
                  removeGadget={handleRemoveGadget}
                  index={data.key}
                  compData={data}
                />
              </Grid>
            );
          }
        }
        return null;
      })}
    </Grid>
  );
};

export default ComponentOne;
