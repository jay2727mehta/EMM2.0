// home.js
const express = require("express");
const router = express.Router();
const dataService = require("../DL/databseServices");
// const Dgsendemail=require('../message/sendgrid')
const processdg = require("../BL/processdataSolar");
// const mqdt = require("../DL/mqdt/conmqdt");

router.get("/", (req, res) => {
  res.send("Hello, we are in the home router!");
});

router.get("/getDgData", async (req, res) => {
  try {
    // Retrieve data from dataService
    const data = await dataService.getdgdata();

    // Send the data as the response
    res.json(data);
  } catch (error) {
    console.error("Error fetching dg data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getDgDataEvery5Min", async (req, res) => {
  try {
    // Retrieve data from dataService
    const data = await dataService.getdgdataevery5min();

    // Send the data as the response
    res.json(data);
  } catch (error) {
    console.error("Error fetching dg5min data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getDgDataDynamically", async (req, res) => {
  try {
    const { range } = req.query;

    // Retrieve data from dataService
    const data = await dataService.getdgdatadynamic(range);
    //     // Send the data as the response
    res.json(data);
  } catch (error) {
    console.error("Error fetching dgdynamic data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//comsumption pattern
router.get("/getConsumptionPatternData", async (req, res) => {
  try {
    // Retrieve data from dataService
    const data = await dataService.getconsumptionpattern();

    // Send the data as the response
    res.json(data);
  } catch (error) {
    console.error("Error fetching consumption pattern data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//ups chart
router.get("/getUpsData", async (req, res) => {
  try {
    // Retrieve data from dataService
    const data = await dataService.getupschart();

    // Send the data as the response
    res.json(data);
  } catch (error) {
    console.error("Error fetching ups data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getDgMonthlyProduceData", async (req, res) => {
  try {
    // Retrieve data from dataService
    const data = await dataService.getDGmonthlyProduce();
    const processdata = processdg.processdataproduceDG(data);
    // Send the data as the response
    res.json(processdata);
  } catch (error) {
    console.error("Error fetching monthly produce data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//totalemployeedata each day
// router.post("/employeecount", async (req, res) => {
//   try {
//     // Retrieve data from dataService
//     const { employee } = req.body;
//     const data = await dataService.putTotalemployeeperday(employee);

//     // Send the data as the response
//     res.json("Data inserted successfully");
//   } catch (error) {
//     console.error("Error inserting employee data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get('/lightloadon', async (req, res) => {
//   try {

//     await mqdt.sendMaterial()
//     // Send the data as the response
//     res.json("Data inserted successfully");
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// router.get('/lightloadoff', async (req, res) => {
//   try {

//     await mqdt.sendRobot()
//     // Send the data as the response
//     res.json("Data inserted successfully");
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;
