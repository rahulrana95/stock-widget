// @ts-nocheck
// StockWidget.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StockWidget from "../home";
import { useStockWidgetContext } from "../../context/stock-widget-context";

// Mock the useStockWidgetContext custom hook
jest.mock("../../context/stock-widget-context", () => ({
  useStockWidgetContext: jest.fn(),
}));

describe("StockWidget component", () => {
  const setSearchTerm = jest.fn();
  const setLoading = jest.fn();

  beforeEach(() => {
    // Mock the context values returned by useStockWidgetContext
    useStockWidgetContext.mockReturnValue({
      searchTerm: "",
      suggestions: [],
      setLoading,
      setSearchTerm,
    });
  });

  it.only("renders the search input", () => {
    render(<StockWidget />);
    const searchInput = screen.getByPlaceholderText(
      "Search stock by stock picker"
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("calls setSearchTerm and setLoading on input change", () => {
    render(<StockWidget />);
    const searchInput = screen.getByPlaceholderText(
      "Search stock by stock picker"
    );
    fireEvent.change(searchInput, { target: { value: "AAPL" } });
    expect(setSearchTerm).toHaveBeenCalledWith("AAPL");
    expect(setLoading).toHaveBeenCalledWith(true);
  });

  it("renders suggestions when suggestions are available", async () => {
    const mockSuggestions = [
      { name: "Apple Inc.", symbol: "AAPL" },
      { name: "Amazon.com Inc.", symbol: "AMZN" },
    ];
    useStockWidgetContext.mockReturnValue({
      searchTerm: "AAPL",
      suggestions: mockSuggestions,
      setLoading,
      setSearchTerm,
    });

    render(
      <MemoryRouter>
        <StockWidget />
      </MemoryRouter>
    );

    const suggestionItems = screen.getAllByRole("listitem");
    expect(suggestionItems).toHaveLength(mockSuggestions.length);

    // Ensure that suggestion items are rendered correctly
    mockSuggestions.forEach((item, index) => {
      const suggestionText = `${item.name} (${item.symbol})`;
      expect(screen.getByText(suggestionText)).toBeInTheDocument();
    });
  });

  it("navigates to the stock details page when clicking on a suggestion", () => {
    const mockSuggestions = [{ name: "Apple Inc.", symbol: "AAPL" }];
    useStockWidgetContext.mockReturnValue({
      searchTerm: "AAPL",
      suggestions: mockSuggestions,
      setLoading,
      setSearchTerm,
    });

    render(
      <MemoryRouter>
        <StockWidget />
      </MemoryRouter>
    );

    const suggestionItem = screen.getByText("Apple Inc. (AAPL)");
    fireEvent.click(suggestionItem);

    expect(setSearchTerm).toHaveBeenCalledWith("");
    expect(setLoading).toHaveBeenCalledWith(true);
    // Assert that the navigate function from useNavigate was called with the correct path
    // For simplicity, you can mock the useNavigate hook to spy on the function.
  });
});
