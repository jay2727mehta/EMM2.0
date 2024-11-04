const con = require("../databaseCon");

// Finds a node by its MAC address in the node_info table
const findNodeByMac = async (node_mac) => {
  try {
    const query = `SELECT node_id FROM node_info WHERE node_mac = $1`;
    const results = await con.query(query, [node_mac]);

    // Returns true if a node with the given MAC address exists, otherwise false
    return results.rows.length > 0;
  } catch (error) {
    console.error("Error finding node_info with node_mac:", error.message);
    throw error; // Rethrows the error to be handled by the caller
  }
};

// Finds a meter by its name in the table_config table
const findMeterByMeterName = async (meter_name) => {
  try {
    const query = `SELECT meter_name FROM table_config WHERE meter_name = $1`;
    const results = await con.query(query, [meter_name]);

    // Returns true if a meter with the given name exists, otherwise false
    return results.rows.length > 0;
  } catch (error) {
    console.error("Error finding meter_name in table_config:", error.message);
    throw error; // Rethrows the error to be handled by the caller
  }
};

// Inserts node information into the node_info table
// const insertNodeInfo = async (node) => {
//   const { node_location, assigned_gateway, node_name, node_mac,status} = node;

//   console.log(node,"nodes data in insertNodeInfo");
//   try {
//     // Trim and parse input data
//     const convertedNode = {
//       node_location: node_location? node_location : "",  // Fallback to an empty string if undefined
//       status: status ? parseInt(status) : 0,
//       assigned_gateway: assigned_gateway?assigned_gateway : "",
//       node_name: node_name? node_name : "",
//       node_mac: node_mac? node_mac : "",
//     };

//     console.log(convertedNode,"converted node in insert node");

//     // Check if the node already exists
//     const nodeExists = await findNodeByMac(convertedNode.node_mac);
//     console.log(nodeExists,"if true node_mac exist in table if false node_mac not exist");

//     if (!nodeExists) {
//       // Insert the node information into the database if it doesn't exist
//       const query = `INSERT INTO node_info(node_location, status, assigned_gateway, node_name, node_mac) VALUES ($1, $2, $3, $4, $5)`;
//       const values = [
//         convertedNode.node_location,
//         convertedNode.status,
//         convertedNode.assigned_gateway,
//         convertedNode.node_name,
//         convertedNode.node_mac,
//       ];
//       // const query_node=`SELECT COUNT(*) AS node_count
//       //   FROM node_info
//       //   WHERE gateway_mac = $1`

//       //     const gateway_value=[
//       // convertedNode.assigned_gateway
//       //               ]
//       try {
//         const node_insert_info=await con.query(query, values);
//         // const count_nodes=await con.query(query_node,gateway_value)
//         // console.log(count_nodes);

//         // const res_gateway=updateGatewayByMac(convertedNode.assigned_gateway,count_nodes)
//         const res = await insertMeterTableInfo(node); // Insert related meter information
//         return {
//           status: 201,
//           message: "Node information inserted successfully" + " & " + res.message,
//         };
//       } catch (error) {
//         console.error("Error inserting node info:", error.message);
//         throw error; // Rethrows the error to be caught by the outer catch
//       }
//     } else {
//       // If the node exists, only insert or update the meter information
//       const res = await insertMeterTableInfo(node);
//       return { status: 409, message: "Node already exists" + " " + "But " + res.message };
//     }
//   } catch (error) {
//     console.error("Error processing node info:", error.message);
//     throw error; // Rethrows the error to be caught by the caller
//   }
// };

const insertNodeInfo = async (node) => {
  const { node_location, assigned_gateway, node_name, node_mac, status,node_name_jp,node_location_jp } = node;

  console.log(node, "nodes data in insertNodeInfo function");
  try {
    // Trim and parse input data
    const convertedNode = {
      node_location: node_location ? node_location : "", // Fallback to an empty string if undefined
      status: status ? parseInt(status) : 0,
      assigned_gateway: assigned_gateway ? assigned_gateway : "",
      node_name: node_name ? node_name : "",
      node_mac: node_mac ? node_mac : "",
      node_name_jp : node_name_jp ? node_name_jp : "",
      node_location_jp : node_location_jp ? node_location_jp : "",
    };

    console.log(convertedNode, "converted node in insertNodeInfo ");

    // Check if the node already exists
    const nodeExists = await findNodeByMac(convertedNode.node_mac);

    console.log(nodeExists, "nodeExists");

    if (!nodeExists) {
      // Insert the node information into the database if it doesn't exist
      const query = `INSERT INTO node_info(node_location, status, assigned_gateway, node_name, node_mac, node_name_jp,node_location_jp) VALUES ($1, $2, $3, $4, $5,$6,$7)`;
      const values = [
        convertedNode.node_location,
        convertedNode.status,
        convertedNode.assigned_gateway,
        convertedNode.node_name,
        convertedNode.node_mac,
        convertedNode.node_name_jp,
        convertedNode.node_location_jp
      ];

      try {
        const node_insert_info = await con.query(query, values);
        const res = await insertMeterTableInfo(node); // Insert related meter information
        return {
          status: 201,
          message: "Node information inserted successfully & " + res.message,
        };
      } catch (error) {
        console.error("Error inserting node info:", error.message);
        throw error;
      }
    } else {
      // If the node exists, update its information
      const updateQuery = `UPDATE node_info SET node_location = $1, status = $2, assigned_gateway = $3, node_name = $4, node_name_jp = $6, node_location_jp = $7 WHERE node_mac = $5`;
      const updateValues = [
        convertedNode.node_location,
        convertedNode.status,
        convertedNode.assigned_gateway,
        convertedNode.node_name,
        convertedNode.node_mac,
        convertedNode.node_name_jp,
        convertedNode.node_location_jp
      ];

      try {
        const node_update_info = await con.query(updateQuery, updateValues);

        console.log("Node information updated successfully:");

        const res = await insertMeterTableInfo(node); // Insert or update related meter information
        return {
          status: 201,
          message: "Node information updated successfully & " + res.message,
        };
      } catch (error) {
        console.error("Error updating node info:", error.message);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error processing node info:", error.message);
    throw error;
  }
};

// Inserts meter table information into the table_config table
const insertMeterTableInfo = async (tableInfo) => {
  const {
    name_of_table,
    meter_name,
    type,
    power_watt,
    temperature_c,
    energy_watt_hr,
    voltage_v,
    fuel_lt,
    humidity_g_m3,
    moisture_g_m3,
    node_mac,
    current_a,
    co2_p,
    aud_db,
    lux_l,
    meter_name_jp,
    type_jp
  } = tableInfo;
  try {
    // Trim string inputs for cleaner data insertion
    const trimmedTableInfo = {
      name_of_table: name_of_table,
      meter_name: meter_name,
      type: type ? type : null,
      power: power_watt ? power_watt : null,
      temperature: temperature_c ? temperature_c : null,
      energy: energy_watt_hr ? energy_watt_hr : null,
      voltage: voltage_v ? voltage_v : null,
      fuel: fuel_lt ? fuel_lt : null,
      humidity: humidity_g_m3 ? humidity_g_m3 : null,
      moisture: moisture_g_m3 ? moisture_g_m3 : null,
      mac_id_meter: node_mac ? node_mac : null,
      current_a: current_a ? current_a : null,
      co2_p: co2_p ? co2_p : null,
      aud_db: aud_db ? aud_db : null,
      lux_l: lux_l ? lux_l : null,
      meter_name_jp : meter_name_jp ? meter_name_jp : null
    };

    console.log(trimmedTableInfo, "node_table_config data table ");

    // Check if a meter with the given name or table exists
    // const meterExists = await findMeterByMeterName(trimmedTableInfo.meter_name);
    const meterExistByTable = await findMeterByNameOfTable(
      trimmedTableInfo.name_of_table
    );

    console.log(
      meterExistByTable,
      "meter_name (table name) is exist in system"
    );

    if (meterExistByTable) {
      // Update meter information if it already exists by table
      await updateMeterTableInfo(tableInfo, meterExistByTable[0].id);
      return {
        status: 201,
        message: "Meter table information updated successfully",
      };
    } else if (!meterExistByTable) {
      console.log(
        "meter name does not exist in system inserting in table config table "
      );

      const result_table_info = insertMeterInfoTable(trimmedTableInfo);

      return result_table_info;
    } else {
      return { status: 409, message: "Meter already exists" };
    }
  } catch (error) {
    console.error("Error processing meter table info:", error.message);
    throw error; // Rethrows the error to be caught by the caller
  }
};

// Updates meter table information in the table_config table
const updateMeterTableInfo = async (tableInfo, meterId) => {
  const {
    name_of_table,
    meter_name,
    type,
    power_watt,
    temperature_c,
    energy_watt_hr,
    voltage_v,
    fuel_lt,
    humidity_g_m3,
    moisture_g_m3,
    node_mac,
    meter_name_jp,
    type_jp
  } = tableInfo;

  try {
    // Update the existing meter record with new data
    const query = `UPDATE table_config SET 
                  meter_name = $2,
                  type = $3,
                  power_watt = $4,
                  temperature_c = $5,
                  energy_watt_hr = $6,
                  voltage_v = $7,
                  fuel_lt = $8,
                  humidity_g_m3 = $9,
                  moisture_g_m3 = $10,
                  node_mac = $11,
                  meter_name_jp = $12,
                  type_jp = $13 
                  WHERE name_of_table = $1`;

    const date = new Date();
    const formattedDate = date.toISOString().replace("T", " ").slice(0, 19);
    const values = [
      name_of_table,
      meter_name,
      type,
      power_watt,
      temperature_c,
      energy_watt_hr,
      voltage_v,
      fuel_lt,
      humidity_g_m3,
      moisture_g_m3,
      node_mac,
      meter_name_jp,
      type_jp
    ];

    await con.query(query, values);
    return {
      status: 201,
      message: "Meter table information updated successfully",
    };
  } catch (error) {
    console.error("Error updating meter table info:", error.message);
    throw error; // Rethrows the error to be caught by the caller
  }
};

// Finds a meter by its table name in the table_config table
const findMeterByNameOfTable = async (name_of_table) => {
  try {
    const query = `SELECT id FROM table_config WHERE name_of_table = $1`;
    const results = await con.query(query, [name_of_table]);

    // Returns the meter information if found, otherwise returns null
    return results.rows.length > 0 ? results.rows : null;
  } catch (error) {
    console.error(
      "Error finding table_config with name_of_table:",
      error.message
    );
    throw error; // Rethrows the error to be handled by the caller
  }
};

const insertMeterinfo_table_confic_range = async (trimmedTableInfo) => {
  console.log("insertMeterinfo_table_confic_range", trimmedTableInfo);

  const date = new Date();

  const query = `INSERT INTO public.table_config_range(
    name_of_table, 
    node_mac
  ) 
  VALUES ($1,$2) RETURNING *`;

  const values = [
    trimmedTableInfo.name_of_table,
    trimmedTableInfo.mac_id_meter,
  ];
  try {
    // Execute the SQL query with the provided values
    const res_insertMeterinfo_table_confic_range = await con.query(
      query,
      values
    );
    console.log(
      "res_insertMeterinfo_table_confic_range respose from table_range_config"
    );

    // Return a success status and message
    return {
      status: 201,
      message:
        "Meter table_table_confic_range information inserted successfully",
    };
  } catch (error) {
    // Log any errors to the console
    console.error(
      "Error inserting meter table table_table_confic_range info:",
      error.message
    );

    // Rethrow the error to be handled by the outer scope
    throw error;
  }
};

// Define the method to insert meter table information
async function insertMeterInfoTable(trimmedTableInfo) {
  // Define the SQL query with placeholders for values

  const query = `INSERT INTO table_config(
                  "timestamp", 
                  "name_of_table", 
                  "meter_name", 
                  "type", 
                  "power_watt", 
                  "temperature_c", 
                  "energy_watt_hr", 
                  "voltage_v", 
                  "fuel_lt", 
                  "humidity_g_m3", 
                  "moisture_g_m3", 
                  "node_mac",
                  "current_a",
                  "co2_p",
                  "aud_db",
                  "lux_l",
                  "meter_name_jp",
                  "type_jp"
                ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17,$18)`;

  // Format the current date as a string
  const date = new Date();
  const formattedDate = date.toISOString().replace("T", " ").slice(0, 19);

  // Prepare the values to be inserted into the database
  const values = [
    formattedDate,
    trimmedTableInfo.name_of_table,
    trimmedTableInfo.meter_name,
    trimmedTableInfo.type,
    trimmedTableInfo.power,
    trimmedTableInfo.temperature,
    trimmedTableInfo.energy,
    trimmedTableInfo.voltage,
    trimmedTableInfo.fuel,
    trimmedTableInfo.humidity,
    trimmedTableInfo.moisture,
    trimmedTableInfo.mac_id_meter,
    trimmedTableInfo.current_a,
    trimmedTableInfo.co2_p,
    trimmedTableInfo.aud_db,
    trimmedTableInfo.lux_l,
    trimmedTableInfo.meter_name_jp,
    trimmedTableInfo.type_jp
  ];

  try {
    // Execute the SQL query with the provided values
    await con.query(query, values);

    console.log("inserting in table range config table ");

    const result_table_config_range =
      insertMeterinfo_table_confic_range(trimmedTableInfo);
    // Return a success status and message
    return {
      status: 201,
      message: `Meter table and table_config_range information inserted successfully ${result_table_config_range.message}`,
    };
  } catch (error) {
    // Log any errors to the console
    console.error("Error inserting meter table info:", error.message);

    // Rethrow the error to be handled by the outer scope
    throw error;
  }
}

const configureNode_meter = async (data) => {
  console.log(data,"okokokkkookkook");
  
  const {
    min_power,
    max_power,
    critical_power,
    min_temp,
    max_temp,
    critical_temp,
    min_fuel,
    max_fuel,
    critical_fuel,
    min_humidity,
    max_humidity,
    critical_humidity,
    min_energy,
    max_energy,
    critical_energy,
    min_co2,
    max_co2,
    critical_co2,
    min_lux,
    max_lux,
    critical_lux,
    min_aud,
    max_aud,
    critical_aud,
    node_mac,
    pf,
    voltage
  } = data;

  try {
    // Update all rows where node_mac matches
    const query = `UPDATE table_config_range SET 
                  min_power = $2,
                  max_power = $3,
                  critical_power = $4,
                  min_temp = $5,
                  max_temp = $6,
                  critical_temp = $7,
                  min_fuel = $8,
                  max_fuel = $9,
                  critical_fuel = $10,
                  min_humidity = $11,
                  max_humidity = $12,
                  critical_humidity = $13,
                  min_energy = $14,
                  max_energy = $15,
                  critical_energy = $16,
                  min_co2 = $17,
                  max_co2 = $18,
                  critical_co2 = $19,
                  min_lux =  $20,
                  max_lux = $21,
                  critical_lux = $22,
                  min_aud = $23,
                  max_aud = $24,
                  critical_aud = $25,
                  pf=$26,
                  voltage=$27
                  WHERE node_mac = $1`;

    const values = [
      node_mac, // $1
      min_power, // $2
      max_power, // $3
      critical_power, // $4
      min_temp, // $5
      max_temp, // $6
      critical_temp, // $7
      min_fuel, // $8
      max_fuel, // $9
      critical_fuel, // $10
      min_humidity,
      max_humidity,
      critical_humidity,
      min_energy,
      max_energy,
      critical_energy,
      min_co2,
      max_co2,
      critical_co2,
      min_lux,
      max_lux,
      critical_lux,
      min_aud,
      max_aud,
      critical_aud,
      pf,
      voltage
    ];

    const result = await con.query(query, values);

    return {
      status: 201,
      message: `Meter table information updated successfully for ${result.rowCount} row(s)`, // Reporting the number of updated rows
    };
  } catch (error) {
    console.error("Error updating meter table info:", error.message);
    throw error; // Rethrows the error to be caught by the caller
  }
};

// Exporting the functions to be used in other modules
module.exports = {
  insertNodeInfo,
  insertMeterTableInfo,
  configureNode_meter,
};
