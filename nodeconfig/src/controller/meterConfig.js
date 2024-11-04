// const express = require("express");
// const router = express.Router();
// const gatewayService = require("../DL/GatewayInfo/gatewayinfoDL");
// const nodeService = require("../DL/NodeInfo/nodeinfoDL");
// const logger = require("../logger");
// router.post("/", (req, res) => {
//   try {
//     const body = req.body;
//     const {
//       gatewaymac,
//       devicename,
//       location,
//       deviceid,
//       ssid,
//       ssidpassword,
//       assetnameb,
//       subassetnameh,
//     } = body;
//     console.log(
//       gatewaymac,
//       devicename,
//       location,
//       deviceid,
//       ssid,
//       ssidpassword,
//       assetnameb,
//       subassetnameh
//     );
//     console.log("GET Request Received", body);
//     res.status(200).json({ message: "Hello" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


// router.post("/node", async (req, res) => {
//   try {
//     const node_info = req.body;
//     const results = [];

//     for (const nodes of node_info) {
//       const node = await nodeService.insertNodeInfo(nodes);
//       if (node.status === 201) {

//         results.push({ status: 201, message: node.message });
//       } else {
//         results.push({ status: 409, error: node.message });
//       }
//     }
//     console.log(results);
    
//     res.status(200).json({ results });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// router.post("/updateNodeMeterRangeInfo", async (req, res) => {
//   try {
//     const data = req.body;
    
    
//       const node = await nodeService.configureNode_meter(data);

//       if (node.status === 201) {
//         res.status(201).json({ message: node.message })
     
//       } else {
//         res.status(409).json({ message: node.message })
//       }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/gateway", async (req, res) => {
//   try {
//     const gateway_info = req.body;

//     const gateway = await gatewayService.insertGatewayInfo(gateway_info);
//     if (gateway.status === 200) {
//       res.status(200).json({ message: gateway.message });
//     } else {
//       res.status(409).json({ error: gateway.message });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.post("/sensor", async (req, res) => {
//   try {
//     console.log("POST Request Received");
//     console.log(req.body);

//     // Perform any asynchronous operations if needed

//     res.status(200).json({ message: "POST request successful" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.post("/meter", async (req, res) => {
//   try {
   
//     // Perform any asynchronous operations if needed
//     res.status(200).json({ message: "Data Inserted successful" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const gatewayService = require("../DL/GatewayInfo/gatewayinfoDL");
const nodeService = require("../DL/NodeInfo/nodeinfoDL");
const logger = require("../logger"); // Import the logger

router.get('/', (req,res) => {
  res.send('hi')
});

router.post("/", (req, res) => {
  try {
    const body = req.body;
    const { gatewaymac, devicename, location, deviceid, ssid, ssidpassword, assetnameb, subassetnameh } = body;

    logger.info(`Received GET Request: ${JSON.stringify(body)}`); // Log the request details

    res.status(200).json({ message: "Hello" });
  } catch (error) {
    logger.error(`Error in POST /: ${error.message}`); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/node", async (req, res) => {
  try { 
    const node_info = req.body;
   
    console.log(node_info ,"noe info data complete from application");
    
    const removeEmptyObjects=(arr)=> {
      return arr.filter(obj => Object.keys(obj).length !== 0);
    }
    const nodes=removeEmptyObjects(node_info)
    
    const results = [];
    
    const node = await nodeService.insertNodeInfo(nodes[0]);
    
    logger.info(`Node info processed: ${JSON.stringify(node)}`); // Log results
    
    if (node.status === 201) {
      res.status(596).json({ results });
    }else{
      res.status(700).json({ results });
    }

  } catch (error) {
    logger.error(`Error in POST /node: ${error.message,req}`); // Log the error
    res.status(700).json({ error: error.message });
  }
});

router.post("/updateNodeMeterRangeInfo", async (req, res) => {
  try {
    const data = req.body;
    const node = await nodeService.configureNode_meter(data);

    if (node.status === 201) {
      logger.info(`Node meter range updated successfully for: ${JSON.stringify(data)}`);
      res.status(201).json({ message: node.message });
    } else {
      logger.warn(`Conflict in updating node meter range: ${node.message}`);
      res.status(409).json({ message: node.message });
    }
  } catch (error) {
    logger.error(`Error in POST /updateNodeMeterRangeInfo: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.post("/gateway", async (req, res) => {
  try {
    const gateway_info = req.body;
    const gateway = await gatewayService.insertGatewayInfo(gateway_info);
    const   results=[]
    if (gateway.status === 201){
      console.log("inserted");
      res.status(596).json({ results });
    }else{
      console.log("not inserted");
      res.status(700).json({ results });
    }
    // if (gateway.status === 200) {
    //   logger.info(`Gateway info inserted successfully: ${JSON.stringify(gateway_info)}`);
    //   res.status(200).json({ message: gateway.message,code:560});
    //   // res.setStatus(560);      
     
    // } else {
    //   logger.warn(`Conflict in inserting gateway info: ${gateway.message}`);
    //   res.status(409).json({ error: gateway.message,code:404});
    //   //res.status(560);
    // }
  } catch (error) {
    logger.error(`Error in POST /gateway: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/sensor", async (req, res) => {
  try {
    logger.info(`Sensor POST Request Received: ${JSON.stringify(req.body)}`);
    res.status(200).json({ message: "POST request successful" });
  } catch (error) {
    logger.error(`Error in POST /sensor: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/meter", async (req, res) => {
  try {
    logger.info(`Meter data inserted: ${JSON.stringify(req.body)}`);
    res.status(200).json({ message: "Data Inserted successfully" });
  } catch (error) {
    logger.error(`Error in POST /meter: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

