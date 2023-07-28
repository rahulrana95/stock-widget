import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const fetchData = () => {
    if (ticker && !isLoading) {
      setIsLoading(true);
      if (stockCaching[ticker]) {
        setStock({ ...stockCaching[ticker] });
        setIsLoading(false);
      } else {
        fetchTickerDetails(ticker)
          .then((response: any) => {
            const { data, chartData } = response;
            const currentStock = {
              name: titleCase(data.Name),
              symbol: data.Symbol,
              description: data.Description,
              currentPrice: "120",
              industry: titleCase(data.Industry),
              sector: titleCase(data.Sector),
              peRatio: titleCase(data.PERatio),
              marketCap: Intl.NumberFormat("en", {
                notation: "compact",
              }).format(parseInt(data.MarketCapitalization)),
              chart: chartData,
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
  };

  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, 5000);
  }, []);

  return <StockDetails stock={stock} error={error} isLoading={isLoading} />;
};

export default StockDetailsPage;
