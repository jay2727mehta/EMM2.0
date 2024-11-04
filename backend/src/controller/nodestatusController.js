const express = require("express");
const router = express.Router();
const nodeStateService = require("../DL/nodestate/nodestateservice");
const tableMeterService = require("../DL/nodestate/configService");
// const mqdt = require("../DL/mqdt/conmqdt");

router.get("/", async (req, res) => {
  try {
    const data = await nodeStateService.getNodeStateData();

    if (data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "No Results Found" });
    }
  } catch (error) {
    console.error("Error fetching node status data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/offlineNodes", async (req, res) => {
  try {
    const data = await nodeStateService.getOfflineNodeStateData();

    if (data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "No Results Found" });
    }
  } catch (error) {
    console.error("Error fetching offline node data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/tablemeter", async (req, res) => {
  try {
    const data = await tableMeterService.getTableMeterData();

    if (data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "No Results Found" });
    }
  } catch (error) {
    console.error("Error fetching offline node data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/setInterval", async (req, res) => {
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

router.get("/testConnection", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await mqdt.checkConnection();
    // Send the data as the response
    res.json("connection true");
  } catch (error) {
    console.error("connection false:", error);
    res.status(500).send("connection false");
  }
});



module.exports = router;
