const con = require("../databaseCon");
const { keysToRemove } = require('./config');




//   findNodeByMac()
  const originalObj = {
    id: 73,
    timestamp: "2024-08-28T04:40:25.000Z",
    name_of_table: "floor2",
    meter_name: "floor_2_temp_humidity",
    type: "Temperature Sensor",
    power_watt: null,
    temperature_c: "u1",
    energy_watt_hr: null,
    voltage_v: null,
    fuel_lt: null,
    humidity_g_m3: "u2",
    moisture_g_m3: null,
    node_mac: "D0:EF:76:44:C1:E4",
    interval_data: null,
    air: "clean"
  };
  

  const filterObj = (obj) => {
    const table_name = obj.name_of_table;

    // Filter out null values and unwanted keys
    const filteredObj = Object.fromEntries(
        Object.entries(obj)
            .filter(([key, value]) => value !== null && !keysToRemove.includes(key))
    );

    // Extract node_mac separately for use in each resulting object
    const node_mac = filteredObj.node_mac;
    console.log(filteredObj);
    
    // Generate the result array with formatted keys
    const result = Object.entries(filteredObj)
    .filter(([key]) => key !== 'node_mac') // Filter out entries where key is 'node_mac'
    .map(([key, value]) => ({
        meter_name: `${table_name}_${key}`,
        node_mac: filteredObj.node_mac
    }));
console.log(result);

    return result;
};


const insertData = async (data) => {
    try {
        const query = `
        INSERT INTO public.meter_range_table
          (meter_name, node_mac)
        VALUES ($1, $2)
      `;
      const values = [
        data.meter_name,
        data.node_mac,
      
      ];
      const results = await con.query(query, values);
      
      return { status : 201 , message: "New Gateway Added" }
        
        
    } catch (err) {
        console.error('Error inserting data:', err);
    }
};

const inserdata_meter_config=async (result_obj)=>{
    for (const obj of result_obj) {
        const node = await insertData(obj);
}
}


const result_obj=filterObj(originalObj)



inserdata_meter_config(result_obj)