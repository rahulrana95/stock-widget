import React from "react";
import { useParams } from "react-router-dom";
import StockWidget from "../stock-widget";

const StockDetails = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <StockWidget />
      {params.ticker}
    </div>
  );
};

export default StockDetails;
