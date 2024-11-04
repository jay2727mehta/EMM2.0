const { Timestamp } = require("typeorm");
const client = require("../../../DL/databaseCon");
const { format, parse } = require("date-fns");

const Meterarray = [
  "admin_block_lt_panel",
  "admin_block_ups_panel",
  "hvac_odu_panel_admin",
  "admin_lift_panel",
  "admin_emergency_lighting_panel",
  "hvac_odu_panel_op_one",
  "hvac_odu_panel_op_two",
  "operation_block_lift_panel",
  "director_block_panel",
  "common_block_phe_panel",
  "emergency_lighting_panel",
  "lighting_hvac_sub_panel",
];

const getTotalPowerGenerate = async (table) => {
  const TotalPowerquery = `SELECT 
  AVG(solar_active_power_kw) AS avg_solar_power,
  AVG(grid_active_power_kw) AS avg_grid_power,
  (AVG(solar_active_power_kw) + AVG(grid_active_power_kw)) AS total_avg_power
FROM 
  solarenergy
WHERE 
  DATE(timestamp) = CURRENT_DATE
  AND EXTRACT(HOUR FROM timestamp) >= 9
  AND EXTRACT(HOUR FROM timestamp) < 18;`;

  try {
    const TotalPower = await client.query(TotalPowerquery);

    return TotalPower.rows[0]["total_avg_power"];
  } catch (err) {
    console.error(`Error executing query for ${table} from DL`, err);
    return { [table]: null };
  }
};

const getPowerDistribution = async (table) => {
  const queryDay = `SELECT 
  AVG(u1) AS ${table}
FROM 
  public.${table}
WHERE 
  DATE(timestamp) = CURRENT_DATE
  AND EXTRACT(HOUR FROM timestamp) >= 9
  AND EXTRACT(HOUR FROM timestamp) < 18;`;

  try {
    const result = await client.query(queryDay);

    return { [table]: result.rows[0][table] };
  } catch (err) {
    console.error(`Error executing query for ${table} from DL`, err);
    return { [table]: null };
  }
};

const TotalCombinePower = async () => {
  const TotalPowerG = await getTotalPowerGenerate();
  const data = {};
  const promises = Meterarray.map((table) => getPowerDistribution(table));

  const results = await Promise.all(promises);

  results.forEach((result) => {
    Object.assign(data, result);
  });

  const obj = {
    totalAC: (data.hvac_odu_panel_op_two + data.hvac_odu_panel_op_one) / 1000,
    EmergencyLight:
      (data.admin_emergency_lighting_panel + data.emergency_lighting_panel) /
      1000,
    lift: (data.admin_lift_panel + data.operation_block_lift_panel) / 1000,
    pump: data.common_block_phe_panel / 1000,
    UpsAndLights:
      (TotalPowerG -
        (data.hvac_odu_panel_op_two +
          data.hvac_odu_panel_op_one +
          data.admin_emergency_lighting_panel +
          data.emergency_lighting_panel +
          data.admin_lift_panel +
          data.operation_block_lift_panel +
          data.common_block_phe_panel)) /
      1000,
  };

  return obj;
};

module.exports = {
  TotalCombinePower,
};
