import React from "react";
import Home from "../components/home";
import { StockWidgetProvider } from "../context/stock-widget-context";

const HomePage = () => {
  return (
    <StockWidgetProvider>
      <Home />
    </StockWidgetProvider>
  );
};

export default HomePage;
