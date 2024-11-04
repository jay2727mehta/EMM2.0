const client = require("../../DL/databaseCon");

const getNodeStateData = async () => {
  try {
    const query = "SELECT * FROM nodestate order by table_name ASC";

    const result = await client.query(query);

    const data = result.rows;

    const formattedData = data.map((item) => ({
      meterName: item.table_name,
      state: item.state,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data from from DL :", error.message);
    throw error;
  }
};

const getOfflineNodeStateData = async () => {
  try {
    const query =
      "SELECT * FROM nodestate WHERE state = 'offline' order by table_name ASC";

    const result = await client.query(query);

    const data = result.rows;

    const formattedData = data.map((item) => ({
      meterName: item.table_name,
      state: item.state,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data from from DL :", error.message);
    throw error;
  }
};

module.exports = { getNodeStateData, getOfflineNodeStateData };
