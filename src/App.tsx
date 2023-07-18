import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import HomePage from "./pages/home";
import StockDetailsPage from "./pages/stock-view";
import Layout from "./components/layout";
import HelpPage from "./pages/help";
import AboutUsPage from "./pages/about-us";
import { StockWidgetProvider } from "./context/stock-widget-context";

function App() {
  return (
    <Router>
      <StockWidgetProvider>
        <Layout>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/stock/:ticker" Component={StockDetailsPage} />
            <Route path="/help" Component={HelpPage} />
            <Route path="/about" Component={AboutUsPage} />
          </Routes>
        </Layout>
      </StockWidgetProvider>
    </Router>
  );
}

export default App;
