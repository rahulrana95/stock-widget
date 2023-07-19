import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createFalse } from "typescript";
import StockDetails, { Stock } from "../components/stock-details";
import { useGlobalContext } from "../context/global-context";
import fetchTickerDetails from "../services/getTickerDetails";

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const StockDetailsPage = () => {
  const params = useParams();
  const { ticker } = params;
  const [stock, setStock] = useState<Stock | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { stockCaching, setStockCaching } = useGlobalContext();

  useEffect(() => {
    if (ticker && !isLoading) {
      setIsLoading(true);
      if (stockCaching[ticker]) {
        setStock({ ...stockCaching[ticker] });
        setIsLoading(false);
      } else {
        fetchTickerDetails(ticker)
          .then((response: any) => {
            const currentStock = {
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
            };
            setStock(currentStock);
            setStockCaching(currentStock);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      }
    }
  }, []);

  return <StockDetails stock={stock} error={error} isLoading={isLoading} />;
};

export default StockDetailsPage;
