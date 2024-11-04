import React, { createContext, useState, useContext, useEffect } from "react";
import { getSolar5mindata,getTotalGenbySolarandMeter } from "../Services/solar.service";

const Energycontext = createContext();

const useEnergy = () => useContext(Energycontext);

const EnergyMainMeterdataProvide = ({ children }) => {
  const [MonthSolarGen, setMonthSolarGen] = useState();
  const [Monthlydata_Generation, setMonthlydata_Gen] = useState({
    dg: 0,
    meter: 0,
    solar: 0,
  });

  const monthgensolar = (data) => {
    setMonthSolarGen(data);
  };

  const fetchsolarMonthgen = async () => {
    try {
      const resultantdata = await getTotalGenbySolarandMeter();
      const data = resultantdata.resultdata[0];
      setMonthlydata_Gen({
        solar: data.total_solar_gen_Month,
        meter: data.Total_Gen_Grid_Month,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchsolarMonthgen();
  }, []);

  return (
    <Energycontext.Provider
      value={{
        monthgensolar,
        Monthlydata_Generation,
        MonthSolarGen,
      }}
    >
      {children}
    </Energycontext.Provider>
  );
};

export { EnergyMainMeterdataProvide, useEnergy };
