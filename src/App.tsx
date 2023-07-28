import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import HomePage from "./pages/home";
import StockDetailsPage from "./pages/stock-view";
import Layout from "./components/layout";
import HelpPage from "./pages/help";
import AboutUsPage from "./pages/about-us";
import StockWidgetProvider from "./context/stock-widget-context";
import GlobalProvider from "./context/global-context";
import { IntlProvider } from "react-intl";
import messages_en from "./translations/en.json";

const messages: Record<string, any> = {
  en: messages_en,
};

const language = navigator.language.split(/[-_]/)[0]; // Get the user's preferred language

function App() {
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Router>
        <GlobalProvider>
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
        </GlobalProvider>
      </Router>
    </IntlProvider>
  );
}

export default App;
