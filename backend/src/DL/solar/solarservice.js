// Your existing code
const { Timestamp } = require("typeorm");
const client = require("../../DL/databaseCon");
const { format, parse } = require("date-fns");
const excelData = require("../excel/excelcon");

const getdata = async (range) => {
  try {
    const filteredData = excelData.filter((item) => {
      // Convert the DateAndTime to a string and extract the date part
      const datePart = item.DateAndTime.toISOString().slice(0, 10);
      // Check if the date part matches the desired date
      return datePart === range;
    });

    const arrayOfArrays = filteredData.map((item) => {
      const timeOnly = item.DateAndTime.toLocaleTimeString("en-US", {
        hour12: false,
      });
      return [timeOnly, item.SolarPower];
    });

    return arrayOfArrays;
  } catch (error) {
    console.error("Error fetching excel data from DL:", error.message);
    throw error;
  }
};

const getsolardataDaywise = (tablename) => {
  try {
    const groupedData = excelData.reduce((acc, item) => {
      const date = item.DateAndTime.toISOString().split("T")[0]; // Extract date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // Get the last DayGenneration value for each date
    const lastDayGenerationPerDate = Object.keys(groupedData).map((date) => {
      const dayGennerationValues = groupedData[date].map(
        (item) => item.DayGeneration
      );
      const EnergyGenerated =
        dayGennerationValues[dayGennerationValues.length - 1];
      return { date, EnergyGenerated };
    });

    const arrayOfArrays = lastDayGenerationPerDate.map((item) => [
      item.date,
      item.EnergyGenerated,
    ]);

    const lastSevenData = arrayOfArrays.slice(-7);

    const formattedArray = lastSevenData.map(([date, solarPower]) => {
      const parsedDate = parse(date, "yyyy-MM-dd", new Date());
      const formattedDate = format(parsedDate, "d MMM");
      return [formattedDate, solarPower];
    });

    return formattedArray;
  } catch (error) {
    console.error("Error fetching solar data daywise from DL :", error.message);
    throw error;
  }
};

const getsolarAlldata = async (range) => {
  try {
    const dateString = range.toString(); // Assuming 'range' is a string representation of the date
    const dateObject = new Date(dateString);

    // Get the UTC time in milliseconds for 7 PM (19:00)
    const sevenPM = Date.UTC(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate(),
      19,
      0,
      0,
      0
    );

    // Create a new Date object for 7 PM in the local time zone
    const localSevenPM = new Date(sevenPM);

    // Filter the excel data for entries belonging to the current month
    const lastRow = excelData[excelData.length - 1];
    const currentDate = new Date();
    const currentMonthEntries = excelData.filter((item) => {
      return (
        item.DateAndTime.getMonth() === currentDate.getMonth() &&
        item.DateAndTime.getFullYear() === currentDate.getFullYear()
      );
    });

    const currentMonthEntries2 = excelData.filter((item) => {
      return (
        item.DateAndTime.getMonth() === localSevenPM.getMonth() &&
        item.DateAndTime.getFullYear() === localSevenPM.getFullYear()
      );
    });

    // Sort the filtered entries by DateAndTime
    currentMonthEntries.sort((a, b) => a.DateAndTime - b.DateAndTime);

    // Calculate the current month's generation
    let currentMonthGeneration = 0;
    if (currentMonthEntries.length > 0) {
      // Total generation of the last day of the month
      const lastDayGeneration =
        currentMonthEntries[currentMonthEntries.length - 1].TotalGeneration;

      // Total generation of the first day of the month
      const firstDayGeneration = currentMonthEntries[0].TotalGeneration;

      // Calculate the current month's generation by taking the difference
      currentMonthGeneration = Math.floor(
        lastDayGeneration - firstDayGeneration
      );
    }

    lastRow.currentMonthGen = currentMonthGeneration / 1000;

    return lastRow;
  } catch (error) {
    console.error("Error fetching all solar data from DL :", error.message);
    throw error;
  }
};

const getTimlysolargenarateddata = async () => {
  try {
    // const queryDay=`SELECT     *
    // FROM public.solarenergy
    // WHERE Date(timestamp) = CURRENT_DATE
    // order by timestamp asc
    // `

    const queryDay = ` SELECT *
    FROM public.solarenergy
    WHERE timestamp >= DATE_TRUNC('day', CURRENT_TIMESTAMP) + INTERVAL '6 hours'
    AND Date(timestamp) = CURRENT_DATE
    ORDER BY timestamp ASC`;

    const queryDay1 = ` SELECT *
    FROM public.solarenergy
    WHERE timestamp >= DATE_TRUNC('day', CURRENT_TIMESTAMP) + INTERVAL '6 hours'
    AND Date(timestamp) = CURRENT_DATE
    ORDER BY timestamp ASC`;

    const result = await client.query(queryDay);
    return result.rows;
  } catch (error) {
    console.error("Error fetching timely solar generated data from DL :", error.message);
    throw error;
  }
};

const getSolarLivePowerData = async (date) => {
  try {
    const queryDay = `
    SELECT *
    FROM public.solarenergy
    WHERE DATE(timestamp) = '${date}'
    AND DATE_PART('hour', timestamp) >= 6
    ORDER BY timestamp ASC
  `;

    // Execute the query with the provided date parameter
    const result = await client.query(queryDay);

    return result.rows;
  } catch (error) {
    console.error("Error fetching solar live power data from DL:", error.message);
    throw error;
  }
};
//current power and total day generation
const getCurrentpower = async () => {
  try {
    const queryDay = `SELECT solar_active_power_kw
    FROM public.solarenergy
    WHERE Date(timestamp) = CURRENT_DATE
    ORDER BY timestamp DESC
    LIMIT 1;
    `;

    const result = await client.query(queryDay);
    return result;
  } catch (error) {
    console.error("Error fetching current power data from DL :", error.message);
    throw error;
  }
};

//day generation total by solar
const getDayEnergyGen = async () => {
  try {
    const queryDay = `SELECT
    first_reading.total_solar_energy_kwh AS first_reading,
    latest_reading.total_solar_energy_kwh AS latest_reading
FROM
    (SELECT total_solar_energy_kwh
     FROM public.solarenergy
     WHERE Date(timestamp) = CURRENT_DATE
     ORDER BY timestamp ASC
     LIMIT 1) AS first_reading,
    (SELECT total_solar_energy_kwh
     FROM public.solarenergy
     WHERE Date(timestamp) = CURRENT_DATE
     ORDER BY timestamp DESC
     LIMIT 1) AS latest_reading;
    `;

    const result = await client.query(queryDay);

    return result;
  } catch (error) {
    console.error("Error fetching day energy generation data from DL :", error.message);
    throw error;
  }
};

//till date generation total by solar

const getTotalSolarGen = async () => {
  try {
    const queryDay = `SELECT total_solar_energy_kwh
    FROM public.solarenergy
    ORDER BY timestamp DESC
    LIMIT 1;
    `;

    const result = await client.query(queryDay);

    return result;
  } catch (error) {
    console.error("Error fetching total solar generation data from DL :", error.message);
    throw error;
  }
};

const getEnergyPowerdaily = async () => {
  try {
    const queryDay = `SELECT timestamp,grid_active_power_kw
    FROM public.solarenergy
    WHERE DATE(timestamp) = CURRENT_DATE
    ORDER BY timestamp ASC
  ;
    `;

    const result = await client.query(queryDay);

    return result;
  } catch (error) {
    console.error("Error fetching energy power daily data from DL :", error.message);
    throw error;
  }
};

const getEnergyPowerPastdate = async (date) => {
  try {
    const queryDay = `SELECT timestamp,grid_active_power_kw
    FROM public.solarenergy
    WHERE DATE(timestamp) = '${date}'
    ORDER BY timestamp ASC
  ;
    `;
    const result = await client.query(queryDay);

    return result.rows;
  } catch (error) {
    console.error("Error fetching energy power past date data from DL :", error.message);
    throw error;
  }
};

const get5DayEnergyGen = async () => {
  try {
    const queryDay = `WITH RankedData AS (
      SELECT
          *,
          MIN(timestamp) OVER (PARTITION BY DATE(timestamp)) AS first_timestamp,
          MAX(timestamp) OVER (PARTITION BY DATE(timestamp)) AS last_timestamp
      FROM
          solarenergy
      WHERE
          DATE(timestamp) >= CURRENT_DATE - INTERVAL '5 days'  -- Filter for last 5 days' data
  )
  SELECT
      first_data.first_timestamp::date AS day,
      first_data.total_solar_energy_kwh AS first_day_energy_solar,
      last_data.total_solar_energy_kwh AS last_day_energy_solar,
      first_data.total_grid_energy_kwh AS first_day_energy_grid,
      last_data.total_grid_energy_kwh AS last_day_energy_grid
  FROM
      RankedData first_data
      JOIN RankedData last_data ON first_data.first_timestamp::date = last_data.last_timestamp::date
  WHERE
      first_data.timestamp = first_data.first_timestamp
      AND last_data.timestamp = last_data.last_timestamp
  ORDER BY
      first_data.first_timestamp DESC;
  
    `;

    const queryDayactual = `SELECT 
    total_solar_energy_kwh,
    timestamp
FROM 
    solarenergy
WHERE 
    DATE(timestamp) >= CURRENT_DATE - INTERVAL '5 days'
ORDER BY 
    timestamp;
`;

    const result = await client.query(queryDay);

    return result;
  } catch (error) {
    console.error("Error fetching 5 day energy generation data from DL :", error.message);
    throw error;
  }
};

const getTotalgenBySolarANDMeter = async () => {
  try {
    const queryDay = `WITH FirstOfMonth AS (
      SELECT 
          total_grid_energy_kwh,
          total_solar_energy_kwh,
          timestamp
      FROM 
          solarenergy
      WHERE 
          date_trunc('month', timestamp) = date_trunc('month', CURRENT_DATE)
      ORDER BY 
          timestamp ASC
      LIMIT 1
    ),
    LastOfCurrentDate AS (
      SELECT 
          total_grid_energy_kwh,
          total_solar_energy_kwh,
          timestamp
      FROM 
          public.solarenergy
      WHERE 
          timestamp::date = CURRENT_DATE-1
      ORDER BY 
          timestamp DESC
      LIMIT 1
    )
    SELECT * FROM FirstOfMonth
    UNION ALL
    SELECT * FROM LastOfCurrentDate;
  ;
    `;

    const query = `SELECT 
    total_grid_energy_kwh,
    total_solar_energy_kwh,
    timestamp
FROM 
    solarenergy
WHERE 
    date_trunc('month', timestamp) = date_trunc('month', CURRENT_DATE)
ORDER BY 
    timestamp ASC
LIMIT 1;`;

    const query2 = `SELECT 
total_grid_energy_kwh,
total_solar_energy_kwh,
timestamp
timestamp
FROM 
solarenergy
WHERE 
timestamp::date = CURRENT_DATE
ORDER BY 
timestamp DESC
LIMIT 1;`;
    const result = await client.query(queryDay);
    // const result2 = await client.query(query2);

    return result;
  } catch (error) {
    console.error("Error fetching total generation solar & meter data from DL :", error.message);
    throw error;
  }
};

const getdailyGenenergybysolar = async () => {
  try {
    const queryDay = `WITH RankedData AS (
      SELECT
          *,
          MIN(timestamp) OVER (PARTITION BY DATE(timestamp)) AS first_timestamp,
          MAX(timestamp) OVER (PARTITION BY DATE(timestamp)) AS last_timestamp
      FROM
          solarenergy
      
  )
  SELECT
      first_data.first_timestamp::date AS day,
      first_data.total_solar_energy_kwh AS first_day_energy_solar,
      last_data.total_solar_energy_kwh AS last_day_energy_solar,
      first_data.total_grid_energy_kwh AS first_day_energy_grid,
      last_data.total_grid_energy_kwh AS last_day_energy_grid
  FROM
      RankedData first_data
      JOIN RankedData last_data ON first_data.first_timestamp::date = last_data.last_timestamp::date
  WHERE
      first_data.timestamp = first_data.first_timestamp
      AND last_data.timestamp = last_data.last_timestamp
  ORDER BY
      first_data.first_timestamp DESC;
  
    `;
    const result = await client.query(queryDay);
    // const result2 = await client.query(query2);

    return result;
  } catch (error) {
    console.error("Error fetching daily solar generation data from DL :", error.message);
    throw error;
  }
};

const getCurrentSolarPowerConsumption = async () => {
  try {
    const query = `SELECT grid_active_power_kw
  FROM public.solarenergy
  WHERE timestamp >= DATE_TRUNC('day', CURRENT_TIMESTAMP) + INTERVAL '6 hours'
  AND Date(timestamp) = CURRENT_DATE
  ORDER BY timestamp desc limit 1`;

    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching current solar power consumption data from DL :", error.message);
    throw error;
  }
};

const getSolarMothlyGen = async () => {
  try {
    const queryDay = `WITH RECURSIVE MonthDates AS (SELECT 
date_trunc('month', CURRENT_DATE)::timestamp AS 
month_start,
CURRENT_DATE::timestamp AS month_end
      UNION ALL
SELECT month_start - INTERVAL '1 month',
       month_end - INTERVAL '1 month'
FROM MonthDates
WHERE month_start > date_trunc('month', CURRENT_DATE) - INTERVAL '4 months'),
FirstOfMonth AS ( SELECT DISTINCT ON 
(date_trunc('month', timestamp))
date_trunc('month', timestamp) AS month,
total_grid_energy_kwh,   
total_solar_energy_kwh,
timestamp FROM    
solarenergy WHERE
date_trunc('month', timestamp) >= (date_trunc('month', CURRENT_DATE) - 
INTERVAL '3 months') ORDER BY 
date_trunc('month', timestamp), timestamp 
ASC),LastOfMonth AS (SELECT DISTINCT ON 
(date_trunc('month', timestamp))
date_trunc('month', timestamp) AS month,
total_grid_energy_kwh,total_solar_energy_kwh,timestamp FROM solarenergy 
WHERE date_trunc('month', timestamp) >= (date_trunc('month', CURRENT_DATE) - INTERVAL '3 months')
ORDER BY date_trunc('month', timestamp), timestamp DESC)
SELECT 'First of Month' AS period, f.month, f.total_grid_energy_kwh, f.total_solar_energy_kwh,     
f.timestamp FROM FirstOfMonth f UNION ALL SELECT 
'Last of Month' AS period, l.month, l.total_grid_energy_kwh, l.total_solar_energy_kwh, 
l.timestamp FROM LastOfMonth l ORDER BY month, period;`;

    const result = await client.query(queryDay);
    // await client.query(query2);
    return result;
  } catch (error) {
    console.error("Error fetching solar monthly generation data from DL:", error.message);
    throw error;
  }
};

const getSolarGridEnergyDistribution = async () => {
  try {
    const query = `SELECT AVG(solar_active_power_kw) AS solar, AVG(grid_active_power_kw) AS grid FROM public.solarenergy WHERE date(timestamp) = CURRENT_DATE;`;
    const result = await client.query(query);
    const data = result.rows;
    return data;
  } catch (error) {
    console.error("Error fetching solar grid energy distribution data from DL :", error.message);
    throw error;
  }
};

const getWeeklyAvgConsumption = async () => {
  try {
    const query = `SELECT
    DATE_TRUNC('week', timestamp) AS date,
    AVG(solar_active_power_kw) AS avg_solar_power_kw,
    AVG(grid_active_power_kw) AS avg_grid_power_kw
  FROM
    public.solarenergy
  WHERE
    timestamp >= NOW() - INTERVAL '1 month'
  GROUP BY
    DATE_TRUNC('week', timestamp)
  ORDER BY
    date;
  `;
    const result = await client.query(query);
    const data = result.rows;
    const formattedData = {
      date: data.map((item) => new Date(item.date).toLocaleDateString()),
      totalAvg: data.map(
        (item) => (item.avg_solar_power_kw + item.avg_grid_power_kw) / 1000
      ),
    };
    return formattedData;
  } catch (error) {
    console.error("Error fetching weekly avg consumption data from DL :", error.message);
    throw error;
  }
};

const MdPowerforlast5days = async () => {
  const query = `
  WITH daily_max AS (
    SELECT 
        DATE(timestamp) AS date,
        MAX(grid_active_power_kw) AS max_grid_power
    FROM 
        solarenergy
    WHERE 
        DATE(timestamp) >= (CURRENT_DATE - INTERVAL '4 days')
        AND DATE(timestamp) <= CURRENT_DATE
    GROUP BY 
        DATE(timestamp)
)
SELECT 
    daily_max.date,
    solarenergy.timestamp AS max_power_timestamp,
    daily_max.max_grid_power
FROM 
    daily_max
JOIN 
    solarenergy 
ON 
    DATE(solarenergy.timestamp) = daily_max.date
    AND solarenergy.grid_active_power_kw = daily_max.max_grid_power
ORDER BY 
    daily_max.date;
  
`;

try {
  const result = await client.query(query);
const data=result.rows
  // Transform the data into the desired format
  const transformedData = data.map((obj) => {
    const dateObj = new Date(obj.max_power_timestamp);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const value = obj.max_grid_power;
    return { date, time, value };
  });
  return transformedData;
} catch (err) {
  console.error("Error executing query on solarenergy", err);
}
};

module.exports = {
  getdata,
  getsolardataDaywise,
  getsolarAlldata,
  getTimlysolargenarateddata,
  getCurrentpower,
  getDayEnergyGen,
  getTotalSolarGen,
  getEnergyPowerdaily,
  get5DayEnergyGen,
  getTotalgenBySolarANDMeter,
  getdailyGenenergybysolar,
  getEnergyPowerPastdate,
  getSolarLivePowerData,
  getCurrentSolarPowerConsumption,
  getSolarMothlyGen,
  getSolarGridEnergyDistribution,
  getWeeklyAvgConsumption,
  MdPowerforlast5days,
};
