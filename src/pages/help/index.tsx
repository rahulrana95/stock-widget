import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./index.css"; // Import custom CSS for additional styling
import HelpImage from "../../images/contact-us.png"; // Replace with the path to your PNG image

const HelpPage: React.FC = () => {
  return (
    <div className="help-page content-area">
      <Row>
        <Col>
          <h1>Help Page</h1>
          <p>
            If you have any issues or need more information, please feel free to
            reach out to us. 😊
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="help-card">
            <Card.Body>
              <Card.Title>Contact Us</Card.Title>
              <Card.Text>
                For any inquiries or assistance, you can contact us via email or
                through our customer support. 📧
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> support@example.com
              </Card.Text>
              <img src={HelpImage} alt="Contact" className="help-image" />
              <Button variant="primary">Contact Support</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="help-card">
            <Card.Body>
              <Card.Title>Frequently Asked Questions</Card.Title>
              <Card.Text>
                Browse through our FAQs to find answers to commonly asked
                questions and learn more about our services. 📚
              </Card.Text>
              <Button variant="primary">View FAQs</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HelpPage;
