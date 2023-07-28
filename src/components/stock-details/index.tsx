import React from "react";
import StockChart from "../chart";
import { Col, Row, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./index.css";
import { useIntl } from "react-intl";

const Labels: {
  [key: string]: string;
} = {
  name: "stock_view.name",
  symbol: "stock_view.symbol",
  marketCap: "stock_view.market_cap",
  peRatio: "stock_view.pe_ration",
  description: "stock_view.escription",
  currentPrice: "stock_view.current_price",
  industry: "stock_view.industry",
  sector: "stock_view.sector",
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
  const intl = useIntl();

  return (
    <div className="stock-details content-area">
      {isLoading && (
        <div>
          {intl.formatMessage({
            id: "loading",
          })}
          ...
        </div>
      )}
      {!isLoading && error && (
        <div className="error-message">
          <span role="img" aria-label="Error">
            ❌
          </span>
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
                          {intl.formatMessage({
                            id: Labels[key] ?? "data_not_found.na",
                          })}
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
