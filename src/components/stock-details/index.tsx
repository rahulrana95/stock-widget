import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StockChart from "../chart";
import StockWidget from "../stock-widget";
import { Col, Row, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./index.css";
import fetchTickerDetails from "../../services/getTickerDetails";

const Labels: {
  [key: string]: string;
} = {
  name: "Name",
  symbol: "Symbol",
  marketCap: "Market Cap",
  peRatio: "PE Ratio",
  description: "Description",
  currentPrice: "Current Price",
  industry: "Industry",
  sector: "Sector",
};

export type Stock = {
  name: string;
  symbol: string;
  description: string;
  currentPrice: string;
  industry: string;
  peRatio: string;
  marketCap: string;
  sector: string;
  chart: any;
};

const keysToSkip: {
  [key: string]: string;
} = {
  description: "description",
  chart: "chart",
};

type StockDetailsT = {
  stock: Stock | null;
  ticker?: string;
  error?: string;
  isLoading: boolean;
};
const StockDetails = ({ stock, ticker, error, isLoading }: StockDetailsT) => {
  return (
    <div className="stock-details content-area">
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && (
        <div className="error-message">
          <span role="img" aria-label="Error">
            ❌
          </span>{" "}
          {error} {/* Display the error message */}
        </div>
      )}
      {!isLoading && !error && (
        <Row>
          <Col lg={6} sm={12} className="stock-chart">
            <StockChart symbol={ticker} chartData={stock?.chart} />
          </Col>
          <Col lg={6} sm={12} className="stock-details-items">
            {Object.entries(stock ?? {})
              .filter(([key]) => !keysToSkip[key])
              .map(([key, value]) => {
                const renderTooltip = (text: string) => (
                  <Tooltip className="stock-item-tooltip">{text}</Tooltip>
                );

                return (
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(value)}
                  >
                    <Card className="stock-info-box">
                      <Card.Body>
                        <Card.Title className="title">
                          {Labels[key] ?? "N/A"}
                        </Card.Title>
                        <Card.Text className="description d-xs-block d-sm-block d-md-block">
                          {value}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </OverlayTrigger>
                );
              })}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default StockDetails;
