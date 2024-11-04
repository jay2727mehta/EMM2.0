const client = require("../../DL/databaseCon");

const getTableMeterData = async () => {
  try {
    const query = "SELECT * FROM table_config order by id ASC";

    const result = await client.query(query);

    const data = result.rows;

    const formattedData = data.map((item) => ({
      dbTable: item.name_of_table,
      meterName: item.meter_name,
      type: item.type,
      power: item.power_watt,
      temperature : item.temperature_c,
      energy: item.energy_watt_hr,
      voltage : item.voltage_v,
      fuel : item.fuel_lt,
      humidity : item.humidity_g_m3,
      moisture : item.moisture_g_m3,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data from from DL :", error.message);
    throw error;
  }
};

module.exports = {
  getTableMeterData,
};
