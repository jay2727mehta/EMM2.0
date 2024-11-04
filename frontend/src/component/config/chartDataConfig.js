const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  data: [65, 59, 80, 81, 56, 55],
  xAxis: "Month",
  yAxis: "Energy (kWh)",
  chartHeight: 300,
  chartWidth: 300,
};

const intersectingLineData = {
  label: ["January", "February", "March", "April", "May", "June"],
  data1: [65, 59, 80, 81, 56, 55],
  data2: [45, 69, 60, 91, 66, 75],
  xAxis1: "Month",
  xAxis2: "Month",
  yAxis1: "Energy (kWh)",
  yAxis2: "Energy (kWh)",
  chartHeight: 300,
  chartWidth: 300,
};

const doughnutData = {
  label: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  dataset: [12, 19, 3, 5, 2, 3],
  dataLabel : 'Energy (kW)',
  chartHeight: 300,
  chartWidth: 300,
};

const sankeyData = {
  label: ["Source A", "Source B", "Target A", "Target B", "Target C"],
  dataset: [
    { from: "Source A", to: "Target A", flow: 10 },
    { from: "Source A", to: "Target B", flow: 5 },
    { from: "Source B", to: "Target A", flow: 7 },
    { from: "Source B", to: "Target C", flow: 3 },
  ],
  chartHeight: 300,
  chartWidth: 300,
};

module.exports = {
  sankeyData,
  doughnutData,
  lineData,
  intersectingLineData,
};
