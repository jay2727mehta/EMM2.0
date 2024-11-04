const con = require("../databaseCon");

const findGatewayByMac = async (gateway_mac) => {
  try {
    const gatewayMac = gateway_mac.toString()
    const query1 =
      "SELECT gateway_mac FROM gateway_info WHERE gateway_mac = $1";
    const values = [gatewayMac];

    const results = await con.query(query1, values);

    if (results.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw { message: "Error finding gateway_info with gateway_mac :", error };
  }
};


// const updateGatewayByMac = async (gateway_mac, updatedFields) => {
//   try {
//     const gatewayMac = gateway_mac.toString().trim();


//     // Build the query to update gateway info
//     const query2 = `
//       UPDATE gateway_info 
//       SET assigned_gateway = $1,
//       WHERE gateway_mac = $2
//     `;

//     const values = [updatedFields, gatewayMac];

//     // Execute the query
//     const result = await con.query(query2, values);

//     if (result.rowCount > 0) {
//       return { success: true, message: "Gateway updated successfully" };
//     } else {
//       return { success: false, message: "No gateway found with the given MAC address" };
//     }
//   } catch (error) {
//     console.error(error);
//     throw { message: "Error updating gateway_info with gateway_mac :", error };
//   }
// };
// const insertGatewayInfo = async (gateway) => {
//   try {
//     const convertedValues = {
//       gateway_mac: gateway.gateway_mac,
//       assigned_node: gateway.assigned_node
//         ? parseInt(gateway.assigned_node)
//         : null,
//       online_node: gateway.online_node ? parseInt(gateway.online_node) : null, // Convert boolean to 1 or 0
//       offline_node: gateway.offline_node
//         ? parseInt(gateway.offline_node)
//         : null, // Convert boolean to 1 or 0
//       status: gateway.status ? parseInt(gateway.status) : null, // Convert status string to integer
//       location: gateway.location,
//       gateway_name: gateway.gateway_name,
//     };
//     const bool = await findGatewayByMac(gateway.gateway_mac);
//     if (!bool) {
//       const query = `
//         INSERT INTO gateway_info
//           (gateway_mac, assigned_node, online_node, offline_node, status, location, gateway_name)
//         VALUES ($1, $2, $3, $4, $5, $6, $7)
//       `;
//       const values = [
//         convertedValues.gateway_mac,
//         convertedValues.assigned_node,
//         convertedValues.online_node,
//         convertedValues.offline_node,
//         convertedValues.status,
//         convertedValues.location,
//         convertedValues.gateway_name,
//       ];

//       try {
//         const results = await con.query(query, values);
//         return { status : 201 , message: "New Gateway Added" };
//       } catch (error) {
//         // Handle the error here

//         throw {
//           message: "Error inserting  gateway_info with gateway_mac :",
//           error,
//         }; // Re-throw the error to propagate it further if needed
//       }
//     } else {
//        // Update query if gateway exists
//   const updateQuery = `
//   UPDATE gateway_info
//   SET 
//     assigned_node = $1,
//     online_node = $2,
//     offline_node = $3,
//     status = $4,
//     location = $5,
//     gateway_name = $6
//   WHERE gateway_mac = $7
// `;
// const updateValues = [
//   convertedValues.assigned_node,
//   convertedValues.online_node,
//   convertedValues.offline_node,
//   convertedValues.status,
//   convertedValues.location,
//   convertedValues.gateway_name,
//   convertedValues.gateway_mac
// ];
// await client.query(updateQuery, updateValues);
//       return { status : 409, message: "Gateway Already Exist" };
//     }
//   } catch (error) {
//     throw { message: "Error finding gateway_info with gateway_mac :", error };
//   }
// };

const insertGatewayInfo = async (gateway) => {
  try {
    // Convert gateway values to the appropriate format
    const convertedValues = {
      gateway_mac: gateway.gateway_mac,
      assigned_node: gateway.assigned_node ? parseInt(gateway.assigned_node) : null,
      online_node: gateway.online_node ? parseInt(gateway.online_node) : null, // Convert to integer
      offline_node: gateway.offline_node ? parseInt(gateway.offline_node) : null, // Convert to integer
      status: gateway.status ? parseInt(gateway.status) : null, // Convert status to integer
      location: gateway.location,
      gateway_name: gateway.gateway_name,
      gateway_name_jp : gateway?.gateway_name_jp,
      location_jp : gateway?.gateway_location_jp
    };

    // Check if gateway already exists
    const gatewayExists = await findGatewayByMac(gateway.gateway_mac);

    if (!gatewayExists) {
      // If not found, insert a new gateway
      const insertQuery = `
        INSERT INTO gateway_info
          (gateway_mac, assigned_node, online_node, offline_node, status, location, gateway_name,gateway_name_jp,gateway_location_jp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      const insertValues = [
        convertedValues.gateway_mac,
        convertedValues.assigned_node,
        convertedValues.online_node,
        convertedValues.offline_node,
        convertedValues.status,
        convertedValues.location,
        convertedValues.gateway_name,
        convertedValues.gateway_name_jp,
        convertedValues.gateway_location_jp
      ];

      try {
        await con.query(insertQuery, insertValues);
        return { status: 201, message: "New Gateway Added" };
      } catch (insertError) {
        // Log the error and throw it to be caught in the outer try-catch block
        throw {
          message: `Error inserting gateway_info with gateway_mac: ${gateway.gateway_mac}`,
          error: insertError,
        };
      }
    } else {
      // If gateway exists, update the existing record
      // const updateQuery = `
      //   UPDATE gateway_info
      //   SET 
      //     assigned_node = $1,
      //     online_node = $2,
      //     offline_node = $3,
      //     status = $4,
      //     location = $5,
      //     gateway_name = $6,
      //     gateway_name_jp = $8,
      //     gateway_location_jp = $9
      //   WHERE gateway_mac = $7
      // `;

      const updateQuery = `
      UPDATE gateway_info
      SET 
        assigned_node = $1,
        online_node = $2,
        offline_node = $3,
        status = $4,
        location = $5,
        gateway_name = $6,
        gateway_name_jp = $7, -- Corrected position
        gateway_location_jp = $8 -- Corrected position
      WHERE gateway_mac = $9 -- Corrected position
  `;

      // const updateValues = [
      //   convertedValues.assigned_node,
      //   convertedValues.online_node,
      //   convertedValues.offline_node,
      //   convertedValues.status,
      //   convertedValues.location,
      //   convertedValues.gateway_name,
      //   convertedValues.gateway_mac,
      //   convertedValues.gateway_name_jp,
      //   convertedValues.gateway_location_jp
      // ];
      const updateValues = [
        convertedValues.assigned_node,         // $1
        convertedValues.online_node,           // $2
        convertedValues.offline_node,          // $3
        convertedValues.status,                 // $4
        convertedValues.location,               // $5
        convertedValues.gateway_name,           // $6
        convertedValues.gateway_name_jp,       // $7
        convertedValues.gateway_location_jp,    // $8
        convertedValues.gateway_mac             // $9
    ];
    

      try {
        console.log("hello agteway update");
        
        await con.query(updateQuery, updateValues);
        console.log(" update");
        return { status: 200, message: "Gateway Updated Successfully" };
      } catch (updateError) {
        throw {
          message: `Error updating gateway_info with gateway_mac: ${error}`,
          error: updateError,
        };
      }
    }
  } catch (error) {
    // Catch any errors that occur during the find or insert/update process
    throw {
      message: `Error processing gateway_info with gateway_mac: ${gateway.gateway_mac}`,
      error,
    };
  }
};


module.exports = {
  insertGatewayInfo,
  findGatewayByMac,
};
