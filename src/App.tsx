import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import HomePage from "./pages/home";
import StockDetailsPage from "./pages/stock-view";
import Layout from "./components/layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/stock/:ticker" Component={StockDetailsPage} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
