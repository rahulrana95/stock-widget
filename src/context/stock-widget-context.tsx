// StockWidgetContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { debounce } from "../utils";
import getTickerSuggestions, { Ticker } from "../services/getTickets";
import { useNavigate } from "react-router-dom";
import { getTickerSuggestionsResponse } from "../services/getTickets";

type StockWidgetContextValue = {
  searchTerm: string;
  suggestions: Ticker[];
  loading: boolean;
  setSuggestions: (suggestions: Ticker[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchTerm: (searchTerm: string) => void;
};

const StockWidgetContext = createContext<StockWidgetContextValue>({
  searchTerm: "",
  suggestions: [],
  loading: false,
  setSuggestions: () => {},
  setLoading: () => {},
  setSearchTerm: () => {},
});

const useStockWidgetContext = () => useContext(StockWidgetContext);

interface StockWidgetProviderProps {
  children: React.ReactNode;
}

const StockWidgetProvider: React.FC<StockWidgetProviderProps> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cachedSuggestions, setCachedSuggestions] = useState<{
    [term: string]: Ticker[];
  }>({});

  const getTickerSuggestionsDebounced = debounce(getTickerSuggestions, 300);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      // Check if suggestions are cached for the current search term
      if (cachedSuggestions[searchTerm]) {
        setSuggestions(cachedSuggestions[searchTerm]);
        setLoading(false);
      } else {
        const returnPromise: Promise<getTickerSuggestionsResponse> =
          getTickerSuggestionsDebounced(searchTerm);

        returnPromise.then((response) => {
          const filteredSuggestions = response?.tickers ?? [];
          setSuggestions([...filteredSuggestions]);
          // Cache the suggestions for the current search term
          setCachedSuggestions((prevCached) => ({
            ...prevCached,
            [searchTerm]: filteredSuggestions,
          }));
          setLoading(false);
        });
      }
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [searchTerm]);

  const contextValue: StockWidgetContextValue = {
    searchTerm,
    suggestions,
    loading,
    setSuggestions,
    setLoading,
    setSearchTerm,
  };

  return (
    <StockWidgetContext.Provider value={contextValue}>
      {children}
    </StockWidgetContext.Provider>
  );
};

export { useStockWidgetContext, StockWidgetProvider };
