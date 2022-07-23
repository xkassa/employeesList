import React, { useContext } from "react";
const DataContext = React.createContext(null);
export const DataContextProvider = DataContext.Provider;
export const useDataContext = () => useContext(DataContext);
