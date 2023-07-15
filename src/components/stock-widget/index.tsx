import React, { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form, ListGroup } from "react-bootstrap";
import SearchIcon from "../../images/search-icon.svg";
import "./index.css";
import getTickerSuggestions, {
  getTickerSuggestionsResponse,
  Ticker,
} from "../../services/getTickets";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../utils";

const StockWidget = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const getTickerSuggestionsDebounced = debounce(getTickerSuggestions, 300);

  useEffect(() => {
    const returnPromise: Promise<getTickerSuggestionsResponse> =
      getTickerSuggestionsDebounced(searchTerm);

    returnPromise.then((response) => {
      const filteredSuggestions = response?.tickers ?? [];
      setSuggestions([...filteredSuggestions]);
      setLoading(false);
    });
  }, [searchTerm]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSearchTerm(value);
    setLoading(true);
  };

  const onClickSuggestItem = (item: Ticker) => {
    navigate(`/stock/${item.symbol}`);
    setSearchTerm("");
  };

  return (
    <div className="stock-widget">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <img src={SearchIcon} alt="Search icon" className="search-icon" />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search stock by stock picker"
          aria-label="Search stock by stock picker"
          aria-describedby="Search stock by stock picker"
          value={searchTerm}
          onChange={handleChange}
        />
      </InputGroup>
      {suggestions.length > 0 && (
        <ListGroup className="autocomplete-list suggestions-list">
          {loading && (
            <div className="loading-dots-container">
              <span className="loading-dots">Loading</span>
              <span className="loading-dots">.</span>
              <span className="loading-dots">.</span>
              <span className="loading-dots">.</span>
            </div>
          )}
          {!loading &&
            searchTerm &&
            suggestions.map((item, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="suggestion-item"
                  onClick={() => onClickSuggestItem(item)}
                >
                  {" "}
                  {`${item.name} (${item.symbol})` ?? "Missing name"}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      )}
    </div>
  );
};

export default StockWidget;
