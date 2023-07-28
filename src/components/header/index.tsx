import React from "react";
import Logo from "../../images/logo.svg";
import { Navbar, Nav, Form, FormControl, Button, Col } from "react-bootstrap";

import StockWidget from "../stock-widget";
import "./index.css";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";

const Header = () => {
  const location = useLocation();
  const intl = useIntl();

  return (
    <Navbar bg="light" expand="lg" className="header content-area">
      <Col lg={2} xs={2}>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            alt="Logo"
            height="30"
            width="auto"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Col>
      <Col lg={7} xs={4} className="search-container">
        <StockWidget />
      </Col>

      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="mobile-menu">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link
              href="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              {intl.formatMessage({ id: "header_menu.home" })}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/help"
              className={location.pathname === "/help" ? "active" : ""}
            >
              {intl.formatMessage({ id: "header_menu.help" })}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              {intl.formatMessage({ id: "header_menu.about" })}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
