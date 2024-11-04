const client = require("../../DL/databaseCon");

const getGatewayInfoData = async () => {
  try {
    const query = `SELECT * FROM gateway_info ORDER BY gateway_name ASC`;
    const result = await client.query(query);

    if (result.rows.length > 0) {
      return { status: 200, data: result.rows };
    } else {
      return { status: 404, data: [] };
    }
  } catch (error) {
    console.error("Error fetching gateway_info data from DL:", error.message);
    throw error;
  }
};

module.exports = {
  getGatewayInfoData,
};
