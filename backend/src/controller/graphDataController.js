const express = require("express");
const router = express.Router();
const dataService = require("../DL/energyMeterDL.js/dlenergymeter");
const graphDataService = require("../DL/Graphdata.Service/graphdata.service");
const logger = require("../logger");
const dataServiceSolar = require("../DL/solar/solarservice");

router.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/getEnergyDataDynamicallSpecificTable", async (req, res) => {
  try {
    const { range, meterConfig } = req.query;
    logger.info(
      `Handling /getEnergyDataDynamicallSpecificTable with params: range=${range}, meterConfig=${JSON.stringify(
        meterConfig
      )}`
    );

    const dataRes = await dataService.getenergydatadynamic(range, meterConfig);
    const rangeRes = await graphDataService.getRangeIndivisualDevice(
      meterConfig.dbTable
    );
    const responseData = {
      range,
      ...dataRes.resultEnergy,
      ...rangeRes.data[0],
    };
    console.log(responseData,"getEnergyDataDynamicallSpecificTable");

    res.status(200).json({data:responseData });
  } catch (error) {
    logger.error(`Error fetching in specific table data: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getDeviceInfoIndivisualDeviceCurrent", async (req, res) => {
  try {
    const { range, meterConfig } = req.query;
    logger.info(
      `Handling /getDeviceInfoIndivisualDeviceCurrent with params: range=${range}, meterConfig=${JSON.stringify(
        meterConfig
      )}`
    );
    const rangeRes = await graphDataService.getRangeIndivisualDevice(
      meterConfig.dbTable
    );
    const dataRes = await graphDataService.getDeviceInfoIndivisualDeviceCurrent(
      range,
      meterConfig
    );
    if (dataRes.status === 200) {
      const responseData = {
        ...dataRes.data,
        ...rangeRes.data[0],
      };
      res.status(200).json({ data: responseData });
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    logger.error(
      `Error fetching in specific table humidity info: ${error.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getSolarEnergyDataDynamicallSpecificTable", async (req, res) => {
  try {
    const dataRes = await dataServiceSolar.getTimlysolargenarateddata();

    const solarData = dataRes.rows;
    const transformedData = solarData.reduce(
      (acc, curr) => {
        acc.grid_active_power_kw.push(curr.grid_active_power_kw);
        acc.timestamp.push(curr.timestamp);
        acc.solar_active_power_kw.push(curr.solar_active_power_kw);
        return acc;
      },
      {
        grid_active_power_kw: [],
        timestamp: [],
        solar_active_power_kw: [],
      }
    );

    res.status(200).json({ transformedData });
    // res.status(200).json("hello");
  } catch (error) {
    logger.error(`Error fetching in specific table data: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getCombineInfoIndivisualDeviceCurrent", async (req, res) => {
  try {
    // const { range, meterConfig } = req.query;
    // logger.info(`Handling /getDeviceInfoIndivisualDeviceCurrent with params: range=${range}, meterConfig=${JSON.stringify(meterConfig)}`);
    // const rangeRes = await graphDataService.getRangeIndivisualDevice(meterConfig.dbTable);
    // const dataRes = await graphDataService.getDeviceInfoIndivisualDeviceCurrent(range, meterConfig);
    // if (dataRes.status === 200) {
    //   const responseData = {
    //     ...dataRes.data,
    //     ...rangeRes.data[0],
    //   };
    const tableNamesArray = ["floor4_temp", "floor5_temp", "floor6_temp"];

    const responseData =
      graphDataService.extractDataFromTables(tableNamesArray);
    res.status(200).json({ data: responseData });
  } catch (error) {
    logger.error(
      `Error fetching in specific table humidity info: ${error.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// const PowerGrid=[
//   {
//       meterConfig: { dbTable: "energy_2037b97", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2036690", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037cac", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_20380bf", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   // {
//   //     meterConfig: { dbTable: "energy_20369df", energy: "u3", power: "u2", parameter: "u2" },
//   // },
//   {
//       meterConfig: { dbTable: "energy_2034a7e", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037ebd", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2036b87", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2038561", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2036edc", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   // {
//   //     meterConfig: { dbTable: "energy_20336fc", energy: "u3", power: "u2", parameter: "u2" },
//   // },
//   {
//       meterConfig: { dbTable: "energy_2033b63", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2034780", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_203698d", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037ced", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2036bba", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_20386f7", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_203749b", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_1085295", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_10852A3", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_10872A1", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_20366b1", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037687", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037385", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2038390", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_20378f2", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_203805a", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_203752e", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037948", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037a1d", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037c69", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_203842f", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2038029", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_203812f", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2037db1", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   {
//       meterConfig: { dbTable: "energy_2038137", energy: "u3", power: "u2", parameter: "u2" },
//   },
//   // {
//   //     meterConfig: { dbTable: "energy_203846fs", energy: "u3", power: "u2", parameter: "u2" },
//   // }
// ]





router.get("/getEnergyDataCombineDynamicallSpecificTable", async (req, res) => {
  try {
    const { range, meterConfig } = req.query;
    logger.info(
      `Handling /getEnergyDataCombineDynamicallSpecificTable with params: range=${range}, meterConfig=${JSON.stringify(
        meterConfig
      )}`
    );
    // let range='month'
    // const queries = req.query; // Assuming req.query is now an array
    const dataResponses = await Promise.all(
      meterConfig.map(async ({ meterConfig }) => {
        return await dataService.getenergydatadynamic(range, meterConfig);
      })
    );
    const modifiedData = dataResponses.map((item) => {
      const { datarange, ...rest } = item; // Destructure datarange and keep the rest of the object
      return rest; // Return the object without datarange
    });

    let dataReading = [];  // Initialize an empty array for storing sums at each index
    let timestamp = [];    // You can also initialize an array for timestamps if needed
    
    for (let i = 0; i < modifiedData.length; i++) {
      for (let j = 0; j < modifiedData[i].resultEnergy.meter_reading.length; j++) {
        // Initialize dataReading[j] if it hasn't been initialized yet
        if (!dataReading[j]) {
          dataReading[j] = 0;
        }
        // Add the current meter_reading value to the running total at index j
        dataReading[j] += modifiedData[i].resultEnergy.meter_reading[j];
      }
    
      // Optionally, store the timestamps if you need to track them
      for (let j = 0; j < modifiedData[i].resultEnergy.timestamp.length; j++) {
        if (!timestamp[j]) {
          timestamp[j] = modifiedData[i].resultEnergy.timestamp[j];
        }
      }
    }


    let meter_reading=dataReading
     const responseData = {
     
      meter_reading,
      timestamp,
      min_energy : 1,
      max_energy : 250,
      critical_energy : 400
    };
   console.log(responseData,"resposedata");
   
    res.status(200).json({ data:responseData });
  } catch (error) {
    logger.error(`Error fetching in specific table data: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//power combvine 
// getDeviceCombineIndivisualDeviceCurrent
router.get("/getDeviceCombineIndivisualDeviceCurrent", async (req, res) => {
  try {
    const { range, meterConfig } = req.query;
    logger.info(
      `Handling /getDeviceCombineIndivisualDeviceCurrent with params: range=${range}, meterConfig=${JSON.stringify(
        meterConfig
      )}`
    );
  
    const dataResponses = await Promise.all(
      meterConfig.map(async ({meterConfig }) => {
        return await graphDataService.getDeviceInfoIndivisualDeviceCurrent(
          range,
          meterConfig
        );
      })
    );

    const modifiedData = dataResponses.map((item) => {
      const { datarange, ...rest } = item; // Destructure datarange and keep the rest of the object
      return rest; // Return the object without datarange
    });
    let dataReading = [];  // Initialize an empty array for storing sums at each index
    let timestamp = [];    // Initialize an empty array for timestamps if needed
    
    // Assuming 'modifiedData' is the array of objects
    for (let i = 0; i < modifiedData.length; i++) {
      // Access the 'data' object that contains 'meter_reading' and 'timestamp'
      const { meter_reading, timestamp: currentTimestamps } = modifiedData[i].data;
    
      // Sum meter_reading values across multiple objects
      for (let j = 0; j < meter_reading.length; j++) {
        // Initialize dataReading[j] if it hasn't been initialized yet
        if (!dataReading[j]) {
          dataReading[j] = 0;
        }
        // Add the current meter_reading value to the running total at index j
        dataReading[j] += meter_reading[j];
      }
    
      // Store timestamps only if they haven't been stored yet
      for (let j = 0; j < currentTimestamps.length; j++) {
        if (!timestamp[j]) {
          timestamp[j] = currentTimestamps[j];
        }
      }
    }
    

    let meter_reading=dataReading
    // Prepare the final response data
    const responseData = {
      meter_reading,
      timestamp,
      min_power : 1,
      max_power : 50,
      critical_power : 35
    };
    
    // Log the final data to verify
    console.log(responseData,"response data from getDeviceCombineIndivisualDeviceCurrent");
    // console.log('Timestamps:', responseData.timestamp);
    // if (dataRes.status === 200) {
    //   const responseData = {
    //     ...dataRes.data,
    //     ...rangeRes.data[0],
    //   };
      res.status(200).json({ data: responseData });
  
  } catch (error) {
    logger.error(
      `Error fetching in specific table humidity info: ${error.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
