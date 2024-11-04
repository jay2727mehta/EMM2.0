import React, { createContext, useContext, useState } from "react";

const PowerContext = createContext();

const usePowerContext = () => useContext(PowerContext);

const PowerContextProvider = ({ children }) => {
  return <PowerContext.Provider value={{}}>{children}</PowerContext.Provider>;
};

export { PowerContext, PowerContextProvider, usePowerContext };
