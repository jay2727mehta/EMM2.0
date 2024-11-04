const client = require("../../DL/databaseCon");

const Areachartdatewise = async (from, to) => {
  try {
    const queryComplete = `
            SELECT DISTINCT ON (DATE(timestamp))
                *
            FROM public.energy_consumed
            WHERE timestamp >= '${from}' AND timestamp <= '${to}'
            ORDER BY DATE(timestamp), timestamp ASC;`;

    const result = await client.query(queryComplete);

    return result.rows;
  } catch (error) {
    console.error("Error in area chart by date wise from DL :", error.message);
    throw error;
  }
};

const MeterData = async (from, to, table, column) => {
  try {
    const queryComplete = `
            SELECT DISTINCT ON (DATE(timestamp))
                timestamp,${column}
            FROM public.energy_consumed
            WHERE timestamp >= '${from}' AND timestamp <= '${to}'
            ORDER BY DATE(timestamp), timestamp ASC;`;

    const queryWeek = `SELECT 
            AVG(u1) AS avg_u1,
            AVG(u9) AS avg_u9,
            AVG(u25) AS avg_u25
        FROM 
            public.${table}
        WHERE 
            timestamp >= '${from}' AND timestamp <= '${to}'
        GROUP BY 
            DATE(timestamp)
                `;

    const result = await client.query(queryComplete);
    const result2 = await client.query(queryWeek);

    const Bargraph = result.rows;
    const Linechart = result2.rows;
    const col = column;
    const updatedBargraph = Bargraph.map((item) => ({
      timestamp: item.timestamp,
      [col + "(kW)"]: item[col],
    }));

    const updatedLinechart = Linechart.map((item) => ({
      "Apparent Power (kW)": item.avg_u1,
    }));

    //   'Apparent_power', 'Reactive_power', 'Actual_power'
    const array = [];
    for (i = 0; i < Linechart.length; i++) {
      const mergeobj = { ...updatedBargraph[i], ...updatedLinechart[i] };
      array.push(mergeobj);
    }

    return array;
  } catch (error) {
    console.error("Error fetching in meter data from DL :", error.message);
    throw error;
  }
};

//for main meter monthly
const MonthlyTotalconsumtionBymainMeter = async (from, to) => {
  try {
    const queryComplete = `WITH FirstOfMonth AS (
                SELECT 
                    lt_main,main_lt_phe_db,admin_main,
                    timestamp
                FROM 
                    energy_consumed
                WHERE 
                    date_trunc('month', timestamp) = date_trunc('month', CURRENT_DATE)
                ORDER BY 
                    timestamp ASC
                LIMIT 1
              ),
              LastOfCurrentDate AS (
                SELECT 
                lt_main,main_lt_phe_db,admin_main,
                timestamp
                FROM 
                 public.energy_consumed
                ORDER BY 
                    timestamp DESC
                LIMIT 1
              )
              SELECT * FROM FirstOfMonth
              UNION ALL
              SELECT * FROM LastOfCurrentDate`;

    const result = await client.query(queryComplete);

    return result.rows;
  } catch (error) {
    console.error("Error fetching data in monthly total consumption main meter from DL :", error.message);
    throw error;
  }
};

module.exports = {
  Areachartdatewise,
  MeterData,
  MonthlyTotalconsumtionBymainMeter,
};
