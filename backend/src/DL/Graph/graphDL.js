const client = require("../../DL/databaseCon");
const logger = require("../../logger");

const getCompleteGraphConfig = async (userId, componentMap) => {
  try {
    logger.info(`Fetching complete graph config for userId: ${userId}`);
  
    let query;
    if (componentMap === ('1L-1,1L-2') || componentMap === ('2L-1,2L-2') || componentMap === ('3L-1,3L-2')) {
      query = `SELECT * FROM graph g WHERE g.user_id = $1`;
    } else {
      query = `SELECT * FROM graph g JOIN table_config t ON t.node_mac = g.table_config_id WHERE g.user_id = $1`;
    }

    const result = await client.query(query, [userId]);
  

    if (result.rows.length > 0) {
      logger.info(`Graph config fetch success for userId: ${userId}`);
      return { status: 200, result: result.rows };
    } else {
      logger.warn(`Graph config not found for userId: ${userId}`);
      return { status: 404, result: null };
    }
  } catch (error) {
    logger.error(`Error fetching graph config for userId: ${userId} - ${error.message}`);
    return { status: 500, error: "Internal server error" };
  }
};

// const getCompleteGraphConfigUser = async () => {
//   try {
//     // logger.info("Fetching complete graph config for all users");
   
//     const query = `SELECT * FROM graph g JOIN table_config t ON t.node_mac = g.table_config_id`;
//     const result = await client.query(query);
   
    
//     if (result.rows.length > 0) {
//       logger.info("Graph config fetch success for all users");
//       return { status: 200, result: result.rows };
//     } else {
//       logger.warn("Graph config not found for all users");
//       return { status: 404, result: null };
//     }
//   } catch (error) {
//     logger.error(`Error fetching graph config for all users - ${error.message}`);
//     return { status: 500, error: "Internal server error" };
//   }
// };

const addGraphConfig = async (configData) => {
  try {
    logger.info(`Inserting graph config: ${JSON.stringify(configData)}`);

    const {
      userId,
      gadgetType,
      chartType,
      meter,
      chartHeight,
      chartWidth,
      componentType,
      timePeriod,
      gadgetTypeJp
    } = configData;
    console.log(configData);
    

    const query = `
        INSERT INTO graph(chart_type, gadget_type, table_config_id, user_id,chart_height,chart_width,component,time_period,gadget_type_jp)
        VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9)
        RETURNING *;
      `;
    const values = [
      chartType,
      gadgetType,
      meter,
      userId,
      chartHeight,
      chartWidth,
      componentType,
      timePeriod,gadgetTypeJp
    ];

    const result = await client.query(query, values);

    if (result.rowCount > 0) {
      logger.info("Graph config insertion success");
      return { status: 200, result: result.rows[0] };
    } else {
      logger.warn("Graph config insertion failed");
      return { status: 409, result: null };
    }
  } catch (error) {
    logger.error(`Error inserting graph config - ${error.message}`);
    return { status: 500, error: "Internal server error" };
  }
};

const deleteGraphConfig = async (graph_id) => {
  try {
    logger.info(`Deleting graph config with id: ${graph_id}`);

    const query = `DELETE FROM graph g WHERE g.graph_id = $1`;
    const result = await client.query(query, [graph_id]);

    if (result.rowCount > 0) {
      logger.info(`Graph config deletion success for id: ${graph_id}`);
      return { status: 200, result: result.rows[0] };
    } else {
      logger.warn(`Graph config deletion failed for id: ${graph_id}`);
      return { status: 404, result: null };
    }
  } catch (error) {
    logger.error(`Error deleting graph config with id: ${graph_id} - ${error.message}`);
    return { status: 500, error: "Internal server error" };
  }
};

module.exports = {
  addGraphConfig,
  getCompleteGraphConfig,
  deleteGraphConfig,
};
