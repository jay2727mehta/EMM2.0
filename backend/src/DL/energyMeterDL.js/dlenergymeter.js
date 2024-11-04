const { Timestamp } = require("typeorm");
const client = require("../../DL/databaseCon");
const { format, parse } = require("date-fns");
const { log } = require("winston");

const getEnergyDistribution = async () => {
  try {
    const queryDay = `
      SELECT *
      FROM public.energy_consumed
      WHERE timestamp >= CURRENT_DATE
      ORDER BY timestamp DESC;
    `;
    
    const result = await client.query(queryDay);
    
    if (result.rows.length > 0) {
      // Assuming you want to divide each row's data by 1000
      const data = result.rows.map(row => ({
        ...row,
        energy: row.energy / 1000
      }));
      return { status: 200, data: data };
    } else {
      return { status: 404, error: "No data found" };
    }
  } catch (error) {
    console.error("Error fetching the Energy Distribution from DL:", error.message);
    return { status: 500, error: "Internal server error" };
  }
};

const getAdminLiftCurrentData = async () => {
  try {
    const query = `
      WITH daily_values AS (
        SELECT
          date_trunc('day', timestamp) AS day,
          u59,
          timestamp,
          row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp ASC) AS rn_asc,
          row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp DESC) AS rn_desc
        FROM public.admin_lift_panel
        WHERE timestamp >= CURRENT_DATE
      )
      SELECT
        MAX(CASE WHEN rn_desc = 1 THEN u59 END) - MAX(CASE WHEN rn_asc = 1 THEN u59 END) AS admin_lift_current
      FROM daily_values
      GROUP BY day
      ORDER BY day DESC;
    `;
    
    const { rows } = await client.query(query);
    
    return rows.length > 0 
      ? { status: 200, data: rows } 
      : { status: 404, error: "No data found" };
      
  } catch (error) {
    console.error("Error fetching the Admin Lift Current Data from DL:", error);
    return { status: 500, error: "Internal server error" };
  }
};

const getOperationLiftCurrentData = async () => {
  const query = `
    WITH daily_values AS (
      SELECT
        date_trunc('day', timestamp) AS day,
        u59,
        timestamp,
        row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp ASC) AS rn_asc,
        row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp DESC) AS rn_desc
      FROM public.operation_block_lift_panel
      WHERE timestamp >= CURRENT_DATE
    )
    SELECT
      MAX(CASE WHEN rn_desc = 1 THEN u59 END) - MAX(CASE WHEN rn_asc = 1 THEN u59 END) AS admin_lift_current
    FROM daily_values
    GROUP BY day
    ORDER BY day DESC;
  `;

  try {
    const result = await client.query(query);

    if (result.rows.length > 0) {
      return { status: 200, data: result.rows };
    } else {
      return { status: 404, error: "No data found" };
    }
  } catch (error) {
    console.error("Error fetching the Operations Lift from DL:", error.message);
    return { status: 500, error: "Internal server error" };
  }
};

const getHVACOPTWOCurrentData = async () => {
  try {
    const query = `
      WITH daily_values AS (
        SELECT
            date_trunc('day', timestamp) AS day,
            u59,
            row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp ASC) AS rn_asc,
            row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp DESC) AS rn_desc
        FROM public.hvac_odu_panel_op_two
        WHERE timestamp >= CURRENT_DATE
      )
      SELECT
          MAX(CASE WHEN rn_desc = 1 THEN u59 END) - MAX(CASE WHEN rn_asc = 1 THEN u59 END) AS admin_lift_current
      FROM daily_values
      GROUP BY day
      ORDER BY day DESC;
    `;

    const result = await client.query(query);
    const data = result.rows;

    if (data.length > 0) {
      return { status: 200, data: data };
    } else {
      return { status: 404, error: "No data found" };
    }
  } catch (error) {
    console.error("Error fetching the HVACOPTWO current data from DL:", error);
    return { status: 500, error: "Internal server error" };
  }
};

const getLightingHVACSUBCurrentData = async () => {
  try {
    const query = `
      WITH daily_values AS (
        SELECT
          date_trunc('day', timestamp) AS day,
          u59,
          timestamp,
          row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp ASC) AS rn_asc,
          row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp DESC) AS rn_desc
        FROM public.lighting_hvac_sub_panel
        WHERE timestamp >= CURRENT_DATE
      )
      SELECT
        MAX(CASE WHEN rn_desc = 1 THEN u59 END) - MAX(CASE WHEN rn_asc = 1 THEN u59 END) AS admin_lift_current
      FROM daily_values
      GROUP BY day
      ORDER BY day DESC;
    `;
    
    const result = await client.query(query);
    const data = result.rows;
    
    if (data.length > 0) {
      return { status: 200, data };
    } else {
      return { status: 404, error: "No data found" };
    }
  } catch (error) {
    console.error("Error fetching the Lighting HVAC Sub current data: ", error.message);
    return { status: 500, error: "Internal server error" };
  }
};

const getWaterPumpCurrentData = async () => {
  try {
    const query = `
      WITH daily_values AS (
        SELECT
          date_trunc('day', timestamp) AS day,
          u59,
          timestamp,
          row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp ASC) AS rn_asc,
          row_number() OVER (PARTITION BY date_trunc('day', timestamp) ORDER BY timestamp DESC) AS rn_desc
        FROM public.common_block_phe_panel
        WHERE timestamp >= CURRENT_DATE
      )
      
      SELECT
        MAX(CASE WHEN rn_desc = 1 THEN u59 END) - MAX(CASE WHEN rn_asc = 1 THEN u59 END) AS admin_lift_current
      FROM daily_values
      GROUP BY day
      ORDER BY day DESC
      LIMIT 1;  -- Limit to retrieve only one row since we're interested in the latest day
    `;
    
    const result = await client.query(query);
    
    if (result.rows.length > 0) {
      return { status: 200, data: result.rows[0].admin_lift_current };
    } else {
      return { status: 404, error: "No data found" };
    }
  } catch (error) {
    console.error("Error fetching the water pump current data:", error.message);
    return { status: 500, error: "Internal server error" };
  }
};

const getenergydatadynamicupdated = async (range, table) => {
  try {
    let query;
    if (range === "day") {
      query = `SELECT DISTINCT ON (DATE(timestamp)) *, timestamp FROM public.${table} WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days' ORDER BY DATE(timestamp), timestamp DESC`;
    } else if (range === "week") {
      query = `SELECT DISTINCT ON (EXTRACT(WEEK FROM timestamp)) *, timestamp FROM public.${table} WHERE timestamp >= CURRENT_DATE - INTERVAL '35 days' ORDER BY EXTRACT(WEEK FROM timestamp), timestamp DESC`;
    } else if (range === "month") {
      query = `SELECT DISTINCT ON (EXTRACT(MONTH FROM timestamp)) *, timestamp FROM public.${table} WHERE timestamp >= CURRENT_DATE - INTERVAL '6 months' ORDER BY EXTRACT(MONTH FROM timestamp), timestamp DESC`;
    }

    const result = await client.query(query);

    const formattedData = result.rows.map((item) => ({
      MainMeter:
        (item.lt_main_abs + item.main_lt_phe_db_abs + item.admin_main_abs) /
        1000,
      date: new Date(item.timestamp).toLocaleDateString("en-US"),
    }));

    const absoluteData = formattedData.map((item, index) => ({
      ...item,
      date: format(parse(item.date, "M/d/yyyy", new Date()), "d MMM"),
    }));

    return { range, datarange: absoluteData };
  } catch (error) {
    console.error(
      "Error fetching energy data dynamic updated from from DL : ",
      error.message
    );
    throw new Error("Error fetching data from the database: " + error.message);
  }
};

// const getenergydatadynamic = async (range, table) => {
//   try {
    
//     const queryHour = `SELECT DISTINCT ON (DATE_TRUNC('hour', timestamp))
// COALESCE(${table.energy}, 0) AS u59, timestamp
// FROM public.${table.dbTable}
// WHERE timestamp >= NOW() - INTERVAL '5 hours'
// ORDER BY DATE_TRUNC('hour', timestamp), timestamp DESC;`;

//     const queryMonth = `SELECT DISTINCT ON (EXTRACT(MONTH FROM timestamp))
// COALESCE(${table.energy}, 0) AS u59, timestamp
// FROM public.${table.dbTable}
// WHERE timestamp >= CURRENT_DATE - INTERVAL '6 months'
// ORDER BY EXTRACT(MONTH FROM timestamp), timestamp DESC;`;

//     const queryWeek = `SELECT DISTINCT ON (EXTRACT(WEEK FROM timestamp))
// COALESCE(${table.energy}, 0) AS u59, timestamp
// FROM public.${table.dbTable}
// WHERE timestamp >= CURRENT_DATE - INTERVAL '35 days'
// ORDER BY EXTRACT(WEEK FROM timestamp), timestamp DESC;`;

//     const queryDay = `
//   SELECT DISTINCT ON (DATE(timestamp))
//   ${table.energy} AS u59  , timestamp
//   FROM public.${table.dbTable}
//   WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
//   ORDER BY DATE(timestamp), timestamp DESC;
// `;

//     let query;
//     let data;
//     if (range === "day") {
//       const result = await client.query(queryDay);

//       data = {
//         range: "day",
//         datadg: result.rows,
//       };

//       const formattedData = data.datadg.map((item) => ({
//         u59: item.u59,
//         date: new Date(item.timestamp).toLocaleDateString(),
//       }));

//       const absoluteData = formattedData.map((item, index) => ({
//         u59: index === 0 ? item.u59 : item.u59 - formattedData[index - 1].u59,
//         date: format(parse(item.date, "d/M/yyyy", new Date()), "d MMM"),
//       }));

//       const modifiedData = absoluteData.map((item) => ({
//         ...item,
//         u59: item.u59 / 1000,
//       }));
//       const formattedDataRange = {
//         range: "day",
//         datarange: modifiedData,
//       };

//       return formattedDataRange;
//     } else if (range === "week") {
//       const result = await client.query(queryWeek);

//       data = {
//         range: "week",
//         datadg: result.rows,
//       };

//       const formattedData = data.datadg.map((item) => ({
//         u59: item.u59 / 1000,
//         date: new Date(item.timestamp).toLocaleDateString(),
//       }));

//       const absoluteData = formattedData.map((item, index) => ({
//         u59: index === 0 ? item.u59 : item.u59 - formattedData[index - 1].u59,
//         date: format(parse(item.date, "d/M/yyyy", new Date()), "d MMM"),
//       }));

//       function addDays(date, days) {
//         const result = new Date(date);
//         result.setDate(result.getDate() + days);
//         const date11 = new Date(result).toLocaleDateString();
//         const date22 = format(parse(date11, "d/M/yyyy", new Date()), "d MMM");
//         return date22;
//       }
//       const absoluteDataweek = formattedData.map((item, index) => {
//         const u59 =
//           index === 0 ? item.u59 : item.u59 - formattedData[index - 1].u59;
//         const startDate = format(
//           parse(item.date, "d/M/yyyy", new Date()),
//           "d MMM"
//         );
//         const endDate = addDays(startDate, 6);
//         const endDateIndex =
//           index + 6 < formattedData.length
//             ? index + 6
//             : formattedData.length - 1; // Calculate end date index
//         const weekRange = `${startDate}-${endDate}`;

//         return {
//           u59,
//           date: weekRange,
//         };
//       });
//       //removing last data
//       absoluteDataweek.pop();

//       const formattedDataRange = {
//         range: "week",
//         datarange: absoluteDataweek,
//       };

//       return formattedDataRange;
//     } else if (range === "month") {
//       const result = await client.query(queryMonth);

//       data = {
//         range: "month",
//         datadg: result.rows,
//       };

//       const formattedData = data.datadg.map((item) => ({
//         u59: item.u59,
//         date: new Date(item.timestamp).toLocaleDateString(),
//       }));

//       const absoluteData = formattedData.map((item, index) => ({
//         u59: index === 0 ? item.u59 : item.u59 - formattedData[index - 1].u59,
//         date: format(parse(item.date, "d/M/yyyy", new Date()), "d MMM"),
//       }));

//       const modifiedData = absoluteData.map((item) => ({
//         ...item,
//         u59: item.u59 / 1000,
//       }));

//       const formattedDataRange = {
//         range: "month",
//         datarange: modifiedData,
//       };


//       return formattedDataRange;
//     }
//   } catch (error) {
//     console.error(
//       `Error fetching dynamic data from table ${table} from DL : `,
//       error.message
//     );
//     //throw error;
//   }
// };


const getenergydatadynamic = async (range, table) => {
  try {
   
   
    
    const queryHour = `SELECT DISTINCT ON (DATE_TRUNC('hour', timestamp))
                        COALESCE(${table.energy}, 0) AS u59, timestamp
                        FROM public.${table.dbTable}
                        WHERE timestamp >= NOW() - INTERVAL '5 hours'
                        ORDER BY DATE_TRUNC('hour', timestamp), timestamp DESC;`;

    const queryMonth = `SELECT DISTINCT ON (EXTRACT(MONTH FROM timestamp))
                         COALESCE(${table.energy}, 0) AS u59, timestamp
                         FROM public.${table.dbTable}
                         WHERE timestamp >= CURRENT_DATE - INTERVAL '6 months'
                         ORDER BY EXTRACT(MONTH FROM timestamp), timestamp DESC;`;

    const queryWeek = `SELECT DISTINCT ON (EXTRACT(WEEK FROM timestamp))
                        COALESCE(${table.energy}, 0) AS u59, timestamp
                        FROM public.${table.dbTable}
                        WHERE timestamp >= CURRENT_DATE - INTERVAL '35 days'
                        ORDER BY EXTRACT(WEEK FROM timestamp), timestamp DESC;`;

    const queryDay = `SELECT DISTINCT ON (DATE(timestamp))
                       ${table.energy} AS u59,  timestamp
                       FROM public.${table.dbTable}
                       WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
                       ORDER BY DATE(timestamp), timestamp DESC;`;

                      //  const queryDay = `SELECT DISTINCT ON (DATE(timestamp))
                      //  ${table.energy} AS u59,  timestamp
                      //  FROM public.${table.dbTable}
                      //  WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
                      //  ORDER BY DATE(timestamp), timestamp DESC;`;                  
    let data;
    let result;

    switch (range) {
      case "day":
        result = await client.query(queryDay);
        data = {
          range: "day",
          datadg: result.rows,
        };
        break;

      case "week":
        
        result = await client.query(queryWeek);
      
        
        data = {
          range: "week",
          datadg: result.rows,
        };
        break;

      case "month":
        result = await client.query(queryMonth);
        data = {
          range: "month",
          datadg: result.rows,
        };
        // console.log(data,"in month");
        
        break;

      default:
        throw new Error("Invalid range provided.");
    }
    const formattedData = data.datadg.map(item => ({
      u59: item.u59,
      date: new Date(item.timestamp).toLocaleDateString(),
    }));
  
    //console.log(formattedData,"formated data energy");
    

    // const absoluteData = formattedData.map((item, index) => ({
    //   u59: index === 0 ? item.u59 : item.u59 - formattedData[index - 1].u59,
    //   date: format(parse(item.date, "d/M/yyyy", new Date()), "d MMM"),
    // }));

    // Check if formattedData is not empty before mapping
  
  
const absoluteData = formattedData.length > 0 ? formattedData.map((item, index) => {
  // Calculate the difference for u59
  const u59Difference = index === 0 ? item.u59 : item.u59 - formattedData[index - 1].u59;
  
  
  // Parse and format the date
  const formattedDate = format(parse(item.date, "M/d/yyyy", new Date()), "d MMM");

  return {
    u59: u59Difference,
    date: formattedDate,
  };
}) : [];

// console.log(absoluteData, "absolute data energy");


  


    // if (range === "week") {
    //   const addDays = (date, days) => {
    //     const result = new Date(date);
    //     result.setDate(result.getDate() + days);
    //     return format(parse(result.toLocaleDateString(), "d/M/yyyy", new Date()), "d MMM");
    //   };

    //   transformedData = absoluteData.map((item, index) => {
    //     const u59 = index === 0 ? item.u59 : item.u59 - absoluteData[index - 1].u59;
    //     const startDate = format(parse(item.date, "d/M/yyyy", new Date()), "d MMM");
    //     const endDate = addDays(startDate, 6);
    //     const weekRange = `${startDate}-${endDate}`;
    //     return { u59, date: weekRange };
    //   });
    //   // Remove the last data point for the week range
    //   transformedData.pop();

    // } else {
    //   transformedData = absoluteData;
    // }

    // const resultEnergy = absoluteData.reduce((acc, { u59, date }) => {
    //   acc.u59.push(u59);
    //   acc.date.push(date);
    //   return acc;
    // }, { u59: [], date: [] });
    let resultEnergy
if(range!='month'){
  resultEnergy= absoluteData.reduce((acc, { u59, date }, index) => {
    if (index > 0) {  // Skip the first element
      acc.meter_reading.push(u59);
      acc.timestamp.push(date);
    }
    return acc;
  }, { meter_reading: [], timestamp: [] });
}
  resultEnergy = absoluteData.reduce((acc, { u59, date }, index) => {
   
      acc.meter_reading.push(u59);
      acc.timestamp.push(date);
 
    
    return acc;
  }, { meter_reading: [], timestamp: [] });
  return {
    range,
    // datarange: transformedData,
    resultEnergy
  };

  } catch (error) {
    console.error(`Error fetching dynamic data from table ${table.dbTable}: `, error.message);
    throw error; // Propagate error up the call stack
  }
};


const gettotaldata = async (table) => {
  try {
    if (table === "ev_charging_station") {
      return "hello";
    } else {
      const queryTdata = `select u1,u33,u49,u57,u17,u59,u9,u25 from ${table}
  WHERE timestamp = (
      SELECT MAX(timestamp)
      FROM ${table})`;

      const result = await client.query(queryTdata);
      const Tdata = result.rows[0];

      const objData = {
        voltage: Tdata.u33,
        current: Tdata.u49,
        frequency: Tdata.u57,
        Power_factor: Tdata.u17,
        Energy_consume: Math.floor(Tdata.u59 / 1000000),
        Reactive_power: Tdata.u9,
        total_Power: Tdata.u1,
        apparent_power: Tdata.u25,
      };

      return objData;
    }
  } catch (error) {
    console.error(`Error fetching total data from DL: `, error.message);
  }
};

const get10mindataCommon = async (range, table) => {
  try {
    const queries = {
      day: [
        `SELECT EXTRACT(HOUR FROM timestamp) AS hour,
        AVG(${table.power}) AS avg_u1,
        AVG(u9) AS avg_u9,
        AVG(u25) AS avg_u25
        FROM public.lt_main_
        WHERE DATE(timestamp) = CURRENT_DATE
        GROUP BY EXTRACT(HOUR FROM timestamp);`,

        `SELECT EXTRACT(HOUR FROM timestamp) AS hour,
        AVG(${table.power}) AS avg_u1,
        AVG(u9) AS avg_u9,
        AVG(u25) AS avg_u25
        FROM public.main_lt_phe_db
        WHERE DATE(timestamp) = CURRENT_DATE
        GROUP BY EXTRACT(HOUR FROM timestamp);`,

        `SELECT EXTRACT(HOUR FROM timestamp) AS hour,
        AVG(${table.power}) AS avg_u1,
        AVG(u9) AS avg_u9,
        AVG(u25) AS avg_u25
        FROM public.admin_block_lt_panel
        WHERE DATE(timestamp) = CURRENT_DATE
        GROUP BY EXTRACT(HOUR FROM timestamp);`,
      ],
      week: `SELECT DATE(timestamp) AS day,
        AVG(${table.power}) AS avg_u1,
        AVG(u9) AS avg_u9,
        AVG(u25) AS avg_u25
        FROM public.${table.dbTable}
        WHERE timestamp >= CURRENT_DATE - INTERVAL '7 days' 
        AND timestamp < CURRENT_DATE
        GROUP BY DATE(timestamp)
        ORDER BY day;`,
      month: `SELECT DATE_TRUNC('day', timestamp) AS day,
        AVG(${table.power}) AS avg_u1,
        AVG(u9) AS avg_u9,
        AVG(u25) AS avg_u25
        FROM public.${table.dbTable}
        WHERE EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE)
        GROUP BY DATE_TRUNC('day', timestamp);`,
    };

    let data;

    if (range === "day") {
      const results = await Promise.all(
        queries.day.map(query => client.query(query))
      );

      const resultData = results.map(result => result.rows);

      const combinedData = [];

      for (let i = 0; i < resultData[0].length; i++) {
        const hour = resultData[0][i].hour;
        const obj1 = resultData[0][i];
        const obj2 = resultData[1].find(o => o.hour === hour);
        const obj3 = resultData[2].find(o => o.hour === hour);

        if (obj2 && obj3) {
          const sumobj = {
            date: `${hour}:00`,
            Apower: (obj1.avg_u1 + obj2.avg_u1 + obj3.avg_u1) / 1000,
            Rpower: obj1.avg_u9 + obj2.avg_u9 + obj3.avg_u9,
            ApPower: obj1.avg_u25 + obj2.avg_u25 + obj3.avg_u25
          };
          combinedData.push(sumobj);
        } else {
          console.log("Mismatch hour");
        }
      }

      data = {
        range: "day",
        datarange: combinedData
      };
    } else {
      const result = await client.query(queries[range]);

      data = {
        range: range,
        datarange: result.rows.map(item => ({
          Apower: range === "week" ? item.avg_u1 / 1000 : item.avg_u1 / 100,
          Rpower: item.avg_u9,
          ApPower: item.avg_u25,
          date: new Date(item.day).toLocaleDateString()
        }))
      };
    }

    return data;
  } catch (error) {
    console.error(
      `Error fetching 10min common data ${table} from DL : `,
      error.message
    );
    throw error;
  }
};

const get10mindata = async (range, table) => {
  try {
  

    const queryDay = `SELECT EXTRACT(HOUR FROM timestamp) AS interval_start,
                      AVG(${table.parameter}) AS avg_reading
                      FROM public.${table.dbTable}
                      WHERE timestamp >= CURRENT_DATE AND timestamp < CURRENT_DATE + INTERVAL '1 day'
                      GROUP BY EXTRACT(HOUR FROM timestamp);`;
    //const queryDay=`SELECT 
                  //   timestamp,
                  //   date_trunc('hour', timestamp) + 
                  //     (date_part('minute', timestamp)::int / 30)::int * interval '30 min' AS interval_start,
                  //   AVG(${table.parameter}) AS avg_reading
                  // FROM 
                  //   public.${table.dbTable}
                  // WHERE 
                  //   timestamp >= CURRENT_DATE AND timestamp < CURRENT_DATE + INTERVAL '1 day'
                  // GROUP BY 
                  //   1, interval_start
                  // ORDER BY 
                  //   interval_start DESC;
                  // `




    const queryWeek = `SELECT DATE(timestamp) AS day,
                       AVG(${table.parameter}) AS avg_u1
                       FROM public.${table.dbTable}
                       WHERE timestamp >= CURRENT_DATE - INTERVAL '7 days' 
                       AND timestamp < CURRENT_DATE
                       GROUP BY DATE(timestamp)
                       ORDER BY day;`;

    const queryMonth = `SELECT DATE_TRUNC('day', timestamp) AS day,
                        AVG(${table.parameter}) AS avg_u1
                        FROM public.${table.dbTable}
                        WHERE EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE)
                        GROUP BY DATE_TRUNC('day', timestamp);`;

    let data;




    switch (range) {
      case "day":
        const resultDay = await client.query(queryDay);
        
        
        
        // data = {
        //   range: "day",
        //   // datarange: resultDay.rows.map(item => ({
        //   //   Apower: item.avg_u1 ,
        //   //   date: `${item.interval_start}`,
        //   // })),
        //    datarange : resultDay.rows.map(item => {
        //     return {
        //       Apower: item.avg_u1,
        //       date: resultDay.rows.map((item) =>
        //                 new Date(item.avg_u1).toLocaleTimeString([], {
        //                 hour: "2-digit",
        //                 minute: "2-digit"})
        //                 )};
        //   })
        // };
        data = {
          range: "day",
          datarange: resultDay.rows.map(item => {
            return {
              Apower: item.avg_reading/1000,
              date: item.interval_start
            };
          })
        };
        break;
      case "week":
        const resultWeek = await client.query(queryWeek);
        data = {
          range: "week",
          datarange: resultWeek.rows.map(item => ({
            Apower: item.avg_u1 ,
            date: new Date(item.day).toLocaleDateString(),
          })),
        };
        break;
      case "month":
        const resultMonth = await client.query(queryMonth);
        data = {
          range: "month",
          datarange: resultMonth.rows.map(item => ({
            Apower: item.avg_u1 ,
            date: new Date(item.day).toLocaleDateString(),
          })),
        };
        break;
      default:
        throw new Error("Invalid range provided.");
    }

    const result = data.datarange.reduce((acc, { Apower, date }) => {
      acc.meter_reading.push(Apower);
      acc.timestamp.push(`${date}hr`)
      return acc;
  }, { meter_reading: [], timestamp: [] });



  
    return result

    
  
  } catch (error) {
    console.error(`Error fetching data from ${table.dbTable}: `, error.message);
    throw error; // Propagate error up the call stack
  }
};

const processData = (data) => {
  // Use reduce to accumulate totals by date
  const result = data.reduce((acc, item) => {
    // Extract the date from the timestamp and format it
    const dateString = new Date(item.timestamp).toISOString().split("T")[0];

    // Initialize totals object if not exists for the date
    acc[dateString] = acc[dateString] || {
      totalLift: 0,
      totalEmergencyLighting: 0,
      totalHVAC: 0,
      totalMain: 0,
      totalPHE: 0,
    };

    // Add values to corresponding totals
    acc[dateString].totalLift += (item.admin_lift_abs || 0) + (item.operations_lift_abs || 0);
    acc[dateString].totalEmergencyLighting += (item.admin_emergency_lighting_abs || 0) + (item.emergency_lighting_abs || 0);
    acc[dateString].totalHVAC += (item.hvac_odu_op_two_abs || 0) + (item.hvac_lighting_sub_abs || 0);
    acc[dateString].totalMain += (item.lt_main_abs || 0) + (item.main_lt_phe_db_abs || 0);
    acc[dateString].totalPHE += item.common_phe_abs || 0;

    return acc;
  }, {});

  // Convert result object into array of objects
  const processedData = Object.entries(result).map(([date, totals]) => ({
    date,
    ...totals,
  }));

  return processedData;
};

const processLoadDistribution = (data) => {
  const {
    admin_lift_abs,
    operation_lift_abs,
    admin_emergency_lighting_abs,
    emergency_lighting_abs,
    hvac_odu_op_two_abs,
    hvac_lighting_sub_abs,
    lt_main_abs,
    main_lt_phe_db_abs,
    common_phe_abs,
  } = data;

  const result = {
    totalLift: admin_lift_abs + operation_lift_abs,
    totalEmergencyLighting: admin_emergency_lighting_abs + emergency_lighting_abs,
    totalHVAC: hvac_odu_op_two_abs + hvac_lighting_sub_abs,
    totalMain: lt_main_abs + main_lt_phe_db_abs,
    totalPHE: common_phe_abs,
  };

  return result;
};

const getTotalEnergydistributionLoad = async (table, range) => {
  try {
    const query = `SELECT DATE(timestamp) AS date,
    SUM(admin_lift_abs) AS total_admin_lift_abs
FROM public.energy_consumed
WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp) DESC`;

    const queryComplete = `
SELECT DISTINCT ON (DATE(timestamp))
*
FROM public.energy_consumed
WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
ORDER BY DATE(timestamp), timestamp DESC;
`;

    const result = await client.query(queryComplete);

    const totalData = result.rows;

    const processdata = processData(totalData);

    // const formattedData = processdata.map(item => ([item.date,item.totalLift/1000,item.totalHVAC/1000,item.totalEmergencyLighting/1000,item.totalPHE/1000]));
    const formattedData = processdata.map((item) => {
      // Convert the item.date to a Date object
      let date = new Date(item.date);
      // Format the date as desired (e.g., "1 Jan")
      let formattedDate = format(date, "d MMM");
      // Return the formatted date along with other values
      return [
        formattedDate,
        item.totalLift / 1000,
        item.totalHVAC / 1000,
        item.totalEmergencyLighting / 1000,
        item.totalPHE / 1000,
      ];
    });

    return formattedData;
  } catch (error) {
    console.error(
      "Error fetching total energy distributed data from DL :",
      error.message
    );
    //throw error;
  }
};

const getLoadDistribution = async () => {
  try {
    const query = `
      SELECT 
        AVG(admin_lift) AS total_lift,
        AVG(operations_lift) AS total_operations_lift,
        AVG(director_block) AS total_director_block,
        AVG(emergency_lighting) AS total_emergency_lighting,
        AVG(hvac_odu_op_two) AS total_hvac_odu_op_two,
        AVG(hvac_lighting_sub) AS total_hvac_lighting_sub,
        AVG(lt_main) AS total_lt_main,
        AVG(main_lt_phe_db) AS total_main_lt_phe_db,
        AVG(common_phe) AS total_common_phe,
        AVG(admin_lift_abs) AS total_admin_lift_abs,
        AVG(operations_lift_abs) AS total_operations_lift_abs,
        AVG(director_block_abs) AS total_director_block_abs,
        AVG(admin_emergency_lighting_abs) AS total_admin_emergency_lighting_abs,
        AVG(emergency_lighting_abs) AS total_emergency_lighting_abs,
        AVG(hvac_odu_op_two_abs) AS total_hvac_odu_op_two_abs,
        AVG(hvac_lighting_sub_abs) AS total_hvac_lighting_sub_abs,
        AVG(lt_main_abs) AS total_lt_main_abs,
        AVG(main_lt_phe_db_abs) AS total_main_lt_phe_db_abs,
        AVG(common_phe_abs) AS total_common_phe_abs,
        AVG(admin_ac) AS total_admin_ac,
        AVG(admin_ac_abs) AS total_admin_ac_abs,
        AVG(admin_main) AS total_admin_main,
        AVG(admin_main_abs) AS total_admin_main_abs,
        AVG(hvac_odu_op_one) AS total_hvac_odu_op_one,
        AVG(hvac_odu_op_one_abs) AS total_hvac_odu_op_one_abs
      FROM public.energy_consumed`;

    const { rows } = await client.query(query);

    if (rows.length === 0) {
      throw new Error('No data found for energy consumption');
    }

    const formattedData = {
      totalLift: rows[0].total_lift / 1000,
      totalHVAC: rows[0].total_hvac_odu_op_two / 1000,
      totalEmergencyLighting: rows[0].total_emergency_lighting / 1000,
      totalPHE: rows[0].total_common_phe / 1000,
    };

    return formattedData;
  } catch (error) {
    console.error('Error fetching load distribution data:', error.message);
    throw error;
  }
};

const getStepAreagraphSpe = async () => {
  try {
    const queryComplete = `
    SELECT DISTINCT ON (DATE(timestamp))
    *
    FROM public.energy_consumed
    WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
    ORDER BY DATE(timestamp), timestamp DESC;
  `;

    const result = await client.query(queryComplete);

    return result.rows;
  } catch (error) {
    console.error(
      "Error fetching step area chart data from DL :",
      error.message
    );
    //throw error;
  }
};

const downloadexcelsheet = async () => {
  try {
    const queryComplete = `
    SELECT DISTINCT ON (DATE(timestamp))
    *
    FROM public.energy_consumed
    WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
    ORDER BY DATE(timestamp), timestamp DESC;
  `;

    const result = await client.query(queryComplete);

    return result.rows;
  } catch (error) {
    console.error(
      "Error in download excel sheet data from DL :",
      error.message
    );
    throw error;
  }
};

module.exports = {
  getStepAreagraphSpe,
  downloadexcelsheet,
  get10mindataCommon,
  getEnergyDistribution,
  getenergydatadynamic,
  gettotaldata,
  get10mindata,
  getTotalEnergydistributionLoad,
  getenergydatadynamicupdated,
  getAdminLiftCurrentData,
  getOperationLiftCurrentData,
  getHVACOPTWOCurrentData,
  getLightingHVACSUBCurrentData,
  getWaterPumpCurrentData,
  getLoadDistribution,
};
