const express = require("express");
const router = express.Router();
// const dataService=require('../DL/databseServices')
// // const Dgsendemail=require('../message/sendgrid')
// const processdg=require('../BL/processdataSolar')
// const mqdt = require("../DL/mqdt/conmqdt");

router.get("/lightloadon", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await mqdt.turnoffLt();
    // Send the data as the response
    res.json("Light is turn off");
  } catch (error) {
    console.error("Error fetching lightload data:", error);

    res.status(500).send("Internal Server Error");
  }
});

router.get("/lightloadoff", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await mqdt.turnonLt();
    // Send the data as the response
    res.json("Light is turn on");
  } catch (error) {
    console.error("Error fetching lightload data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/lightloadCabinon", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await mqdt.turnoffLtCabin();
    // Send the data as the response
    res.json("Light is turn off");
  } catch (error) {
    console.error("Error fetching lightloadcabin data:", error);

    res.status(500).send("Internal Server Error");
  }
});

router.get("/lightloadCabinoff", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await mqdt.turnonLtCabin();
    // Send the data as the response
    res.json("Light is turn on");
  } catch (error) {
    console.error("Error fetching lightloadcabin data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/acoff", async (req, res) => {
  try {
    // Assuming mqdt is an object with a method turnOffAC() to turn off the air conditioner
    // await mqdt.turnOFFAC();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await mqdt.turnOFFAC();

    // Send the data as the response
    res.json("Air conditioner is turned off");
  } catch (error) {
    console.error("Error turning off air conditioner:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/acon", async (req, res) => {
  try {
    // Assuming mqdt is an object with a method turnOffAC() to turn off the air conditioner
    await mqdt.turnOnAC();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await mqdt.turnOnAC();

    // Send the data as the response
    res.status(200).json("Air conditioner is turned off");
  } catch (error) {
    console.error("Error turning off air conditioner:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
