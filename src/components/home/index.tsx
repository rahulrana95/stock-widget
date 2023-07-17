import React from "react";
import StockChart from "../chart";
import Header from "../header";
import "./index.css";
import { Container, Row, Col, Table } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home content-area">
      <Container fluid className="home-page">
        <Row>
          <Col>
            <h1>Welcome to TickerInsight!</h1>
            <p className="sub-heading">
              Your Comprehensive Stock Market Analytics Platform
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>Volume</th>
                  <th>Market Cap</th>
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
              <h2>Why Choose Stocklytics?</h2>
              <p>
                At Stocklytics, we provide you with cutting-edge tools and
                insights to make informed investment decisions. Our platform
                offers comprehensive analytics, real-time data, and intuitive
                visualizations, empowering you to navigate the stock market with
                confidence.
              </p>
              <p>With Stocklytics, you can:</p>
              <ul>
                <li>Track the performance of your favorite stocks</li>
                <li>Analyze historical price trends</li>
                <li>Receive personalized investment recommendations</li>
                <li>Stay up-to-date with the latest market news</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
