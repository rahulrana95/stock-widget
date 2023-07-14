import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import HomePage from "./pages/home";
import StockDetailsPage from "./pages/stock-view";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/stock/:id" Component={StockDetailsPage} />
      </Routes>
    </Router>
  );
}

export default App;
