const express = require("express");
const router = express.Router();
const employeeService = require("../DL/employee/employeeService");
const dataService = require("../DL/databseServices");

router.get("/getemployeecount", async (req, res) => {
  try {
    const response = await employeeService.fetchData();
    res.json(response);
  } catch (error) {
    console.error("Error fetching employee data", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/employeecount", async (req, res) => {
  try {
    // Retrieve data from dataService
    const { employee } = req.body;
    const data = await dataService.putTotalemployeeperday(employee);
   
    // Send the data as the response
    res.json("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting employee data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;