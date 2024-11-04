const { Timestamp } = require("typeorm");
const client = require("../../DL/databaseCon");
const { format, parse } = require("date-fns");

const getDeviceInfoIndivisualDeviceCurrent = async (range, table) => {
  try {
    let data;
    const today = new Date();
    const limit = today.getHours();

    const query_views = `SELECT avg_value, minute FROM ${table.views}`;
    //const query_views = `${table.views}`;
    const query = `SELECT ${table.parameter} AS avg_value,timestamp AS minute FROM public.${table.dbTable} ORDER BY  timestamp asc  LIMIT 100;`;
    // const query = `SELECT
    //           date_trunc('minute', timestamp) AS minute,
    //           AVG(${table.parameter}) AS avg_value
    //       FROM
    //           public.${table.dbTable}
    //       WHERE
    //           timestamp >= CURRENT_DATE AND timestamp < CURRENT_DATE + INTERVAL '1 day'
    //       GROUP BY
    //           date_trunc('minute', timestamp)
    //       ORDER BY
    //           minute DESC
    //       LIMIT 100;
    //                 `;

    const daywise_query = `SELECT 
            date_trunc('hour', timestamp) + 
              (date_part('minute', timestamp)::int / 30)::int * interval '30 min' AS interval_start,
            AVG(${table.parameter}) AS avg_reading
          FROM 
            public.${table.dbTable}
          WHERE 
            timestamp >= CURRENT_DATE AND timestamp < CURRENT_DATE + INTERVAL '1 day'
          GROUP BY 
            1
          ORDER BY 
            interval_start ASC;`;

    const queryweek = `SELECT 
    date_trunc('day', timestamp) AS interval_start,
    AVG(${table.parameter}) AS avg_reading
FROM 
    public.${table.dbTable}
WHERE 
    timestamp >= CURRENT_DATE - INTERVAL '5 days'
    AND timestamp < CURRENT_DATE
GROUP BY 
    interval_start
ORDER BY 
    interval_start ASC;
`;
    if (range === "live") {
      const result = await client.query(query_views);
      data = {
        meter_reading: result.rows.map((item) => item.avg_value),
        timestamp: result.rows.map((item) =>
          new Date(item.minute).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
      };
    } else if (range === "day") {
      const result2 = await client.query(daywise_query);
      const data2 = result2.rows;
      data = {
        meter_reading: data2.map((item) => item.avg_reading),
        timestamp: data2.map((item) =>
          new Date(item.interval_start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
      };
    } else if (range === "week") {
      const resultweek = await client.query(queryweek);
      const data2 = resultweek.rows;

      data = {
        meter_reading: data2.map((item) => item.avg_reading),
        timestamp: data2.map((item) =>
          new Date(item.interval_start).toLocaleDateString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        ),
      };
    }
    if (data) {
      return { status: 200, data };
    } else {
      return { status: 406, error: "No data found" };
    }
  } catch (error) {
    console.error(
      "Error fetching the individual  info : ",
      range,
      error.message
    );
    return { status: 500, error: "Internal server error" };
  }
};

const getRangeIndivisualDevice = async (table) => {
  try {
    const query = `SELECT * FROM public.table_config_range WHERE name_of_table = $1`;
    const query2 = `SELECT tcr.*,ni.*
  FROM public.table_config_range tcr
    JOIN public.node_info ni ON tcr.node_mac = ni.node_mac
WHERE tcr.name_of_table = $1;
`;

    const result = await client.query(query2, [table]);
    const data = result.rows;

    if (data.length > 0) {
      return { status: 200, data };
    } else {
      return { status: 404, error: "No data found" };
    }
  } catch (error) {
    console.error(
      "Error fetching the individual humidity range info : ",
      error.message
    );
    return { status: 500, error: "Internal server error" };
  }
};




const getDataFromTable = (tableName) => {
  const query_views = `SELECT avg_value, minute FROM ${tableName}`;
  return client.query(query_views);
};
// Function to extract data from multiple tables using Promise.all()
const extractDataFromTables = async (tableNames) => {
  try {
    // Use Promise.all to run queries for each table
    const results = await Promise.all(
      tableNames.map((tableName) => getDataFromTable(tableName))
    );
    // Map over the results to extract rows
    const data = results.map((result) => result.rows);
    const resultArray = resultantArray(data);
    return data;
  } catch (error) {
    console.error("Error running queries:", error);
    throw error;
  }
};

const resultantArray = (data) => {
  const avg_valueRes = [];
  // Determine the maximum length of inner arrays
  const maxLength = Math.max(...data.map((arr) => arr.length));

  // Loop through each index up to the maximum length
  for (let i = 0; i < maxLength; i++) {
    let runningTotal = 0;

    // Calculate the running total for the current index across all inner arrays
    for (let j = 0; j < data.length; j++) {
      if (data[j][i]) {
        // Check if the index exists in the current array
        runningTotal += data[j][i].avg_value;
      }
    }

    // Push the running total and the minute from the last array (if it exists)
    const lastMinute = data[data.length - 1][i]?.minute || "";
    avg_valueRes.push({ avg_value: runningTotal, minute: lastMinute });
  }
  const Actualdata = {
    meter_reading: avg_valueRes.map((item) => item.avg_value),
    timestamp: avg_valueRes.map((item) =>
      new Date(item.minute).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
  };

  return avg_valueRes;
};

// extractDataFromTables(tableNamesArray)

module.exports = {
  getRangeIndivisualDevice,
  getDeviceInfoIndivisualDeviceCurrent,
  extractDataFromTables,
};
