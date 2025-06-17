import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";

const NAV_ITEMS = [
  { path: ROUTES.HOME, text: "TRANG CHỦ" },
  { path: ROUTES.PRODUCTS, text: "SẢN PHẨM" },
  { path: ROUTES.NEW_ARRIVALS, text: "NEW ARRIVALS" },
  { path: ROUTES.SALE, text: "SALE" },
  { path: ROUTES.ABOUT, text: "VỀ PELAGOS" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <Navbar bg="white" expand="lg" className="py-0">
      <Container>
        <Navbar.Toggle aria-controls="bottom-navbar-nav" />
        <Navbar.Collapse id="bottom-navbar-nav">
          <Nav
            className="mx-auto"
            style={{ fontFamily: "Inter, sans-serif", gap: "1.5rem" }}
          >
            {NAV_ITEMS.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`pt-2 fw-500 font-inter text-dark nav-link-custom ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <span className="nav-link-text">{item.text}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(BottomNav);
