import React, { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import SearchIcon from "../../images/search-icon.svg";
import "./index.css";

const StockWidget = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      // Mock API call or data retrieval logic to fetch autocomplete suggestions
      // Replace this with your actual logic
      const mockSuggestions = [
        "Apple",
        "Banana",
        "Cherry",
        "Durian",
        "Elderberry",
        "Fig",
        "Grape",
        "Honeydew",
        "Imbe",
        "Jackfruit",
        "Kiwi",
        "Lemon",
        "Mango",
        "Nectarine",
        "Orange",
        "Papaya",
        "Quince",
        "Raspberry",
        "Strawberry",
        "Tomato",
        "Ugli fruit",
        "Vanilla",
        "Watermelon",
        "Xigua",
        "Yellow passionfruit",
        "Zucchini",
      ];

      // Filter suggestions based on the search term
      const filteredSuggestions = mockSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSearchTerm(value);
    setLoading(true);
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
            suggestions.map((item, index) => (
              <ListGroup.Item key={index}>{item}</ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </div>
  );
};

export default StockWidget;
