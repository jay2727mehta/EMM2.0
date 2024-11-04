// Your existing code
const { Timestamp } = require("typeorm");
const client = require("../DL/databaseCon");
const { format, parse } = require("date-fns");

const alarmMessages = require("../DL/upsalarmconfig");

const getdata = async () => {
  try {
    const result = await client.query("SELECT * FROM ");

    return result;
  } catch (error) {
    console.error("Error fetching data from databaseService :", error.message);
    throw error;
  }
};

const getdgdata = async () => {
  try {
    const query1 = `
  SELECT DISTINCT ON (DATE(timestamp))
  u29, timestamp
  FROM public.dg
  WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
  ORDER BY DATE(timestamp), timestamp DESC;
`;
    const result = await client.query(query1);

    const data = result.rows;

    const formattedData = data.map((item) => ({
      u29: item.u29,
      date: new Date(item.timestamp).toLocaleDateString(),
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching dg data from databaseService :", error.message);
    throw error;
  }
};

const getdgdatadynamic = async (range) => {
  try {
    const queryHour = `SELECT DISTINCT ON (DATE_TRUNC('hour', timestamp))
COALESCE(u29, 0) AS u29, timestamp
FROM public.dg
WHERE timestamp >= NOW() - INTERVAL '5 hours'
ORDER BY DATE_TRUNC('hour', timestamp), timestamp DESC;`;

    const queryMonth = `SELECT DISTINCT ON (EXTRACT(MONTH FROM timestamp))
COALESCE(u29, 0) AS u29,u28, timestamp
FROM public.dg
WHERE timestamp >= CURRENT_DATE - INTERVAL '6 months'
ORDER BY EXTRACT(MONTH FROM timestamp), timestamp DESC;`;

    const queryWeek = `SELECT DISTINCT ON (EXTRACT(WEEK FROM timestamp))
COALESCE(u29, 0) AS u29,u28, timestamp
FROM public.dg
WHERE timestamp >= CURRENT_DATE - INTERVAL '35 days'
ORDER BY EXTRACT(WEEK FROM timestamp), timestamp DESC;`;

    const queryDay = `
  SELECT DISTINCT ON (DATE(timestamp))
  COALESCE(u29, 0) AS u29,u28, timestamp
  FROM public.dg
  WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
  ORDER BY DATE(timestamp), timestamp DESC;
`;

    let query;
    let data;
    if (range === "day") {
      const result = await client.query(queryDay);

      data = {
        range: "day",
        datadg: result.rows,
      };

      const formattedData = data.datadg.map((item) => ({
        u29: (item.u28 * 65536 + item.u29) / 10,
        date: new Date(item.timestamp).toLocaleDateString(),
      }));

      const absoluteData = formattedData.map((item, index) => ({
        u29: index === 0 ? item.u29 : item.u29 - formattedData[index - 1].u29,
        date: format(parse(item.date, "d/M/yyyy", new Date()), "d MMM"),
      }));

      const modifiedData = absoluteData.map((item) => ({
        ...item,
        MainMeter: item.u29,
      }));
      const formattedDataRange = {
        range: "day",
        datarange: modifiedData,
      };

      return formattedDataRange;
    } else if (range === "week") {
      const result = await client.query(queryWeek);

      data = {
        range: "week",
        datadg: result.rows,
      };

      const formattedData = data.datadg.map((item) => ({
        u29: (item.u28 * 65536 + item.u29) / 10,
        date: new Date(item.timestamp).toLocaleDateString(),
      }));

      const absoluteData = formattedData.map((item, index) => ({
        u29: index === 0 ? item.u29 : item.u29 - formattedData[index - 1].u29,
        date: format(parse(item.date, "d/M/yyyy", new Date()), "d MMM"),
      }));

      function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        const date11 = new Date(result).toLocaleDateString();
        const date22 = format(parse(date11, "d/M/yyyy", new Date()), "d MMM");
        return date22;
      }
      const absoluteDataweekabs = formattedData.map((item, index) => {
        const MainMeter =
          index === 0 ? item.u29 : item.u29 - formattedData[index - 1].u29;
        const startDate = format(
          parse(item.date, "d/M/yyyy", new Date()),
          "d MMM"
        );
        const endDate = addDays(startDate, 6);
        const weekRange = `${startDate}-${endDate}`;
        return {
          MainMeter,
          date: weekRange,
        };
      });

      absoluteDataweekabs.pop();

      // const modifiedData = absoluteData.map(item => ({
      //   ...item,
      //   u29: item.u29,
      // }));

      const formattedDataRange = {
        range: "week",
        datarange: absoluteDataweekabs,
      };

      return formattedDataRange;
    } else if (range === "month") {
      const result = await client.query(queryMonth);

      data = {
        range: "month",
        datadg: result.rows,
      };

      const formattedData = data.datadg.map((item) => ({
        u29: (item.u28 * 65536 + item.u29) / 10,
        date: new Date(item.timestamp).toLocaleDateString(),
      }));

      const modifiedData11 = formattedData.map((item) => {
        const monthIndex = parseInt(item.date.split("/")[1]) - 1; // Month index is 0-based
        const monthName = new Date(Date.UTC(2022, monthIndex)).toLocaleString(
          "default",
          { month: "short" }
        );
        return { u29: item.u29, month: monthName };
      });

      const absoluteData = modifiedData11.map((item, index) => ({
        u29: index === 0 ? item.u29 : item.u29 - formattedData[index - 1].u29,
        date: item.month,
      }));

      const modifiedData = absoluteData.map((item) => ({
        ...item,
        u29: item.u29,
      }));

      const formattedDataRange = {
        range: "month",
        datarange: modifiedData,
      };

      return formattedDataRange;
    }
  } catch (error) {
    console.error("Error fetching dg dynamic data from databaseService :", error.message);
    throw error;
  }
};

const getdgdataevery5min = async () => {
  try {
    const query1 = `
      SELECT *
      FROM dg
      WHERE timestamp = (
        SELECT MAX(timestamp)
        FROM dg
      );
    `;
    const result = await client.query(query1);

    const data = result.rows[0];

    const dg = {
      Coolant_Temperature: data.u1,
      Reserved: data.u2,
      Fuel_Level: data.u3,
      Charge_alternator_voltage: data.u4,
      Battery_Voltage: data.u5 / 10,
      Engine_Speed: data.u6,
      Generator_Frequency: data.u7,
      Generator_L1N_voltage: data.u9,
      Time_stamp: data.timestamp,
      Generator_L1_Watts: data.u29,
      Oil_Pressure: data.u0,
      Total_Energy: ((data.u28 * 65536 + data.u29) / 10000).toFixed(2),
      Total_Runtime: Math.floor((data.u26 * 65536 + data.u27) / 3600),
      Time_to_next_Maintenance: Math.floor(
        (data.u22 * 65536 + data.u23) / 3600
      ),
      No_of_starts: data.u36 * 65535 + data.u37,
    };

    return dg;
  } catch (error) {
    console.error("Error fetching dg data every 5min data from databaseService :", error.message);
    throw error;
  }
};

const getconsumptionpattern = async () => {
  try {
    const query1 = `
  SELECT 
  *
  FROM  public.max_demand
  order by serial_number  `;

    const result = await client.query(query1);

    const data = result.rows;

    const formattedData = data.map((item) => [
      item.month,
      parseInt(item.consumed_val),
      parseInt(item.committed_val),
    ]);

    return formattedData;
  } catch (error) {
    console.error("Error fetching consumption pattern data from databaseService :", error.message);
    throw error;
  }
};

//ups chart
const getupschart = async () => {
  try {
    const query1 = `
      SELECT 
    u14,
    u15,
    u16,
    u27,
    "timestamp_col"
FROM  
    public.ups_data
WHERE 
    DATE("timestamp_col") = CURRENT_DATE;

 `;

    const result = await client.query(query1);

    const data = result.rows;

    const alarmvla = data.map((item) => {
      return item.u27;
    });

    const ldata = parseInt(alarmvla[alarmvla.length - 1]);
    const binaryRepresentation = ldata.toString(2).padStart(15, "0");

    const notifyups = [];

    for (let i = 0; i < binaryRepresentation.length; i++) {
      if (binaryRepresentation[i] === "1") {
        notifyups.push(alarmMessages[i]);
      }
    }

    const formattedData = data.map((item) => {
      const time = new Date(item.timestamp_col).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return [time, parseInt(item.u14), parseInt(item.u15), parseInt(item.u16)];
    });
    obj = {
      formattedData,
      notifyups,
    };
    return obj;
  } catch (error) {
    console.error("Error fetching ups data from databaseService :", error.message);
    throw error;
  }
};

const getDGmonthlyProduce = async () => {
  try {
    const query1 = `WITH FirstOfMonth AS (
        SELECT 
            u28,u29,
            timestamp
        FROM 
            dg
        WHERE 
            date_trunc('month', timestamp) = date_trunc('month', CURRENT_DATE)
        ORDER BY 
            timestamp ASC
        LIMIT 1
      ),
      LastOfCurrentDate AS (
        SELECT 
        u28,u29,
            timestamp
        FROM 
         public.dg
         where date(timestamp)=CURRENT_DATE-1
        ORDER BY 
            timestamp DESC
        LIMIT 1
      )
      SELECT * FROM FirstOfMonth
      UNION ALL
      SELECT * FROM LastOfCurrentDate`;

    const result = await client.query(query1);

    const data = result.rows;
    const formattedData = data.map((item) => ({
      u29: (item.u28 * 65536 + item.u29) / 10,
      date: new Date(item.timestamp).toLocaleDateString(),
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching dg monthly produce data from databaseService :", error.message);
    throw error;
  }
};

const putTotalemployeeperday = async (employee) => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();

    // Formatted current date
    const formattedDate = `${year}-${month}-${day}`;
    const { Id, Wid } = employee;
    const totalEmployees = parseInt(Id) + parseInt(Wid);
    const insertQuery = `
      INSERT INTO employee_count (date, employees_with_id, employees_without_id, total_employees)
      VALUES ($1, $2, $3, $4);
    `;
    const values = [formattedDate, Id, Wid, totalEmployees];
    await client.query(insertQuery, values);
    console.log("Data inserted successfully");

    // const result = await client.query(query1);

    //   const data=result.rows
    return;
  } catch (error) {
    console.error("Error inserting total employee data from databaseService :", error.message);
    throw error;
  }
};

const getEvTwoWheelData = async () => {
  try {
    const query1 = `
    SELECT DISTINCT ON (DATE(timestamp))
    u10,timestamp
   FROM public.evstationtwowheel
   WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
   ORDER BY DATE(timestamp), timestamp DESC;
`;

    const result = await client.query(query1);

    const data = result.rows;

    const formattedData = data.map((item) => ({
      u10: item.u10,
      date: new Date(item.timestamp).toLocaleDateString(),
    }));
    return formattedData;
  } catch (error) {
    console.error("Error fetching data two wheel ev data from databaseService :", error.message);
    throw error;
  }
};

const getEvFourWheelData = async () => {
  try {
    const query1 = `
    SELECT DISTINCT ON (DATE(timestamp))
    u10,timestamp
   FROM public.evstationfourwheel
   WHERE timestamp >= CURRENT_DATE - INTERVAL '5 days'
   ORDER BY DATE(timestamp), timestamp DESC;
`;

    const result = await client.query(query1);

    const data = result.rows;

    const formattedData = data.map((item) => ({
      u10: item.u10,
      date: new Date(item.timestamp).toLocaleDateString(),
    }));
    return formattedData;
  } catch (error) {
    console.error("Error fetching data four wheel ev from databaseService :", error.message);
    throw error;
  }
};

const getAllPrevAbsData = async (date) => {
  try {
    const query = `SELECT 
  admin_lift_abs,
  operations_lift_abs,
  director_block_abs,
  admin_emergency_lighting_abs,
  emergency_lighting_abs,
  hvac_odu_op_two_abs,
  hvac_lighting_sub_abs,
  lt_main_abs,
  main_lt_phe_db_abs,
  common_phe_abs,
  admin_ac_abs,
  admin_main_abs,
  hvac_odu_op_one_abs
FROM energy_consumed
WHERE date(timestamp) = ${date};`;

    const result = await client.query(query);

    return result;
  } catch (error) {
    console.error("Error fetching all previous data from databaseService :", error.message);
    throw error;
  }
};

module.exports = {
  getdata,
  getdgdata,
  getdgdataevery5min,
  getdgdatadynamic,
  getconsumptionpattern,
  getupschart,
  getDGmonthlyProduce,
  putTotalemployeeperday,
  getEvTwoWheelData,
  getEvFourWheelData,
  getAllPrevAbsData,
};
