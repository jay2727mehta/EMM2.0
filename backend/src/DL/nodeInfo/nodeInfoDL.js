const client = require("../../DL/databaseCon");

const getNodeInfoData = async () => {
  try {
        const query = `SELECT distinct n.*, t.type, t.type_jp
    FROM node_info n
    JOIN table_config t
    ON n.node_mac = t.node_mac
    ORDER BY n.node_name ASC;
    `;
//     const query = `WITH RankedNodes AS (
//   SELECT n.*, t.type,
//          ROW_NUMBER() OVER (PARTITION BY n.node_mac ORDER BY n.node_name ASC) AS row_num
//   FROM node_info n 
//   JOIN table_config t 
//   ON n.node_mac = t.node_mac
// )
// SELECT *
// FROM RankedNodes
// WHERE row_num = 1
// ORDER BY node_name ASC;

// `;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return { status: 200, data: result.rows };
    } else {
      return { status: 404, data: [] };
    }
  } catch (error) {
    console.error("Error fetching node_info data from DL:", error.message);
    throw error;
  }
};

const getNodeParameters = async (node_mac) => {
  try {
    const query = `SELECT distinct *
    FROM table_config tc
    JOIN table_config_range tcr 
    ON tc.name_of_table = tcr.name_of_table
    WHERE tc.node_mac = $1 
    ;`;
    const results = await client.query(query, [node_mac]);
    if (results.rows.length > 0) {
      return { status: 200, results: results.rows };
    } else {
      return { status: 404, results: results.rows };
    }
  } catch (error) {
    throw error;
  }
};

const getAllMeters = async () => {
  try {
    const query = `SELECT * FROM table_config`;
    const results = await client.query(query);
    if (results.rows.length > 0) {
      return { status: 200, results: results.rows };
    } else {
      return { status: 404, results: results.rows };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getNodeInfoData,
  getNodeParameters,
  getAllMeters,
};
