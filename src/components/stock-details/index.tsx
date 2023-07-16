import React from "react";
import { useParams } from "react-router-dom";
import StockChart from "../chart";
import StockWidget from "../stock-widget";

const StockDetails = () => {
  const params = useParams();

  return (
    <div>
      <div className="stock-chart">
        <StockChart />
      </div>
    </div>
  );
};

export default StockDetails;
