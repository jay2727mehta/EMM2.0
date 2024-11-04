import React, { createContext, useContext, useState } from "react";

const EnergyContext = createContext();

const useEnergyContext = () => useContext(EnergyContext);

const EnergyContextProvider = ({ children }) => {
  return <EnergyContext.Provider value={{}}>{children}</EnergyContext.Provider>;
};

export { EnergyContext, EnergyContextProvider, useEnergyContext };
