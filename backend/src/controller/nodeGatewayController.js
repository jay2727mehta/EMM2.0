const express = require("express");
const router = express.Router();
const gatewayService = require("../DL/gatewayInfo/gatewayInfoDL");
const nodeService = require("../DL/nodeInfo/nodeInfoDL");
const logger = require("../logger");  // Import your winston logger

router.get("/getNodeInfo", async (req, res) => {
  try {
    const result = await nodeService.getNodeInfoData();
    logger.info("Fetched node info data", { endpoint: "/getNodeInfo", status: result.status });

    if (result.status === 200) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json(result.data);
    }
  } catch (error) {
    logger.error("Error Fetching node_info", { endpoint: "/getNodeInfo", error: error.message });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getGatewayInfo", async (req, res) => {
  try {
    const result = await gatewayService.getGatewayInfoData();
    logger.info("Fetched gateway info data", { endpoint: "/getGatewayInfo", status: result.status });

    if (result.status === 200) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json(result.data);
    }
  } catch (error) {
    logger.error("Error Fetching gateway_info", { endpoint: "/getGatewayInfo", error: error.message });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getNodeParameter", async (req, res) => {
  try {
    const { node_mac } = req.query;
    const nodeParameter = await nodeService.getNodeParameters(node_mac);
    logger.info("Fetched node parameters", { endpoint: "/getNodeParameter", node_mac, status: nodeParameter.status });

    if (nodeParameter.status === 200) {
      res.status(200).json(nodeParameter.results);
    }
  } catch (error) {
    logger.error("Error Fetching node parameters", { endpoint: "/getNodeParameter", error: error.message });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getAllMeters", async (req, res) => {
  try {
    const allMeters = await nodeService.getAllMeters();
    logger.info("Fetched all meters", { endpoint: "/getAllMeters", status: allMeters.status });

    if (allMeters.status === 200) {
      res.status(200).json(allMeters.results);
    }
  } catch (error) {
    logger.error("Error Fetching all meters", { endpoint: "/getAllMeters", error: error.message });
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
