import React, { createContext, useContext, useState, ReactNode } from "react";
import { Stock } from "../components/stock-details";

// Define the type for the data stored in the global context
type GlobalContextData = {
  stockCaching: {
    [key: string]: Stock;
  };
  setStockCaching: (Stock: Stock) => void;
};

const GlobalContext = createContext<GlobalContextData | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

type GlobalProviderProps = {
  children: ReactNode;
};

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [stockCaching, setStockCaching] = useState<{
    [key: string]: Stock;
  }>({});

  // Add any functions or methods you want to use to modify the state

  return (
    <GlobalContext.Provider
      value={{
        stockCaching,
        setStockCaching: (stock) =>
          setStockCaching((stockCaching) => ({
            ...stockCaching,
            [stock.symbol]: stock,
          })),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
