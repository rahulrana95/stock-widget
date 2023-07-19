// StockWidgetContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
// import debounce from "lodash/debounce";
import getTickerSuggestions, { Ticker } from "../services/getTickets";
import { useNavigate } from "react-router-dom";
import { getTickerSuggestionsResponse } from "../services/getTickets";

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function debouncedFunction(...args: Parameters<T>): void {
    // Clear any previous timeouts
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

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

  const debounceApi = useCallback(
    debounce((searchTerm: string) => {
      // console.log(endTime - startTime.current);
      setLoading(true);
      // Check if suggestions are cached for the current search term
      if (cachedSuggestions[searchTerm]) {
        setSuggestions(cachedSuggestions[searchTerm]);
        setLoading(false);
      } else {
        const returnPromise: Promise<getTickerSuggestionsResponse> =
          getTickerSuggestions(searchTerm);

        returnPromise.then((response) => {
          console.log(response.tickers);
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
    }, 500), // Adjust the debounce delay here (in milliseconds)
    [cachedSuggestions]
  );

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      debounceApi(searchTerm);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [searchTerm]);

  console.log(loading);
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
