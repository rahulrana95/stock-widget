import React from "react";
import "./index.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useIntl } from "react-intl";

const Home = () => {
  const intl = useIntl();
  return (
    <div className="home content-area">
      <Container fluid className="home-page">
        <Row>
          <Col>
            <h1>{intl.formatMessage({ id: "home.welcome_to_ticket" })} </h1>
            <p className="sub-heading">
              {intl.formatMessage({
                id: "home.heading_stock_market_analytics_platform",
              })}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>
                    {intl.formatMessage({
                      id: "home.stock",
                    })}
                  </th>
                  <th>
                    {intl.formatMessage({
                      id: "home.price",
                    })}
                  </th>
                  <th>
                    {intl.formatMessage({
                      id: "home.change",
                    })}
                  </th>
                  <th>
                    {intl.formatMessage({
                      id: "home.volume",
                    })}
                  </th>
                  <th>
                    {intl.formatMessage({
                      id: "home.market_cap",
                    })}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>APPL</td>
                  <td>$150.25</td>
                  <td className="positive">+1.5%</td>
                  <td>1,234,567</td>
                  <td>$2.5T</td>
                </tr>
                <tr>
                  <td>GOOG</td>
                  <td>$2,850.80</td>
                  <td className="negative">-0.8%</td>
                  <td>987,654</td>
                  <td>$1.9T</td>
                </tr>
                <tr>
                  <td>MSFT</td>
                  <td>$350.45</td>
                  <td className="positive">+2.2%</td>
                  <td>765,432</td>
                  <td>$2.0T</td>
                </tr>
                <tr>
                  <td>TSLA</td>
                  <td>$900.60</td>
                  <td className="positive">+3.5%</td>
                  <td>543,210</td>
                  <td>$700B</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="info-section">
              <h2>
                {intl.formatMessage({
                  id: "home.why_choose_stockalyitcs",
                })}
              </h2>
              <p>
                {intl.formatMessage({
                  id: "home.stock_desc",
                })}
              </p>
              <p>
                {intl.formatMessage({
                  id: "home.with_stock_you_can",
                })}
              </p>
              <ul>
                <li>
                  {intl.formatMessage({
                    id: "home.track_perfm",
                  })}
                </li>
                <li>
                  {intl.formatMessage({
                    id: "home.historical_price",
                  })}
                </li>
                <li>
                  {intl.formatMessage({
                    id: "home.recomendation",
                  })}
                </li>
                <li>
                  {" "}
                  {intl.formatMessage({
                    id: "home.upto_date",
                  })}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
