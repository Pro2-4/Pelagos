import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Navbar,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { ROUTES } from "../../config/routes";
import useCart from "../../hooks/useCart";
import useFavorites from "../../hooks/useFavorites";
import useAuth from "../../hooks/useAuth";

const TopBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const cartItemCount = useCart();
  const favoriteItemCount = useFavorites();
  const { currentUser, handleLogout } = useAuth();

  return (
    <div className="bg-white py-2 border-bottom">
      <Container>
        <Row className="align-items-center">
          {/* Social Icons */}
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-start mb-2 mb-md-0"
          >
            <a
              href="https://www.facebook.com"
              className="text-dark me-3"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-dark me-3"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://x.com"
              className="text-dark me-3"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.youtube.com"
              className="text-dark me-3"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>
          </Col>

          {/* Logo */}
          <Col xs={12} md={4} className="text-center mb-2 mb-md-0">
            <Navbar.Brand
              as={Link}
              to={ROUTES.HOME}
              className="fw-bold"
              style={{ fontSize: "32px" }}
            >
              PELAGOS
            </Navbar.Brand>
          </Col>

          {/* Search and Icons */}
          <Col
            xs={12}
            md={4}
            className="d-flex align-items-center justify-content-center justify-content-md-end"
          >
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <Button
                type="submit"
                className="border-0 bg-white text-dark"
                aria-label="Tìm kiếm"
              >
                <FaSearch />
              </Button>
              <Form.Control
                type="search"
                placeholder="Tìm sản phẩm..."
                className="me-2 border-0"
                aria-label="Tìm kiếm sản phẩm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ boxShadow: "none", outline: "none" }}
              />
            </Form>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Nav.Link
                as={Link}
                to={ROUTES.FAVORITES}
                className="text-dark position-relative"
                aria-label="Danh sách yêu thích"
              >
                <FaHeart size={20} />
                {currentUser && favoriteItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {favoriteItemCount}
                    <span className="visually-hidden">
                      số lượng sản phẩm yêu thích
                    </span>
                  </span>
                )}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={ROUTES.CART}
                className="text-dark position-relative"
                aria-label="Giỏ hàng"
              >
                <FaShoppingCart size={20} />
                {currentUser && cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemCount}
                    <span className="visually-hidden">
                      số lượng sản phẩm trong giỏ hàng
                    </span>
                  </span>
                )}
              </Nav.Link>
              {currentUser ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as={Nav.Link}
                    className="text-dark"
                    aria-label="Menu người dùng"
                  >
                    <FaUser size={20} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>
                      {currentUser?.name || "Người dùng"}
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to={ROUTES.PROFILE}>
                      Thông tin cá nhân
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={ROUTES.ORDERS}>
                      Đơn hàng của tôi
                    </Dropdown.Item>
                    {currentUser?.role === "admin" && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to={ROUTES.ADMIN}>
                          Quản trị Admin
                        </Dropdown.Item>
                      </>
                    )}
                    <Dropdown.Item onClick={handleLogout}>
                      Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link
                  as={Link}
                  to={ROUTES.LOGIN}
                  className="text-dark"
                  aria-label="Đăng nhập"
                >
                  <FaUser size={20} />
                </Nav.Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(TopBar);
