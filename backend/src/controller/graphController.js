const express = require("express");
const router = express.Router();
const graphService = require("../DL/Graph/graphDL");
const logger = require("../logger");

router.get("/getCompleteGraphConfig", async (req, res) => {
  try {

    const { userId , componentMap} = req.query;
    logger.info(`Fetching graph config for userId & component : ${userId},${componentMap}`);

    const result = await graphService.getCompleteGraphConfig(userId,componentMap);
  
    
    if (result.status === 200) {
      logger.info(`Graph config fetched successfully for userId: ${userId},${componentMap}`);
      res.status(200).json({ message: "graph config fetch success", result: result.result });
    } else {
      logger.warn(`Graph config not found for userId: ${userId}`);
      res.status(404).json({ message: "not found graph config", result: null });
    }
  } catch (error) {
    logger.error(`Error fetching graph config for userId: ${userId} - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getCompleteGraphConfigUser", async (req, res) => {
  try {
    logger.info("Fetching complete graph config for all users");

    const result = await graphService.getCompleteGraphConfigUser();
    
    if (result.status === 200) {
      logger.info("Graph config fetched successfully for all users");
      res.status(200).json({ message: "graph config fetch success", result: result.result });
    } else {
      logger.warn("Graph config not found for all users");
      res.status(404).json({ message: "not found graph config", result: null });
    }
  } catch (error) {
    logger.error(`Error fetching graph config for all users - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addGraphConfig", async (req, res) => {
  try {
    const graphConfig = req.body;
    logger.info(`Inserting graph config: ${JSON.stringify(graphConfig)}`);

    const result = await graphService.addGraphConfig(graphConfig);
    if (result.status === 200) {
      logger.info("Graph config insertion success");
      res.status(200).json({ message: "graph config insertion success" });
    } else {
      logger.warn("Graph config insertion failed");
      res.status(409).json({ message: "graph config insertion failed" });
    }
  } catch (error) {
    logger.error(`Error inserting graph config - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteGraphConfig", async (req, res) => {
  try {
    const { graph_id } = req.query;
    logger.info(`Deleting graph config with id: ${graph_id}`);

    const result = await graphService.deleteGraphConfig(graph_id);
    if (result.status === 200) {
      logger.info(`Graph config deletion success for id: ${graph_id}`);
      res.status(200).json({ message: "graph config deletion success", result: result.result });
    } else {
      logger.warn(`Graph config deletion failed for id: ${graph_id}`);
      res.status(404).json({ message: "graph config deletion failed", result: result.result });
    }
  } catch (error) {
    logger.error(`Error deleting graph config with id: ${graph_id} - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
