const express = require("express");
const router = express.Router();
const dataService = require("../DL/solar/solarservice");
const {
  processdata,
  processdataforDaygenSolarandMeter,
  processdataforSolarMonthGen,
} = require("../BL/processdataSolar");

router.get("/", (req, res) => {
  res.send("Hello, we are in the solar router!");
});

router.get("/solarenergydatarange", async (req, res) => {
  try {
    const { tablename, range } = req.query;

    // Assuming dataService.getenergydatadynamic returns the energy data
    const data = await dataService.getdata(range);

    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching solar energy data by range : ", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/solarenergydatarangedaywise", async (req, res) => {
  try {
    const { tablename } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getsolardataDaywise(tablename);

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching solar energy data day wise :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/solaralldata", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getsolarAlldata(range);

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching all solar data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/solarpowertimlydata", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getTimlysolargenarateddata();

    // Send the d   console.log(data);ata in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching all solar power data : ", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/solarpowerPastdate", async (req, res) => {
  try {
    const { date } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getSolarLivePowerData(date);

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching solar power past data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dayEnergyGen", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getDayEnergyGen();

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetchinf day energy generation data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/Currentsolarpower", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getCurrentpower();

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching current solar power :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// solarpowerPastdate

router.get("/TotalgenerationSolar", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getTotalSolarGen();

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching total solar generation :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/energypowercurrentdate", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getEnergyPowerdaily();

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error energy power daily data : ", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/energypowerPastdate", async (req, res) => {
  try {
    const { date } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const data = await dataService.getEnergyPowerPastdate(date);

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error("Error energy power past data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/last5dayEnergyGen", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const result = await dataService.get5DayEnergyGen();
    const data = result.rows;
    const resultdata = processdataforDaygenSolarandMeter(data);
    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ resultdata });
  } catch (error) {
    // Handle errors
    console.error("Error fetching last 5 daya energy generation :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/TotalGenbySolarandMeter", async (req, res) => {
  try {
    const { range } = req.query;

    // Assuming dataService.gettotaldata returns the total data
    const result = await dataService.getTotalgenBySolarANDMeter();
    const data = result.rows;
    const resultdata = processdata(data);

    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ resultdata });
  } catch (error) {
    // Handle errors
    console.error("Error fetching total generation solar plus meter data:", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dailyenergydata", async (req, res) => {
  try {
    // Assuming dataService.gettotaldata returns the total data
    const result = await dataService.getdailyGenenergybysolar();
    const data = result.rows;
    const resultdata = processdataforDaygenSolarandMeter(data);
    // Send the data in JSON format with a 200 OK status
    res.status(200).json({ resultdata });
  } catch (error) {
    // Handle errors
    console.error("Error fetching daily energy data :", error.message);

    // Send an error response with an appropriate status code
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/currentSolarPowerGrid", async (req, res) => {
  try {
    const result = await dataService.getCurrentSolarPowerConsumption();
    if (result) {
      res.status(200).json({ result });
    }
  } catch (error) {
    console.error("Error fetching current solar power grid data :", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/monthlyenergydata", async (req, res) => {
  try {
    const result = await dataService.getSolarMothlyGen();

    const data = result.rows;

    const resultdata = processdataforSolarMonthGen(data);
    res.status(200).json({ resultdata });
  } catch (error) {
    console.error("Error fetching monthly energy data :", error.message);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/getsolargriddistribution", async (req, res) => {
  try {
    const result = await dataService.getSolarGridEnergyDistribution();
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error fetching solar grid distribution data :", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/getweeklyavgconsumption", async (req, res) => {
  try {
    const result = await dataService.getWeeklyAvgConsumption();
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error fetching weekly avg consumption data :", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/getmdhitvalue", async (req, res) => {
  try {
    const result = await dataService.MdPowerforlast5days();
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error fetching MD hit value data :", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// router.get('/Totalgenlast5days', async (req, res) => {
//   try {
//     const { range } = req.query;

//     // Assuming dataService.gettotaldata returns the total data
//     const result = await dataService.get5DayEnergyGen();
// const data=result.rows;
// const resultdata=processdata(data)
// console.log(resultdata);
//     // Send the data in JSON format with a 200 OK status
//     res.status(200).json({ resultdata });
//   } catch (error) {
//     // Handle errors
//     console.error('Error:', error.message);

//     // Send an error response with an appropriate status code
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;
