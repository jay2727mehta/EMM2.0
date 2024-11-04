const express = require("express");
const router = express.Router();
const dataService = require("../DL/energyMeterDL.js/dlenergymeter");
const dataprocess = require("../BL/dg");
const queryservices = require("../DL/energyMeterDL.js/query");
const processExcel = require("../DL/energyMeterDL.js/processforexcel");
const processdata = require("../BL/processdataSolar");
const evstation = require("../DL/evdl/evchargingdata");
const reportService = require("../DL/energyMeterDL.js/reportgen/report");

router.get("/", (req, res) => {
  res.send("Hello, we are in the home router!");
});

router.get("/getEnergyDistribution", async (req, res) => {
  try {
    const { range } = req.query;
    const data = await dataService.getEnergyDistribution();

    if (data.status === 200) {
      res.status(200).json({ processData: data.data });
    } else if (data.status === 404) {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Error Fetching Energy Distribution Internal Server Error",
    });
  }
});

router.get("/getEnergyDataDynamicallSpecificTable", async (req, res) => {
  try {
    const { range,meterConfig } = req.query;
    // Assuming dataService.getenergydatadynamic returns the energy data
    const data = await dataService.getenergydatadynamic(range, meterConfig);
    // const data = await dataService.getenergydatadynamicupdated(range, tablename);

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching in specific table data:", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sptable", async (req, res) => {
  try {
    const { tablename, range } = req.query;

    // Assuming dataService.getenergydatadynamic returns the energy data
    // const data = await dataService.getenergydatadynamic(range, tablename);
    const data = await dataService.getenergydatadynamicupdated(
      range,
      tablename
    );

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/getConfigCardsDataDynamically", async (req, res) => {
  try {
    const  table  = req.body;
    const data = await dataService.gettotaldata(table);
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching total data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getPowerTrendlineDynamically", async (req, res) => {
  try {
    const { range,meterConfig } = req.query;


    if (meterConfig.dbTable == "lt_main_") {
      const data = await dataService.get10mindataCommon(range, meterConfig);
      res.status(200).json({ data });
    } else {
      const data = await dataService.get10mindata(range, meterConfig);
 
      
      res.status(200).json({ data });
    }
    // Assuming dataService.gettotaldata returns the total data

    // Send the data in JSON format with a 200 OK status
  } catch (error) {
    // Handle errors
    console.error("Error fetching dynamic line data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getTotalEnergyDistributionLoad", async (req, res) => {
  try {
    const data = await dataService.getTotalEnergydistributionLoad();
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching total energy distribution :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/loadpowerdistribution", async (req, res) => {
  try {
    const data = await dataService.getLoadDistribution();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching load power distribution :", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/EnergyStepAreaSpe", async (req, res) => {
  try {
    const { tablename } = req.query;

    const data = await dataService.getStepAreagraphSpe();

    const processData = dataprocess.dataProcessforStep(data, tablename);

    res.status(200).json({ processData });
  } catch (error) {
    // Handle errors
    console.error("Error fetching energy step area data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/excelsheet", async (req, res) => {
  try {
    const { range } = req.query;

    const data = await queryservices.Areachartdatewise(range.from, range.to);

    const processData = await processExcel.processAreachart(data);

    res.status(200).json({ processData });
  } catch (error) {
    // Handle errors
    console.error("Error fetching excel sheet data : ", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/IndivisualMeterExcel", async (req, res) => {
  try {
    const { range, table, column } = req.query;

    const data = await queryservices.MeterData(
      range.from,
      range.to,
      table,
      column
    );

    // const processData=await processExcel.processAreachart(data)

    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error(
      "Error fetching individual meter excel data :",
      error.message
    );

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/MainMeterdatabybuildingMonthly", async (req, res) => {
  try {
    const result = await queryservices.MonthlyTotalconsumtionBymainMeter();
    // const processData=await processExcel.processAreachart(data)
    const processdatacomsume = processdata.processdataconsume(result);
    res.status(200).json({ processdatacomsume });
  } catch (error) {
    // Handle errors
    console.error("Error fetching main meter consumption data:", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/twowheelev", async (req, res) => {
  try {
    const resultdata = await evstation.getEvTwoWheelData();
    const pdata = processdata.processdataforDayconsumptionEV(resultdata);
    pdata.reverse();
 
    const data = [
      ["Days", "Energy"],
      ["25 Apr", 414.4643200000003],
      ["26 Apr", 381.52288000000268],
      ["27 Apr", 417.62559999999404],
      ["28 Apr", 383.7123200000003],
      ["29 Apr", 210.606400000005962],
    ];
    res.json(pdata);
  } catch (error) {
    console.error("Error fetching two wheel ev bar data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/twowheelevline", async (req, res) => {
  try {
    const powerdata = await evstation.getEvTwoWheelpowertrendline();
    powerdata.unshift(["Hour", "Average power"]);

    res.json(powerdata);
  } catch (error) {
    console.error("Error fetching two wheel ev line data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fourwheelev", async (req, res) => {
  try {
    const resultdata = await evstation.getEvFourWheelData();
    const pdata = processdata.processdataforDayconsumptionEV(resultdata);
    pdata.reverse();
    const data = [
      ["Days", "Energy"],
      ["25 Apr", 414.4643200000003],
      ["26 Apr", 381.52288000000268],
      ["27 Apr", 417.62559999999404],
      ["28 Apr", 383.7123200000003],
      ["29 Apr", 210.606400000005962],
    ];
    res.json(pdata);
  } catch (error) {
    console.error("Error fetching four wheel ev data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fourwheelevline", async (req, res) => {
  try {
    const powerdata = await evstation.getEvFourWheelpowertrendline();
    powerdata.unshift(["Hour", "Average power"]);

    res.json(powerdata);
  } catch (error) {
    console.error("Error fetching four wheel ev line data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/converyorbeltbar", async (req, res) => {
  try {
    const resultdata = await evstation.getConveyorBeltData();
    const pdata = processdata.processdataforDayconsumptionEV(resultdata);
    pdata.reverse();
    res.json(pdata);
  } catch (error) {
    console.error("Error fetching conveyor/belt bar data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/conveyorbeltline", async (req, res) => {
  try {
    const powerdata = await evstation.getConveryorBeltLineData();
    // powerdata.unshift(["Hour", "Average power"]);

    res.json(powerdata);
  } catch (error) {
    console.error("Error fetching conveyor/belt line data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getloadistribution", async (req, res) => {
  try {
    const resp = await reportService.TotalCombinePower();
    res.json(resp);
  } catch (error) {
    console.error("Error fetching daily load distribution data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
