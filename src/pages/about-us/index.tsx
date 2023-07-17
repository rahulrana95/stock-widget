import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./index.css"; // Import custom CSS for additional styling

const AboutUsPage: React.FC = () => {
  return (
    <Container className="about-us-page content-area">
      <Row>
        <Col>
          <h1>
            Welcome to the Stock Picker Widget: Your Ultimate Stock Market
            Companion! 📈🔍
          </h1>
          <p>
            At Stock Picker, we are dedicated to providing you with a powerful
            and user-friendly tool to simplify your stock market research and
            analysis. Our intuitive interface and advanced features empower you
            to search, explore, and retrieve comprehensive details about stocks.
            💪🔎💼
          </p>
          <p>
            With the Stock Picker Widget, you can access a wealth of stock
            information, including:
          </p>
          <ul>
            <li>Name and Symbol of the company 🏢💼</li>
            <li>Description ℹ️</li>
            <li>Current Price 💰</li>
            <li>Change it's traded on 📊</li>
            <li>Industry 🏭</li>
            <li>PE Ratio 📈</li>
            <li>Market Cap 💵</li>
            <li>
              Stock price chart for the day 📈 (Good to have, not mandatory) 📅
            </li>
          </ul>
          <p>Key Features of the Stock Picker Widget include:</p>
          <ul>
            <li>
              User-friendly interface for effortless stock searching and
              exploration 🔍🌐
            </li>
            <li>
              Intelligent auto-complete functionality for quick and accurate
              results 🚀🔍
            </li>
            <li>
              Detailed stock information to make informed investment decisions
              💡💼
            </li>
            <li>
              Ability to perform multiple searches for enhanced research
              flexibility 🔍🔄
            </li>
            <li>
              Seamless navigation to easily review previous and next search
              results ⏪⏩
            </li>
            <li>
              Automatic data refresh for up-to-date stock market trends ⏱️🔄
            </li>
          </ul>
          <p>
            Our mission is to provide you with the most comprehensive and
            reliable stock market information to support your investment
            journey. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam eu metus sed turpis posuere dignissim vitae et tellus.
          </p>
          <p>
            Our values revolve around transparency, accuracy, and
            user-centricity. We strive to deliver an exceptional user experience
            and empower you with the tools and information you need to succeed.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            metus sed turpis posuere dignissim vitae et tellus.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="about-us-card">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                Our mission is to provide you with the most comprehensive and
                reliable stock market information to support your investment
                journey. We are committed to delivering accurate and up-to-date
                data, empowering you to make informed decisions and seize
                investment opportunities
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="about-us-card">
            <Card.Body>
              <Card.Title>Our Values</Card.Title>
              <Card.Text>
                Our values revolve around transparency, integrity, and
                user-centricity. We believe in putting our users first and
                ensuring that our platform meets their needs. We are driven by a
                passion for innovation and continuous improvement, constantly
                striving to deliver the best possible user experience
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
