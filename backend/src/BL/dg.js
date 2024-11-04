const { format, parse } = require("date-fns");

const dataProcessforStep = (data, tablename) => {
  try {
    let StepGraphEnergy = [];
    let DetailObj;
    switch (tablename) {
      case "lt_main_":
        data.forEach((item) => {
          let date = new Date(item.timestamp);
          let formattedDate = format(
            parse(date.toLocaleDateString(), "d/M/yyyy", new Date()),
            "d MMM"
          );
          let Main_lt =
            item.lt_main_abs -
            (item.hvac_odu_op_two_abs + item.operations_lift_abs);
          let energyData = [
            formattedDate,
            item.operations_lift_abs / 1000,
            item.hvac_odu_op_two_abs / 1000,
            Main_lt / 1000,
          ];
          StepGraphEnergy.push(energyData);
        });

        DetailObj = {
          name: "LT_Main",
          array: StepGraphEnergy,
        };

        break;
      case "main_lt_phe_db":
        data.forEach((item) => {
          let date = new Date(item.timestamp);
          let formattedDate = format(
            parse(date.toLocaleDateString(), "d/M/yyyy", new Date()),
            "d MMM"
          );
          let main_lt_phe_db =
            item.hvac_odu_op_one_abs +
            item.common_phe_abs +
            item.emergency_lighting_abs +
            item.director_block_abs;
          let energyData = [
            formattedDate,
            item.director_block_abs / 1000,
            item.emergency_lighting_abs / 1000,
            item.common_phe_abs / 1000,
            item.hvac_odu_op_one_abs / 1000,
          ];
          StepGraphEnergy.push(energyData);
        });
        DetailObj = {
          name: "main_lt_phe_db",
          array: StepGraphEnergy,
        };
        break;
      case "Admin_lt":
        data.forEach((item) => {
          let date = new Date(item.timestamp);
          let formattedDate = format(
            parse(date.toLocaleDateString(), "d/M/yyyy", new Date()),
            "d MMM"
          );
          let admin_main =
            item.admin_emergency_lighting_abs +
            item.hvac_lighting_sub_abs +
            item.admin_ac_abs +
            item.admin_lift_abs;
          let energyData = [
            formattedDate,
            item.admin_emergency_lighting_abs / 1000,
            item.hvac_lighting_sub_abs / 1000,
            item.admin_ac_abs / 1000,
            item.admin_lift_abs / 1000,
            admin_main / 1000,
          ];
          StepGraphEnergy.push(energyData);
        });
        DetailObj = {
          name: "Admin_lt",
          array: StepGraphEnergy,
        };
        break;
      case "main":
        data.forEach((item) => {
          let date = new Date(item.timestamp);
          let formattedDate = format(
            parse(date.toLocaleDateString(), "d/M/yyyy", new Date()),
            "d MMM"
          );
          let adminMeter =
            item.admin_emergency_lighting_abs +
            item.hvac_lighting_sub_abs +
            item.admin_ac_abs +
            item.admin_lift_abs;
          let energyData = [
            formattedDate,
            item.lt_main_abs / 1000,
            item.admin_main_abs / 1000,
            item.main_lt_phe_db_abs / 1000,
            // Main/1000
          ];
          StepGraphEnergy.push(energyData);
        });
        DetailObj = {
          name: "main",
          array: StepGraphEnergy,
        };
        break;
      default:
      // Handle the default case if needed
    }

    return DetailObj;
  } catch (error) {
    console.error(error, "processdatasteperror");
  }
};

module.exports = {
  dataProcessforStep,
};
