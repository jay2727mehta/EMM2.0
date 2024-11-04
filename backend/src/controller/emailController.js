const express = require("express");
const router = express.Router();
const Dgsendemail = require("../message/sendgrid");
const mailservice = require("../BL/mail");
const employeeService = require("../DL/employee/employeeService");

router.get("/", (req, res) => {
  try {
    res.send("Hello, we are in the home router!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/criticalPower", async (req, res) => {
  try {
    const params  = req.query;
    // const response = await mailservice.criticalPower(params);
    res.send("Hello, we are in the criticalPower router!");
  } catch (error) {
    console.error("Error fetching critical power data", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/nodes", async (req, res) => {
  try {
    // const {params} = req.query;
    const response = await mailservice.OfflineNodesMail();
    res.send("Hello, we are in the criticalPower router!");
  } catch (error) {
    console.error("Error fetching node data", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/dgupdate", async (req, res) => {
  try {
    const { data } = req.body;
    const response = await mailservice.dgupdates(data);
    res.send("Hello, we are in the gdupdate router!");
  } catch (error) {
    console.error("Error fetching dg data", error);
    res.status(500).send("Internal Server Error");
  }
});

// router.post("/employee", async (req, res) => {
//   try {

//     const response = await employeeService.fetchData()

//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/getemployeecount", async (req, res) => {
//   try {
//     const response = await employeeService.fetchData();
//     res.json(response);
//   } catch (error) {
//     console.error("Error fetching employee data", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
