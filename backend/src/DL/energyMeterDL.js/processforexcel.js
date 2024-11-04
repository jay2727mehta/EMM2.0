// timestamp: item.timestamp,
//                 admin_lift_abs: Math.floor(item.admin_lift_abs / 1000),
//                 operations_lift_abs: Math.floor(item.operations_lift_abs / 1000),
//                 director_block_abs: Math.floor(item.director_block_abs / 1000),
//                 admin_emergency_lighting_abs: Math.floor(item.admin_emergency_lighting_abs / 1000),
//                 emergency_lighting_abs: Math.floor(item.emergency_lighting_abs / 1000),
//                 hvac_odu_op_two_abs: Math.floor(item.hvac_odu_op_two_abs / 1000),
//                 hvac_lighting_sub_abs: Math.floor(item.hvac_lighting_sub_abs / 1000),
//                 lt_main_abs: Math.floor(item.lt_main_abs / 1000),
//                 main_lt_phe_db_abs: Math.floor(item.main_lt_phe_db_abs / 1000),
//                 common_phe_abs: Math.floor(item.common_phe_abs / 1000),
//                 admin_ac_abs: Math.floor(item.admin_ac_abs / 1000),
//                 admin_main_abs: Math.floor(item.admin_main_abs / 1000),
//                 hvac_odu_op_one_abs: Math.floor(item.hvac_odu_op_one_abs / 1000),
//                 Operation_1: Math.floor(lt_main / 1000),
//                 Admin: Math.floor(Admin_lt / 1000),
//                 Operation_2: Math.floor(main_lt_phe_db / 1000),
//                 TotalLift:Math.floor(TotalLift/1000),
//                 TotalEmergencyLighting:Math.floor(TotalEmergencyLighting/1000),
//                 TotalMain:Math.floor(TotalMain/1000),
//                 TotalPHE:Math.floor(TotalPHE/1000),

const processAreachart = async (data) => {
  try {
    const processdata = data.map((item) => {
      const lt_main =
        item.lt_main_abs -
        (item.hvac_odu_op_two_abs + item.operations_lift_abs);
      const main_lt_phe_db =
        item.hvac_odu_op_one_abs +
        item.common_phe_abs +
        item.emergency_lighting_abs +
        item.director_block_abs;
      const Admin_lt =
        item.admin_emergency_lighting_abs +
        item.hvac_lighting_sub_abs +
        item.admin_ac_abs +
        item.admin_lift_abs;
      const TotalLift = item.admin_lift_abs + item.operations_lift_abs;
      const TotalEmergencyLighting =
        item.admin_emergency_lighting_abs + item.emergency_lighting_abs;
      const TotalMain = item.lt_main_abs + item.main_lt_phe_db_abs;
      const TotalPHE = item.common_phe_abs;
      return {
        Timestamp: new Date(item.timestamp).toISOString().split("T")[0],
        admin_lift_abs: Math.floor(item.admin_lift_abs / 1000),
        operations_lift_abs: Math.floor(item.operations_lift_abs / 1000),
        director_block_abs: Math.floor(item.director_block_abs / 1000),
        admin_emergency_lighting_abs: Math.floor(
          item.admin_emergency_lighting_abs / 1000
        ),
        emergency_lighting_abs: Math.floor(item.emergency_lighting_abs / 1000),
        hvac_odu_op_two_abs: Math.floor(item.hvac_odu_op_two_abs / 1000),
        hvac_lighting_sub_abs: Math.floor(item.hvac_lighting_sub_abs / 1000),
        lt_main_abs: Math.floor(item.lt_main_abs / 1000),
        main_lt_phe_db_abs: Math.floor(item.main_lt_phe_db_abs / 1000),
        common_phe_abs: Math.floor(item.common_phe_abs / 1000),
        admin_ac_abs: Math.floor(item.admin_ac_abs / 1000),
        admin_main_abs: Math.floor(item.admin_main_abs / 1000),
        hvac_odu_op_one_abs: Math.floor(item.hvac_odu_op_one_abs / 1000),
        Operation_1: Math.floor(lt_main / 1000),
        Admin: Math.floor(Admin_lt / 1000),
        Operation_1: Math.floor(main_lt_phe_db / 1000),
        TotalLift: Math.floor(TotalLift / 1000),
        TotalEmergencyLighting: Math.floor(TotalEmergencyLighting / 1000),
        TotalMain: Math.floor(TotalMain / 1000),
        TotalPHE: Math.floor(TotalPHE / 1000),
        // Timestamp: item.timestamp,
        // "Admin_lift_abs(kWh)": Math.floor(item.admin_lift_abs / 1000),
        // "Operations_lift_abs(kWh)": Math.floor(item.operations_lift_abs / 1000),
        // "Director_block_abs(kWh)": Math.floor(item.director_block_abs / 1000),
        // "Admin_emergency_lighting_abs(kWh)": Math.floor(item.admin_emergency_lighting_abs / 1000),
        // "Emergency_lighting_abs(kWh)": Math.floor(item.emergency_lighting_abs / 1000),
        // "Hvac_odu_op_two_abs(kWh)": Math.floor(item.hvac_odu_op_two_abs / 1000),
        // "Hvac_lighting_sub_abs(kWh)": Math.floor(item.hvac_lighting_sub_abs / 1000),
        // "Lt_main_abs(kWh)": Math.floor(item.lt_main_abs / 1000),
        // "Main_lt_phe_db_abs(kWh)": Math.floor(item.main_lt_phe_db_abs / 1000),
        // "Common_phe_abs(kWh)": Math.floor(item.common_phe_abs / 1000),
        // "Admin_ac_abs(kWh)": Math.floor(item.admin_ac_abs / 1000),
        // "Admin_main_abs(kWh)": Math.floor(item.admin_main_abs / 1000),
        // "Hvac_odu_op_one_abs(kWh)": Math.floor(item.hvac_odu_op_one_abs / 1000),
        // "Operation_1(kWh)": Math.floor(lt_main / 1000),
        // "Admin(kWh)": Math.floor(Admin_lt / 1000),
        // "Operation_2(kWh)": Math.floor(main_lt_phe_db / 1000),
        // "TotalLift(kWh)": Math.floor(TotalLift / 1000),
        // "TotalEmergencyLighting(kWh)": Math.floor(TotalEmergencyLighting / 1000),
        // "TotalMain(kWh)": Math.floor(TotalMain / 1000),
        // "TotalPHE(kWh)": Math.floor(TotalPHE / 1000),
      };
    });

    return processdata;
  } catch (error) {
    console.error("Error processarea chart from DL :", error.message);
    throw error;
  }
};

module.exports = {
  processAreachart,
};
