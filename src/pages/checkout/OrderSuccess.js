import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-5 d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 order-success-card animate__animated animate__fadeInDown">
            <Card.Body className="text-center p-5">
              <FaCheckCircle
                size={80}
                className="text-success mb-4 animate__animated animate__bounceIn"
              />
              <h2 className="fw-bold mb-3">Đặt hàng thành công!</h2>
              <p className="mb-4 fs-5 text-muted">
                Cảm ơn bạn đã tin tưởng và mua sắm tại{" "}
                <span className="fw-bold text-primary">PELAGOS</span>.<br />
                Đơn hàng của bạn đã được ghi nhận và sẽ được xử lý trong thời
                gian sớm nhất.
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate("/")}
                >
                  Về trang chủ
                </Button>
                <Button
                  size="lg"
                  variant="outline-success"
                  onClick={() => navigate("/orders")}
                >
                  Xem đơn hàng
                </Button>
              </div>
              <div className="mt-4">
                <span className="text-secondary">
                  Tiếp tục mua sắm để nhận nhiều ưu đãi hấp dẫn!
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;
