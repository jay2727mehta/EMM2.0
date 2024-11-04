import React, { createContext, useContext, useState } from "react";

const ControlContext = createContext();

const useControlContext = () => useContext(ControlContext);

const ControlContextProvider = ({ children }) => {
  return <ControlContext.Provider value={{}}>{children}</ControlContext.Provider>;
};

export { ControlContext, ControlContextProvider, useControlContext };
