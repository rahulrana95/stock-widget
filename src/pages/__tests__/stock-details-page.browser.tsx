// @ts-nocheck
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import StockviewPage from "../stock-view";
import GlobalProvider from "../../context/global-context";
import { useParams, useLocation } from "react-router-dom"; // Import the hooks
import fetchTickerDetails from "../../services/getTickerDetails";
import getTicketDetailsOfATicker from "../../fixtures/getTicketDetailsOfATicker.json";
import StockDetailsProvider from "../../context/stock-details";

// Mock useParams and useLocation
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Import all other exports
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

// Mock the API call using Jest's mock functions
jest.mock("../../services/getTickerDetails");

describe("StockDetails component", () => {
  // Test case for loading state
  it("renders loading message when isLoading prop is true", () => {
    // Mock useParams and useLocation to provide necessary route data
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/stocks/MCK" });

    fetchTickerDetails.mockResolvedValue(getTicketDetailsOfATicker);
    render(
      <GlobalProvider>
        <StockDetailsProvider ticker="MCK">
          <StockviewPage />
        </StockDetailsProvider>
      </GlobalProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // Test case for error state
  it("renders error message when error prop is provided", async () => {
    // Mock useParams and useLocation to provide necessary route data
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/stocks/MCK" });
    const mockError = new Error("API call failed");
    fetchTickerDetails.mockRejectedValue(mockError.message);
    render(
      <GlobalProvider>
        <StockDetailsProvider ticker="MCK">
          <StockviewPage />
        </StockDetailsProvider>
      </GlobalProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText("API call failed")).toBeVisible()
    );

    expect(screen.getByText("API call failed")).toBeInTheDocument();
  });

  // Test case for successful data rendering
  it("renders stock details when stock prop is provided", async () => {
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/stocks/MCK" });

    fetchTickerDetails.mockResolvedValue(getTicketDetailsOfATicker);
    render(
      <GlobalProvider>
        <StockDetailsProvider ticker="MCK">
          <StockviewPage />
        </StockDetailsProvider>
      </GlobalProvider>
    );

    await waitFor(() => expect(screen.queryByText("Name")).toBeVisible());

    // Assert stock details
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Tesla inc")).toBeInTheDocument();
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("TSLA")).toBeInTheDocument();
  });

  // Test case for empty stock details (null stock prop)
  it("renders no stock details when stock prop is null", async () => {
    useParams.mockReturnValue({ ticker: "MCK" });
    useLocation.mockReturnValue({ pathname: "/stocks/MCK" });

    fetchTickerDetails.mockResolvedValue({
      ...getTicketDetailsOfATicker,
      Symbol: "N/A",
    });
    render(
      <GlobalProvider>
        <StockDetailsProvider ticker="MCK">
          <StockviewPage />
        </StockDetailsProvider>
      </GlobalProvider>
    );

    await waitFor(() => expect(screen.queryByText("Name")).toBeVisible());

    // Make sure the "N/A" text is displayed for missing stock details
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
