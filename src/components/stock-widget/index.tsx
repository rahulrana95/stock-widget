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
import { useStockWidgetContext } from "../../context/stock-widget-context";
import CloseIcon from "../../images/close-icon.png";

const StockWidget = (props: any) => {
  const { searchTerm, suggestions, loading, setLoading, setSearchTerm } =
    useStockWidgetContext();

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSearchTerm(value);
    setLoading(true);
  };

  const onClickSuggestItem = (item: Ticker) => {
    navigate(`/stock/${item.symbol}`);
    setSearchTerm("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/stock/${searchTerm}`);
    }
  };

  return (
    <div className="stock-widget">
      <InputGroup>
        <InputGroup.Text id="basic-addon1">
          <img src={SearchIcon} alt="Search icon" className="search-icon" />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search stock by stock picker"
          aria-label="Search stock by stock picker"
          aria-describedby="Search stock by stock picker"
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <InputGroup.Text
          onClick={handleClearSearch}
          className={`clear-icon ${searchTerm ? "" : "hide-clear-icon"}`}
        >
          <img src={CloseIcon} alt="Clear icon" className="close-icon" />
        </InputGroup.Text>
      </InputGroup>
      {loading && (
        <div className="loading-dots-container">
          <span className="loading-dots">Loading</span>
          <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
        </div>
      )}

      {!loading && searchTerm && (
        <ListGroup className="autocomplete-list suggestions-list">
          <div>
            {suggestions.map((item, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="suggestion-item"
                  onClick={() => onClickSuggestItem(item)}
                >
                  {`${item.name} (${item.symbol})` ?? "Missing name"}
                </ListGroup.Item>
              );
            })}
            <div className="no-result">No results.</div>
          </div>
        </ListGroup>
      )}
    </div>
  );
};

export default StockWidget;
