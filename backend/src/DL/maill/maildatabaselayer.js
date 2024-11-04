const client = require("../databaseCon");
const dateservice = require("../../BL/dateprocess");

// const getAllPrevAbsData = async (date) => {
//   try {
//     const query = `
//         SELECT 
//           admin_lift_abs,
//           operations_lift_abs,
//           director_block_abs,
//           admin_emergency_lighting_abs,
//           emergency_lighting_abs,
//           hvac_odu_op_two_abs,
//           hvac_lighting_sub_abs,
//           lt_main_abs,
//           main_lt_phe_db_abs,
//           common_phe_abs,
//           admin_ac_abs,
//           admin_main_abs,
//           hvac_odu_op_one_abs
//         FROM energy_consumed
//         WHERE DATE(timestamp) = $1;`; // Using $1 as a placeholder for the parameter

//     const result = await client.query(query, [date]);
//     const data = result.rows; // Pass date as parameter
//     const formattedData = data.map((item) => ({
//       data: item,
//     }));
//     return formattedData;
//   } catch (error) {
//     console.error("Error fetching data from DL :", error.message);
//     throw error;
//   }
// };

const getEmailLog = async () => {
  try {
    const query =
      "SELECT * FROM public.email_log ORDER BY timestamp DESC LIMIT 1";
    const result = await client.query(query);
    const data = result.rows;
    const formattedData = data.map((item) => ({
      email: item.email,
      timestamp: item.timestamp,
      msebPower: item.mseb_power,
    }));
    return formattedData;
  } catch (error) {
    console.error("Error fetching data from DL :", error.message);
    throw error;
  }
};

const getlastNodestatus = async () => {
  try {
    const query = `SELECT * FROM public.email_log WHERE parameter IS NOT NULL ORDER BY timestamp DESC LIMIT 1;`;
    const result = await client.query(query);
    const data = result.rows;
    const formattedData = data.map((item) => ({
      email: item.email,
      timestamp: item.timestamp,
      msebPower: item.mseb_power,
      parameter: item.parameter,
    }));
    return formattedData;
  } catch (error) {
    console.error("Error fetching data from DL :", error.message);
    throw error;
  }
};

const createEmailLog = async (email, msebPower) => {
  try {
    const currentTimeUTC = dateservice.formatDateTime(new Date());
    if (msebPower === "nodes") {
      const query =
        "INSERT INTO public.email_log(email, timestamp, parameter) VALUES ($1, $2, $3)";
      const result = await client.query(query, [
        email,
        currentTimeUTC,
        "nodes",
      ]);
      if (result.rowCount > 0) {
        return "Log Created Successfully";
      } else {
        return "Log Creation Failed";
      }
    }
    //const currentTimeUTC = dateservice.formatDateTime(new Date()) // Format timestamp as string
    const power = parseInt(msebPower);
    const query =
      "INSERT INTO public.email_log(email, timestamp, mseb_power) VALUES ($1, $2, $3)";

    const result = await client.query(query, [email, currentTimeUTC, power]);

    if (result.rowCount > 0) {
      return "Log Created Successfully";
    } else {
      return "Log Creation Failed";
    }
  } catch (error) {
    console.error("Error creating email log from DL :", error.message);
    throw error;
  }
};

module.exports = {
  //getAllPrevAbsData,
  createEmailLog,
  getEmailLog,
  getlastNodestatus,
};
