const client = require("../../DL/databaseCon");
const { format, parse } = require("date-fns");

const getEvTwoWheelData = async () => {
  try {
    const queryDay = `WITH RankedData AS (
      SELECT
          *,
          MIN(timestamp) OVER (PARTITION BY DATE(timestamp)) AS first_timestamp,
          MAX(timestamp) OVER (PARTITION BY DATE(timestamp)) AS last_timestamp
      FROM
          evstationtwowheel
      WHERE
          DATE(timestamp) >= CURRENT_DATE - INTERVAL '5 days'  -- Filter for last 5 days' data
  )
  SELECT
      first_data.first_timestamp::date AS day,
      first_data.u7 AS first_day_energy,
      last_data.u7 AS last_day_energy
  FROM
      RankedData first_data
  JOIN
      RankedData last_data ON first_data.first_timestamp::date = last_data.first_timestamp::date -- Corrected JOIN condition
  WHERE
      first_data.timestamp = first_data.first_timestamp
      AND last_data.timestamp = last_data.last_timestamp
  ORDER BY
      first_data.first_timestamp DESC;
  
    `;

    const result = await client.query(queryDay);

    const data = result.rows;

    // const formattedData = data.map((item) => ({
    //   u10: item.u10,
    //   date: new Date(item.timestamp).toLocaleDateString(),
    // }));
    return data;
  } catch (error) {
    console.error("Error fetching two wheel bar data from DL:", error.message);
    throw error;
  }
};

const getEvTwoWheelpowertrendline = async () => {
  try {
    const query1 = `
      SELECT EXTRACT(HOUR FROM timestamp) AS hour,
    AVG(u47) AS power
    FROM public.evstationtwowheel
    WHERE DATE(timestamp) = CURRENT_DATE
    GROUP BY EXTRACT(HOUR FROM timestamp);
  `;
    const result = await client.query(query1);

    const data = result.rows;

    const formattedData = data.map((item) => [item.hour, item.power / 1000]);

    return formattedData;
  } catch (error) {
    console.error("Error fetching two wheel bar line from DL:", error.message);
    throw error;
  }
};

const getEvFourWheelData = async () => {
  try {
    const queryDay = `WITH RankedData AS (
      SELECT
          *,
          MIN(timestamp) OVER (PARTITION BY DATE(timestamp)) AS first_timestamp,
          MAX(timestamp) OVER (PARTITION BY DATE(timestamp)) AS last_timestamp
      FROM
          evstationfourwheel
      WHERE
          DATE(timestamp) >= CURRENT_DATE - INTERVAL '5 days'  -- Filter for last 5 days' data
  )
  SELECT
      first_data.first_timestamp::date AS day,
      first_data.u7 AS first_day_energy,
      last_data.u7 AS last_day_energy
  FROM
      RankedData first_data
  JOIN
      RankedData last_data ON first_data.first_timestamp::date = last_data.first_timestamp::date -- Corrected JOIN condition
  WHERE
      first_data.timestamp = first_data.first_timestamp
      AND last_data.timestamp = last_data.last_timestamp
  ORDER BY
      first_data.first_timestamp DESC;
  
    `;

    const result = await client.query(queryDay);

    const data = result.rows;

    // const formattedData = data.map((item) => ({
    //   u10: item.u10,
    //   date: new Date(item.timestamp).toLocaleDateString(),
    // }));
    return data;
  } catch (error) {
    console.error(
      "Error fetching four wheel bar data from DL :",
      error.message
    );
    throw error;
  }
};

const getEvFourWheelpowertrendline = async () => {
  try {
    const query1 = `
      SELECT EXTRACT(HOUR FROM timestamp) AS hour,
    AVG(u47) AS power
    FROM public.evstationfourwheel
    WHERE DATE(timestamp) = CURRENT_DATE
    GROUP BY EXTRACT(HOUR FROM timestamp);
  `;
    const result = await client.query(query1);

    const data = result.rows;

    const formattedData = data.map((item) => [item.hour, item.power / 1000]);

    return formattedData;
  } catch (error) {
    console.error(
      "Error fetching four wheel line data from DL :",
      error.message
    );
    throw error;
  }
};

const getConveyorBeltData = async () => {
  try {
    const query = `WITH RankedData AS (
      SELECT
          *,
          MIN(timestamp) OVER (PARTITION BY DATE(timestamp)) AS first_timestamp,
          MAX(timestamp) OVER (PARTITION BY DATE(timestamp)) AS last_timestamp
      FROM
          conveyorbelt
      WHERE
          DATE(timestamp) >= CURRENT_DATE - INTERVAL '5 days'  -- Filter for last 5 days' data
  )
  SELECT
      first_data.first_timestamp::date AS day,
      first_data.u7 AS first_day_energy,
      last_data.u7 AS last_day_energy
  FROM
      RankedData first_data
  JOIN
      RankedData last_data ON first_data.first_timestamp::date = last_data.first_timestamp::date -- Corrected JOIN condition
  WHERE
      first_data.timestamp = first_data.first_timestamp
      AND last_data.timestamp = last_data.last_timestamp
  ORDER BY
      first_data.first_timestamp DESC;`;

    const result = await client.query(query);

    const data = result.rows;

    return data;
  } catch (error) {
    console.error(
      "Error fetching conveyor/belt bar data from DL :",
      error.message
    );
    throw error;
  }
};

const getConveryorBeltLineData = async () => {
  try {
    const query = `SELECT EXTRACT(HOUR FROM timestamp) AS hour,
    AVG(u47) AS power
    FROM public.conveyorbelt
    WHERE DATE(timestamp) = CURRENT_DATE
    GROUP BY EXTRACT(HOUR FROM timestamp);`;

    const result = await client.query(query);

    const data = result.rows;

    const formattedData = data.map((item) => [item.hour, item.power / 1000]);

    return formattedData;
  } catch (error) {
    console.error(
      "Error fetching conveyor/belt line data from DL:",
      error.message
    );
    throw error;
  }
};

module.exports = {
  getEvTwoWheelData,
  getEvFourWheelData,
  getEvFourWheelpowertrendline,
  getEvTwoWheelpowertrendline,
  getConveyorBeltData,
  getConveryorBeltLineData,
};
