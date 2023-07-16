import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StockChart from "../chart";
import StockWidget from "../stock-widget";
import { Col, Row, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./index.css";
import fetchTickerDetails from "../../services/getTickerDetails";

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

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

type Stock = {
  name: string;
  symbol: string;
  description: string;
  currentPrice: string;
  industry: string;
  peRatio: string;
  marketCap: string;
  sector: string;
};

const keysToSkip: {
  [key: string]: string;
} = {
  description: "description",
};

const StockDetails = () => {
  const params = useParams();
  const { ticker } = params;
  const [stock, setStock] = useState<Stock | null>(null);

  useEffect(() => {
    if (ticker) {
      fetchTickerDetails(ticker)
        .then((response: any) => {
          setStock({
            name: titleCase(response.Name),
            symbol: response.Symbol,
            description: response.Description,
            currentPrice: "120",
            industry: titleCase(response.Industry),
            sector: titleCase(response.Sector),
            peRatio: titleCase(response.PERatio),
            marketCap: Intl.NumberFormat("en", {
              notation: "compact",
            }).format(parseInt(response.MarketCapitalization)),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ticker]);
  //   GLOBAL_QUOTE
  return (
    <div className="stock-details content-area">
      <Row>
        <Col lg={6} sm={12} className="stock-chart">
          <StockChart symbol={ticker} />
        </Col>
        <Col lg={6} sm={12} className="stock-details-items">
          {Object.entries(stock ?? {})
            .filter(([key]) => !keysToSkip[key])
            .map(([key, value]) => {
              const renderTooltip = (text: string) => (
                <Tooltip className="stock-item-tooltip">{text}</Tooltip>
              );

              return (
                <OverlayTrigger placement="top" overlay={renderTooltip(value)}>
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
    </div>
  );
};

export default StockDetails;
