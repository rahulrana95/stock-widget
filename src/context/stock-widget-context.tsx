// StockWidgetContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import debounce from "lodash/debounce";
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
  const startTime = new Date().getTime();

  const debounceAPi = useCallback(() => {
    console.log(searchTerm);
    const endTime = new Date().getTime();

    console.log(endTime - startTime);
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
  }, [searchTerm]);

  const getTickerSuggestionsDebounced = useCallback(
    debounce(debounceAPi, 1000),
    [debounceAPi]
  );

  useEffect(() => {
    if (searchTerm) {
      getTickerSuggestionsDebounced();
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
