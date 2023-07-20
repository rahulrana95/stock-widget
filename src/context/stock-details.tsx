import React, { ReactNode } from "react";
import fetchTickerDetails from "../services/getTickerDetails";
import { useParams } from "react-router-dom";

type Stock = {
  name: string;
  symbol: string;
  description: string;
  currentPrice: string;
  industry: string;
  peRatio: string;
  marketCap: string;
  sector: string;
};

type StockContextType = {
  stock: Stock | null;
};

const StockContext = React.createContext<StockContextType | null>(null);

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export const useStockDetailsContext = () => {
  const context = React.useContext(StockContext);
  if (!context) {
    throw new Error("useStockContext must be used within a StockProvider");
  }
  return context;
};
type StockProviderT = {
  children: ReactNode;
  ticker?: string;
};
const StockDetailsProvider: React.FC<StockProviderT> = ({
  children,
  ticker,
}) => {
  const [stock, setStock] = React.useState<Stock | null>(null);

  React.useEffect(() => {
    if (ticker) {
      fetchTickerDetails(ticker)
        .then((response: any) => {
          setStock({
            name: titleCase(response.Name),
            symbol: response.Symbol,
            description: response.Description,
            currentPrice: "120",
            industry: titleCase(response.Industry),
            sector: titleCase(response.Sector),
            peRatio: titleCase(response.PERatio),
            marketCap: Intl.NumberFormat("en", {
              notation: "compact",
            }).format(parseInt(response.MarketCapitalization)),
          });
        })
        .catch((error) => {
          //
        });
    }
  }, [ticker]);

  return (
    <StockContext.Provider value={{ stock }}>{children}</StockContext.Provider>
  );
};

export default StockDetailsProvider;
