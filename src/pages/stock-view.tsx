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
  const { stockCaching, setStockCaching } = useGlobalContext();
  useEffect(() => {
    if (ticker) {
      if (stockCaching[ticker]) {
        setStock({ ...stockCaching[ticker] });
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
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [ticker]);

  return <StockDetails stock={stock} />;
};

export default StockDetailsPage;
