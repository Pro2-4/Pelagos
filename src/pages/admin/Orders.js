import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Badge,
  Form,
} from "react-bootstrap";
import { FaEye, FaTruck, FaCheck, FaTimes } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "Chờ xử lý", label: "Chờ xử lý" },
    { value: "Đang xử lý", label: "Đang xử lý" },
    { value: "Đang giao", label: "Đang giao" },
    { value: "Đã giao", label: "Đã giao" },
    { value: "Đã hủy", label: "Đã hủy" },
  ];

  const filteredOrders = orders.filter(
    (order) => filterStatus === "all" || order.status === filterStatus
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      "Chờ xử lý": "warning",
      "Đang xử lý": "info",
      "Đang giao": "primary",
      "Đã giao": "success",
      "Đã hủy": "danger",
    };
    return <Badge bg={statusMap[status] || "secondary"}>{status}</Badge>;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý đơn hàng</h2>
        <div className="d-flex gap-2">
          <Form.Select
            style={{ width: "200px" }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Số điện thoại</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                    <br />
                    <small className="text-muted">
                      Tracking: {order.trackingCode}
                    </small>
                  </td>
                  <td>
                    {order.shippingInfo?.firstName}{" "}
                    {order.shippingInfo?.lastName}
                    <br />
                    <small className="text-muted">
                      {order.shippingInfo?.address},{" "}
                      {order.shippingInfo?.district}
                    </small>
                  </td>
                  <td>{order.shippingInfo?.phone}</td>
                  <td>
                    <strong>{formatPrice(order.total)}</strong>
                    <br />
                    <small className="text-muted">
                      Phí ship: {formatPrice(order.shippingFee)}
                    </small>
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>{order.date}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <FaEye />
                      </Button>
                      {order.status === "Chờ xử lý" && (
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(order.id, "Đang xử lý")
                          }
                        >
                          <FaCheck />
                        </Button>
                      )}
                      {order.status === "Đang xử lý" && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(order.id, "Đang giao")
                          }
                        >
                          <FaTruck />
                        </Button>
                      )}
                      {order.status === "Đang giao" && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "Đã giao")}
                        >
                          <FaCheck />
                        </Button>
                      )}
                      {order.status !== "Đã giao" &&
                        order.status !== "Đã hủy" && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              updateOrderStatus(order.id, "Đã hủy")
                            }
                          >
                            <FaTimes />
                          </Button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">Không có đơn hàng nào</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Order Detail Modal */}
      <OrderDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        order={selectedOrder}
      />
    </Container>
  );
};

// Order Detail Modal Component
const OrderDetailModal = ({ show, onHide, order }) => {
  if (!order) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn hàng - {order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h6>Thông tin khách hàng</h6>
            <p>
              <strong>Tên:</strong> {order.shippingInfo?.firstName}{" "}
              {order.shippingInfo?.lastName}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.shippingInfo?.address}
            </p>
            <p>
              <strong>Quận/Huyện:</strong> {order.shippingInfo?.district}
            </p>
            <p>
              <strong>Tỉnh/Thành:</strong> {order.shippingInfo?.city}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.shippingInfo?.phone}
            </p>
          </Col>
          <Col md={6}>
            <h6>Thông tin đơn hàng</h6>
            <p>
              <strong>Mã đơn hàng:</strong> {order.id}
            </p>
            <p>
              <strong>Mã tracking:</strong> {order.trackingCode}
            </p>
            <p>
              <strong>Ngày đặt:</strong> {order.date}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Ghi chú:</strong> {order.note || "Không có"}
            </p>
          </Col>
        </Row>

        <hr />

        <h6>Sản phẩm đã đặt</h6>
        <Table responsive>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{formatPrice(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-end">
          <p>
            <strong>Phí ship:</strong> {formatPrice(order.shippingFee)}
          </p>
          <h5>
            <strong>Tổng cộng:</strong> {formatPrice(order.total)}
          </h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Orders;
