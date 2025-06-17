import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="justify-content-between">
          <Col md={4} lg={3} className="mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-4">PELAGOS</h5>
            <p className="text-white-50">
              Chuyên cung cấp các sản phẩm thời trang nam chất lượng cao với giá
              cả phải chăng. Luôn cập nhật xu hướng mới nhất.
            </p>
            <div className="d-flex mt-3">
              <a
                href="https://www.facebook.com"
                className="text-white me-3 hover-opacity"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-white me-3 hover-opacity"
              >
                <FaInstagram size={24} />
              </a>
              <a href="https://x.com" className="text-white me-3 hover-opacity">
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.youtube.com"
                className="text-white hover-opacity"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </Col>

          <Col md={2} lg={2} className="mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-4">Liên kết nhanh</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Sản phẩm
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={2} lg={2} className="mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-4">Chính sách</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/shipping"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/return"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/terms"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4} lg={3}>
            <h5 className="text-uppercase fw-bold mb-4">Liên hệ</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">
                <i className="fas fa-home me-3"></i>123 Đường ABC, Quận XYZ, TP.HCM
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-3"></i> pelagos@mensfashion.com
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-3"></i> (028) 1234 5678
              </li>
              <li className="mb-2">
                <i className="fas fa-clock me-3"></i> 8:00 - 20:00
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" />

        <div className="text-center text-white-50">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} PELAGOS. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
