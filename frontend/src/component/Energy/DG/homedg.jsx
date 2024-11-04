// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useDashboardContext } from "../../context/gadgetcontext";
// import { Grid, Box } from "@mui/material";
// import CardComponent from "../../card/graphcard/card";
// import { getCompleteGraphConfig, getdataEnergyDynamicindi } from "../../Services/graph.service";
// import { chartsObj } from "../../config/chartsConfigObj";

// const Homedg = () => {
//   const { dashboardGadgets, removeGadget } = useDashboardContext();
//   const [graphConfig, setGraphConfig] = useState([]);
//   const [selectedRange, setSelectedRange] = useState("day");
//   const [labelgraph, setLabel] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chartData, setChartData] = useState([]);
//   const [chartTitle, setChartTitle] = useState([]);
//   const [chartType, setChartType] = useState([]);
//   const initialDataFetched = useRef(false);
//   const [chartSize,setChartSize] = useState([]);

//   const fetchGraphConfig = async () => {
//     try {
//       const userId = sessionStorage.getItem('userId');
//       const resp = await getCompleteGraphConfig(userId);
//       if (resp) {
//         setGraphConfig(resp.result);
//       }
//     } catch (error) {
//       setError("Error fetching graph configuration");
//     }
//   };

//   const fetchData = async (meterConfig) => {
//     try {
//       setIsLoading(true);
//       const Redata = await getdataEnergyDynamicindi(selectedRange, meterConfig);
//       if (!Redata.data.datarange.length) throw new Error("No Data Found!");
//       const filteredData = filterData(Redata.data.datarange);
//       setChartData((prevData) => [...prevData, filteredData]);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message || "An error occurred while fetching data");
//     }
//   };

//   const fetchCharts = useCallback(() => {
//     if (initialDataFetched.current) return;
//     initialDataFetched.current = true;
//     graphConfig.forEach((item) => {
//       const meterConfig = renderChart(item);
//       setChartTitle((prevTitles) => [...prevTitles, item.meter_name]);
//       setChartType((prevData) => [...prevData, item.chart_type]);
//       setChartSize((prevData) => [...prevData,{height : parseInt(item.chart_height), width : parseInt(item.chart_width)}])
//       fetchData(meterConfig);
//     });
//   }, [graphConfig, selectedRange]);

//   const renderChart = (meter) => {
//     switch (meter.gadget_type) {
//       case 'alltypes':
//       case 'energy':
//         return { dbTable: meter.name_of_table, energy: meter.energy };
//       case 'temperature':
//         return { dbTable: meter.name_of_table, temperature: meter.temperature };
//       case 'power':
//         return { dbTable: meter.name_of_table, power: meter.power };
//       case 'alert':
//         return { dbTable: meter.name_of_table, power: meter.power };
//       case 'control':
//         return { dbTable: meter.name_of_table, moisture: meter.moisture };
//       default:
//         return {};
//     }
//   };

//   const filterData = (data) => {
//     const labelMap = { day: "Days", week: "Weeks", month: "Months" };
//     const label = labelMap[selectedRange] || "X-axis";
//     setLabel(label);
//     return data.map(item => [item.date, Math.max(0, item.u59)]);
//   };

//   useEffect(() => {
//     if (graphConfig.length) fetchCharts();
//   }, [graphConfig, selectedRange]);

//   useEffect(() => { fetchGraphConfig(); }, []);

//   return (
//     <Grid container spacing={2}> 
//       {dashboardGadgets.map((gadget, index) => (
//         <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
//           <CardComponent gadget={gadget} removeGadget={removeGadget} />
//         </Grid>
//       ))}
//       <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap : 'wrap' }}>
//         {chartData.map((data, index) => {
//           const chartConfig = chartsObj.find(chart => chart.chartId === chartType[index]);
//           if (chartConfig) {
//             const filteredData = data.slice(1);
//             return (
//               <div key={index}>
//                 {chartConfig.render({
//                   title: `${chartTitle[index]} Energy Consumption`,
//                   label: filteredData.map(item => item[0]),
//                   dataset: filteredData.map(item => item[1]),
//                   xAxis: labelgraph,
//                   yAxis: 'Energy (kWh)',
//                   chartHeight: chartSize ? chartSize[index].height : 500,
//                   chartWidth: chartSize ? chartSize[index].width :600,
//                 })}
//               </div>
//             );
//           }
//           return null;
//         })}
//       </Box>
//     </Grid>
//   );
// };

// export default Homedg;

// Homedg.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDashboardContext } from "../../context/gadgetcontext";
import { Grid, Box } from "@mui/material";
import CardComponent from "../../card/graphcard/card";
import { getCompleteGraphConfig, getdataEnergyDynamicindi, deleteGraphConfig, getCompleteGraphConfigUser } from "../../Services/graph.service";
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
import { airData, proxData, tempChartData, tempData, proxChartData, noiseChartData, noiseData, preesureData, pressureChartData, humidityData, humidityChartData, flowData, flowChartData, whetherData, energyData } from "../../config/cardsConfigData";
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

const Homedg = () => {
  const { dashboardGadgets, removeGadget } = useDashboardContext();
  const [graphConfig, setGraphConfig] = useState([]);
  const [selectedRange, setSelectedRange] = useState("day");
  const [labelgraph, setLabel] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState([]);
  const [chartType, setChartType] = useState([]);
  const [chartSize, setChartSize] = useState([]);
  const component = "home/dghome"
  const initialDataFetched = useRef(false);

  // const fetchGraphConfig = async () => {
  //   try {
  //     const role = sessionStorage.getItem('role');
  //     if (role === 'USER') {
  //       console.log(role,'ro');
  //       const resp = await getCompleteGraphConfigUser();
  //       const filteredgraphData = resp.result.filter(item => item.component == "home/dghome")
  //       if (resp) {
  //         setGraphConfig(filteredgraphData);
  //       }
  //     }
  //     else if (role === 'ADMIN'){
  //       const userId = sessionStorage.getItem('userId');
  //       const resp = await getCompleteGraphConfig(userId);
  //       const filteredgraphData = resp.result.filter(item => item.component == "home/dghome")
  //       if (resp) {
  //         setGraphConfig(filteredgraphData);
  //       }
  //     }
  //   } catch (error) {
  //     setError("Error fetching graph configuration");
  //   }
  // };

  const fetchGraphConfig = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resp = await getCompleteGraphConfig(1);
      const filteredgraphData = resp.result.filter(item => item.component == "home/dghome");
      if (resp) {
        setGraphConfig(filteredgraphData);
      }
    } catch (error) {
      setError("Error fetching graph configuration");
    }
  };

  const fetchData = async (meterConfig) => {
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
      setChartTitle((prevTitles) => [...prevTitles, item.meter_name]);
      setChartType((prevData) => [...prevData, item.chart_type]);
      setChartSize((prevData) => [...prevData, { height: parseInt(item.chart_height), width: parseInt(item.chart_width) }]);
      fetchData(meterConfig);
    });
  }, [graphConfig, selectedRange]);

  const renderChart = (meter) => {
    switch (meter.gadget_type) {
      case 'alltypes':
      case 'energy':
        return { dbTable: meter.name_of_table, energy: meter.energy };
      case 'temperature':
        return { dbTable: meter.name_of_table, temperature: meter.temperature };
      case 'power':
        return { dbTable: meter.name_of_table, power: meter.power };
      case 'alert':
        return { dbTable: meter.name_of_table, power: meter.power };
      case 'control':
        return { dbTable: meter.name_of_table, moisture: meter.moisture };
      default:
        return {};
    }
  };

  const filterData = (data) => {
    const labelMap = { day: "Days", week: "Weeks", month: "Months" };
    const label = labelMap[selectedRange] || "X-axis";
    setLabel(label);
    return data.map(item => [item.date, Math.max(0, item.u59)]);
  };

  const handleRemoveGadget = async (titleChart, index) => {
    try {
      const table_config_id = graphConfig.filter((item) => item.meter_name === titleChart);
      const resp = await deleteGraphConfig(table_config_id[0].graph_id);
      console.log(resp);
      if (resp) {
        setGraphConfig((prevConfig) => prevConfig.filter(item => item.meter_name !== titleChart));
        setChartData((prevData) => prevData.filter((_, i) => i !== index));
        setChartTitle((prevTitles) => prevTitles.filter((_, i) => i !== index));
        setChartType((prevTypes) => prevTypes.filter((_, i) => i !== index));
        setChartSize((prevSizes) => prevSizes.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.log('Error deleting gadget: ' + error);
    }
  };

  useEffect(() => { fetchGraphConfig(); }, []);

  useEffect(() => {
    if (graphConfig.length) {
      fetchCharts();
    }
  }, [graphConfig, selectedRange]);

  return (
    <Grid container spacing={2}>
      {chartData.map((data, index) => {
        const chartConfig = chartsObj.find(chart => chart.chartId === chartType[index]);
        if (chartConfig) {
          const filteredData = data.slice(1);
          return (
            // <Draggable>
            chartSize[index].width === 350 && chartSize[index].height === 350 ? <Grid item key={index}>
              <CardComponent
                chartData={filteredData}
                chartTitle={chartTitle[index]}
                chartConfig={chartConfig}
                chartHeight={chartSize[index].height}
                chartWidth={chartSize[index].width}
                removeGadget={handleRemoveGadget}
                index={index}
              />
            </Grid> : chartSize[index].width === 500 && chartSize[index].height === 500 ? <CardComponent
              chartData={filteredData}
              chartTitle={chartTitle[index]}
              chartConfig={chartConfig}
              chartHeight={chartSize[index].height}
              chartWidth={chartSize[index].width}
              removeGadget={handleRemoveGadget}
              index={index}
            /> : chartSize[index].width === 650 && chartSize[index].height === 650 ? <CardComponent
              chartData={filteredData}
              chartTitle={chartTitle[index]}
              chartConfig={chartConfig}
              chartHeight={chartSize[index].height}
              chartWidth={chartSize[index].width}
              removeGadget={handleRemoveGadget}
              index={index}
            /> : <CardComponent
              chartData={filteredData}
              chartTitle={chartTitle[index]}
              chartConfig={chartConfig}
              chartHeight={chartSize[index].height}
              chartWidth={chartSize[index].width}
              removeGadget={handleRemoveGadget}
              index={index}
            />

            // </Draggable>
          );
        }
        return null;
      })}
      {/* <Draggable> */}
      <Box sx={{ display: 'flex', marginLeft: '30px', marginTop: '20px', gap: '20px', flexWrap: 'wrap', paddingX: 10 }}>
        <SmallTemperatureCard Data={tempData} />
        <SmallProximityCard Data={proxData} />
        <SmallAirCard Data={airData} />
        <SmallNoiseCard Data={noiseData} />
        <SmallPressureCard Data={preesureData} />
        <SmallPressureMeter Data={preesureData} />
        <SmallHumidityCard Data={humidityData} />
        <SmallFlowCard Data={flowData} />
        <SmallWhetherCard Data={whetherData} />
        <SmallEnergyCard Data={energyData} />
        <SmallEnergyUseCard Data={energyData} />
      </Box>
      {/* </Draggable><Draggable> */}
      <Box sx={{ display: 'flex', marginLeft: '75px', marginTop: '20px', gap: '20px', flexWrap: 'wrap', paddingX: 10 }}>
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
      <Box sx={{ display: 'flex', marginLeft: '30px', marginTop: '20px', gap: '20px', flexWrap: 'wrap', paddingX: 10 }}>
        <LargeFlowCard Data={flowData} />
        <LargeEnergyCard Data={energyData} />
      </Box>

      <Box sx={{ display: 'flex', marginLeft: '30px', marginTop: '20px', gap: '20px', flexWrap: 'wrap', paddingX: 10 }}>
        <MediumAirCard Data={airData} />
        <MediumWhetherCard Data={whetherData} />
      </Box>

      {/* </Draggable> */}
    </Grid>
  );
};

export default Homedg;

