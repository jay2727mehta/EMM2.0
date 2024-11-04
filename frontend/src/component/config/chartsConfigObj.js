import LineChart from "../DynamicCharts/lineChart";
import AreaChart from "../DynamicCharts/areaChart";
import BarChart from "../DynamicCharts/barChart";
import IntersectingLineChart from "../DynamicCharts/intersectingChart";
import DoughnutChart from "../DynamicCharts/doughnutChart";
import MixedChart from "../DynamicCharts/mixedChart";
import PieChart from "../DynamicCharts/pieChart";
import PolarAreaChart from "../DynamicCharts/polarAreaChart";
import SankeyChart from "../DynamicCharts/sankeyChart";
import SmallTemperatureCard from "../card/Temperature/smallTemperatureCard";
import MediumTemperatureCard from "../card/Temperature/mediumTemperatureCard";
import SmallWhetherCard from "../card/Whether/smallWhetherCard";
import MediumWhetherCard from "../card/Whether/mediumWhetherCard";
import SmallHumidityCard from "../card/Humidity/smallHumidCard";
import MediumHumidCard from "../card/Humidity/mediumHumidCard";
import SmallEnergyCard from "../card/Energy Meter/smallEnergyCard";
import MediumEnergyCard from "../card/Energy Meter/mediumEnergyCard";
import SmallPowerCard from "../card/Power/smallPowerCard";
import MediumPowerCard from "../card/Power/mediumPowerCard";
import MediumNoiseCard from "../card/Noise/mediumNoiseCard";
import SmallNoiseCard from "../card/Noise/smallNoiseCard";
import SmallGasCard from "../card/Gas/smallGasCard";
import MediumGasCard from "../card/Gas/mediumGasCard";
import SmallLuxCard from "../card/Lighting/smallLuxCard";
import MediumLuxCard from "../card/Lighting/mediumLuxCard";
import MediumCurrentCard from "../card/Current/mediumCurrentCard";
import SmallCurrentCard from "../card/Current/smallCurrentCard";
import MediumCard from "../card/GeneralisedCards/mediumCard";
import SmallCard from "../card/GeneralisedCards/smallCard";

export const chartsObj = [
  // {
  //   chartId: "line",
  //   chartName: "Line Chart",
  //   render: (props) => <LineChart {...props} />,
  //   type: ["energy", "power"],
  // },
  // {
  //   chartId: "area",
  //   chartName: "Area Chart",
  //   render: (props) => <AreaChart {...props} />,
  //   type: ["energy", "power"],
  // },
  // {
  //   chartId: "bar",
  //   chartName: "Bar Chart",
  //   render: (props) => <BarChart {...props} />,
  //   type: ["energy"],
  // },
  {
    chartId: "basicEnergy",
    chartName: "Basic Energy Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["energy"],
    renderImg: () => (
      <img
        src="basicEnergy.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateEnergy",
    chartName: "Intermidiate Energy Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["energy"],
    renderImg: () => (
      <img
        src="intermEnergy.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicPower",
    chartName: "Basic Power Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["power"],
    renderImg: () => (
      <img
        src="basicPower.png"
        alt="Power Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiatePower",
    chartName: "Intermidiate Power Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["power"],
    renderImg: () => (
      <img
        src="intermidiatePower.png"
        alt="Power Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicTemp",
    chartName: "Basic Temp Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["temperature"],
    renderImg: () => (
      <img
        src="temperature.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateTemp",
    chartName: "Intermidiate Temp Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["temperature"],
    renderImg: () => (
      <img
        src="intermTemp.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicHumidity",
    chartName: "Basic Humidity Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["humidity"],
    renderImg: (props) => (
      <img
        src="humidity.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateHumidity",
    chartName: "Intermidiate Humidity Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["humidity"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicNoise",
    chartName: "Basic Noise Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["noise"],
    renderImg: (props) => (
      <img
        src="smallNoise.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateNoise",
    chartName: "Intermidiate Noise Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["noise"],
    renderImg: () => (
      <img
        src="mediumNoise.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicCO2",
    chartName: "Basic CO2 Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["co2"],
    renderImg: (props) => (
      <img
        src="CO2.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateCO2",
    chartName: "Intermidiate CO2 Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["co2"],
    renderImg: (props) => (
      <img
        src="CO2.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicLux",
    chartName: "Basic Lux Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["lux"],
    renderImg: (props) => (
      <img
        src="smallLux.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateLux",
    chartName: "Intermidiate Lux Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["lux"],
    renderImg: (props) => (
      <img
        src="mediumLux.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicCurrent",
    chartName: "Basic Current Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["current"],
    renderImg: (props) => (
      <img
        src="smallLux.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateCurrent",
    chartName: "Intermidiate Current Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["current"],
    renderImg: (props) => (
      <img
        src="mediumLux.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  // {
  //   chartId: ["BasicEnergy","BasicPower","BasicTemp","BasicHumidity","BasicNoise","BasicCO2","BasicLux","BasicCurrent"],
  //   chartName: ["Basic Energy Chart","Basic Power Chart","Basic Temp Chart","Basic Humidity Chart","BasicNoise","BasicCO2","Basic Lux Chart","Basic Current Chart"],
  //   render: (props) => <SmallCard {...props} />,
  //   type: ["energy","power","temperature","humidity","noise","co2","lux","current"],
  // },
  // {
  //   chartId: ["intermediateEnergy","intermediatePower","intermediateTemp","intermidiateHumidity","intermidiateNoise","intermidiateCO2","intermidiateLux","intermidiateCurrent"],
  //   chartName: ["Intermidiate Energy Chart","Intermidiate Power Chart","Intermidiate Temp Chart","Intermidiate Humidity Chart","intermidiateNoise","intermidiateCO2","Intermidiate Lux Chart","Intermidiate Current Chart"],
  //   render: (props) => <MediumCard {...props} />,
  //   type: ["energy","power","temperature","humidity","noise","co2","lux","current"],
  // },
];
