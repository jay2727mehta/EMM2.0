const processdata = (result) => {
  try {
    const data = result.map((item, index) => {
      const date = new Date(item.timestamp); // corrected
      const Total_Gen_Grid_Month =
        index < result.length - 1
          ? (result[index + 1]["total_grid_energy_kwh"] -
              item["total_grid_energy_kwh"]) /
            1000
          : 0; // corrected
      const total_solar_gen_Month =
        index < result.length - 1
          ? (result[index + 1]["total_solar_energy_kwh"] -
              item["total_solar_energy_kwh"]) /
            1000
          : 0; // corrected

      return {
        date, // corrected
        total_solar_gen_Month,
        Total_Gen_Grid_Month,
      };
    });
    return data;
  } catch (error) {
    console.error("Error in processing data from BL:", error.message);
    throw error;
  }
};

const processdataconsume = (result) => {
  try {
    const data = result.map((item, index) => {
      const date = new Date(item.timestamp); // corrected
      const op1 =
        index < result.length - 1
          ? (result[index + 1]["lt_main"] - item["lt_main"]) / 1000000
          : 0; // corrected
      const op2 =
        index < result.length - 1
          ? (result[index + 1]["main_lt_phe_db"] - item["main_lt_phe_db"]) /
            1000000
          : 0; // corrected
      const admin =
        index < result.length - 1
          ? (result[index + 1]["admin_main"] - item["admin_main"]) / 1000000
          : 0;
      return {
        date, // corrected
        op1,
        op2,
        admin,
      };
    });

    return data;
  } catch (error) {
    console.error("Error in processconsume data from BL :", error.message);
    throw error;
  }
};

const processdataproduceDG = (result) => {
  try {
    const data = result.map((item, index) => {
      const date = new Date(item.timestamp); // corrected
      const dg =
        index < result.length - 1
          ? (result[index + 1]["u29"] - item["u29"]) / 1000
          : 0; // corrected

      return {
        date, // corrected
        dg,
      };
    });

    return data;
  } catch (error) {
    console.error("Error in process data produce dg from BL :", error.message);
    throw error;
  }
};

const processdataforDaygenSolarandMeter = (result) => {
  try {
    const data = result.map((item, index) => {
      const date = new Date(item.day); // corrected
      const total_solar_gen_day =
        index < result.length
          ? Math.floor(
              result[index]["last_day_energy_solar"] -
                item["first_day_energy_solar"]
            )
          : 0; // corrected
      const total_grid_gen_day =
        index < result.length
          ? Math.floor(
              result[index]["last_day_energy_grid"] -
                item["first_day_energy_grid"]
            )
          : 0; // corrected

      return {
        date, // corrected
        total_solar_gen_day,
        total_grid_gen_day,
      };
    });

    return data;
  } catch (error) {
    console.error("Error in processdata for solar daygen & meter data from BL :", error.message);
    throw error;
  }
};

const processdataforSolarMonthGen = (data) => {
  try {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const results = [];
    const groupedData = data.reduce((acc, item) => {
      const monthDate = new Date(item.month);
      const monthName =
        monthNames[monthDate.getUTCMonth()] + " " + monthDate.getUTCFullYear();

      if (!acc[monthName]) {
        acc[monthName] = { first: null, last: null };
      }

      if (item.period === "First of Month") {
        acc[monthName].first = item;
      } else if (item.period === "Last of Month") {
        acc[monthName].last = item;
      }

      return acc;
    }, {});

    for (const month in groupedData) {
      const { first, last } = groupedData[month];

      if (first && last) {
        const diffObj = {
          month,

          grid_energy_difference:
            last.total_grid_energy_kwh - first.total_grid_energy_kwh,

          solar_energy_difference:
            last.total_solar_energy_kwh - first.total_solar_energy_kwh,
        };

        results.push(diffObj);
      }
    }
    const absolutedata = processdataforCorrectedMonth(results);
    // Logging final results for debugging

    return absolutedata;
  } catch (error) {
    console.error("Error in processing solar monthly generation data from BL :", error.message);
    throw error;
  }
};

const processdataforDayconsumptionEV = (result) => {
  try {
    console.log(result,'res');
    const data = result.map((item, index) => {
      const date = new Date(item.day); // corrected
      const total_EV_gen_day =
        index < result.length
          ? Math.abs(
              Math.floor(
                result[index]["last_day_energy"] - item["first_day_energy"]
              )
            )/1000
          : 0; // corrected
      //  const total_grid_gen_day = index < result.length ? Math.floor(result[index]['last_day_energy_grid'] - item['first_day_energy_grid'] ) : 0; // corrected

      return {
        date, // corrected
        total_EV_gen_day,
      };
    });
    console.log(data,'res');
    return data;
  } catch (error) {
    console.error("Error in data from BL :", error.message);
    throw error;
  }
};

const processdataforCorrectedMonth = (data) => {
  try {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const results = data.map((item) => {
      const currentDate = new Date(item.month + "-01"); // Assuming the month is in "Month Year" format
      currentDate.setMonth(currentDate.getMonth() + 1); // Increment month by 1

      const monthName =
        monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();

      return {
        ...item,
        month: monthName,
      };
    });

    return results;
  } catch (error) {
    console.error("Error processing solar month generation data:", error);
    return null;
  }
};
module.exports = {
  processdata,
  processdataconsume,
  processdataproduceDG,
  processdataforDaygenSolarandMeter,
  processdataforDayconsumptionEV,
  processdataforSolarMonthGen,
};
