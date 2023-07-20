// @ts-nocheck
// StockWidget.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StockWidget from "../home";
import StockWidgetProvider, {
  useStockWidgetContext,
} from "../../context/stock-widget-context";
import GlobalProvider from "../../context/global-context";
import { useParams, useLocation } from "react-router-dom"; // Import the hooks
import Layout from "../../components/layout";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import getTickerSuggestions from "../../services/getTickets";
import getTickersData from "../../fixtures/getTickets.json";
import { fixKeys } from "../../utils";

// Mock useParams and useLocation
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Import all other exports
  useParams: jest.fn(),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock the API call using Jest's mock functions
jest.mock("../../services/getTickets");

describe("StockWidget component", () => {
  const setSearchTerm = jest.fn();
  const setLoading = jest.fn();

  it("renders the search input", () => {
    // Mock useParams and useLocation to provide necessary route data
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/" });

    render(
      <Router>
        <GlobalProvider>
          <StockWidgetProvider>
            <Layout />
          </StockWidgetProvider>
        </GlobalProvider>
      </Router>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search stock by stock picker"
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("calls setSearchTerm and setLoading on input change", async () => {
    // Mock useParams and useLocation to provide necessary route data
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/" });
    getTickerSuggestions.mockResolvedValue({
      tickers: fixKeys(getTickersData.bestMatches),
    });

    render(
      <Router>
        <GlobalProvider>
          <StockWidgetProvider>
            <Layout />
          </StockWidgetProvider>
        </GlobalProvider>
      </Router>
    );
    const searchInput = screen.getByPlaceholderText(
      "Search stock by stock picker"
    );
    fireEvent.change(searchInput, { target: { value: "T" } });

    await waitFor(() => expect(screen.queryByText("Loading")).toBeVisible());
    await waitFor(() =>
      expect(screen.queryByText("AT&T Inc (T)")).toBeVisible()
    );
    expect(
      screen.getByPlaceholderText("Search stock by stock picker").value
    ).toBe("T");
  });

  it("navigates to the stock details page when clicking on a suggestion", async () => {
    // Mock useParams and useLocation to provide necessary route data
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/" });

    getTickerSuggestions.mockResolvedValue({
      tickers: fixKeys(getTickersData.bestMatches),
    });

    // Mock the navigate function
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Router>
        <GlobalProvider>
          <StockWidgetProvider>
            <Layout />
          </StockWidgetProvider>
        </GlobalProvider>
      </Router>
    );
    const searchInput = screen.getByPlaceholderText(
      "Search stock by stock picker"
    );
    fireEvent.change(searchInput, { target: { value: "T" } });

    await waitFor(() => expect(screen.queryByText("Loading")).toBeVisible());
    await waitFor(() =>
      expect(screen.queryByText("AT&T Inc (T)")).toBeVisible()
    );

    const suggestionItem = screen.getByText("AT&T Inc (T)");
    fireEvent.click(suggestionItem);

    // Assert that useNavigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/stock/T");
  });

  it("should show no results", async () => {
    // Mock useParams and useLocation to provide necessary route data
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/" });

    getTickerSuggestions.mockResolvedValue({
      tickers: [],
    });

    render(
      <Router>
        <GlobalProvider>
          <StockWidgetProvider>
            <Layout />
          </StockWidgetProvider>
        </GlobalProvider>
      </Router>
    );
    const searchInput = screen.getByPlaceholderText(
      "Search stock by stock picker"
    );
    fireEvent.change(searchInput, { target: { value: "T" } });

    await waitFor(() => expect(screen.queryByText("Loading")).toBeVisible());
    await waitFor(() =>
      expect(screen.queryByText("No results.")).toBeVisible()
    );
  });
});
