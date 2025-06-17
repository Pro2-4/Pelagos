import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Nav,
  Modal,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaTruckMoving,
  FaHourglassHalf,
  FaRedoAlt,
  FaStar,
  FaTrashAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import "../../styles/pages/MyOrders.css";
import { Steps } from "antd";
import { formatPrice } from "../../utils";
import { ORDER_STATUS } from "../../constants";
import { toast } from "react-toastify";

const statusMap = {
  [ORDER_STATUS.DELIVERED]: { color: "success", icon: <FaCheckCircle /> },
  [ORDER_STATUS.SHIPPING]: { color: "info", icon: <FaTruckMoving /> },
  [ORDER_STATUS.CANCELLED]: { color: "danger", icon: <FaTimesCircle /> },
  [ORDER_STATUS.PENDING]: { color: "warning", icon: <FaHourglassHalf /> },
};

const statusOrder = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.SHIPPING,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.CANCELLED,
];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Tạo tabs động theo trạng thái thực tế
  const tabList = [
    { key: "all", label: "Tất cả", count: orders.length },
    ...statusOrder
      .map((status) => ({
        key: status,
        label: status,
        count: orders.filter((o) => o.status === status).length,
      }))
      .filter((tab) => tab.count > 0),
  ];

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  // Hủy đơn hàng (chỉ khi Chờ xác nhận)
  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId && order.status === ORDER_STATUS.PENDING
        ? { ...order, status: ORDER_STATUS.CANCELLED }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setShowCancelModal(false);
    setOrderToCancel(null);
    toast.success("Đã hủy đơn hàng!");
  };

  // Mua lại (thêm sản phẩm vào cart)
  const handleReorder = (order) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    order.items.forEach((item) => {
      const idx = cartItems.findIndex((c) => c.id === item.id);
      if (idx > -1) {
        cartItems[idx].quantity += item.quantity;
      } else {
        cartItems.push({
          id: item.id || item.name,
          quantity: item.quantity,
        });
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "/cart";
  };

  // Đánh giá (hiện tại chỉ alert demo)
  const handleReview = (order) => {
    alert("Cảm ơn bạn đã đánh giá đơn hàng " + order.id + "!");
  };

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleShowCancelModal = (order) => {
    setOrderToCancel(order);
    setShowCancelModal(true);
  };

  return (
    <Container className="py-5 min-vh-100">
      <Row className="justify-content-center">
        <Col md={11} lg={10}>
          <Card className="shadow-lg border-0 my-orders-card animate__animated animate__fadeIn">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <FaBoxOpen size={32} className="text-primary me-2" />
                <h3 className="fw-bold mb-0">Đơn hàng của tôi</h3>
              </div>
              <Nav
                variant="pills"
                className="mb-4 flex-wrap"
                activeKey={activeTab}
                onSelect={setActiveTab}
              >
                {tabList.map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link eventKey={tab.key} className="order-tab">
                      {tab.label}{" "}
                      <Badge bg="light" text="dark">
                        {tab.count}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Table responsive hover className="align-middle text-center">
                <thead className="table-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Ngày đặt</th>
                    <th>Sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-5 text-muted">
                        <FaSearch size={32} className="mb-2" />
                        <div>Không có đơn hàng nào.</div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="order-row">
                        <td className="fw-bold">{order.id}</td>
                        <td>{order.date}</td>
                        <td className="text-start">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="d-flex align-items-center mb-2 gap-2"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                                rounded
                                className="border"
                                style={{ objectFit: "cover" }}
                              />
                              <div
                                className="text-truncate"
                                style={{ maxWidth: 120 }}
                              >
                                <span className="fw-semibold">{item.name}</span>
                                <div className="small text-muted">
                                  x{item.quantity}
                                </div>
                              </div>
                            </div>
                          ))}
                        </td>
                        <td>
                          <Badge
                            bg={statusMap[order.status]?.color || "secondary"}
                            className="px-3 py-2 fs-6"
                          >
                            <span className="me-1 align-middle">
                              {statusMap[order.status]?.icon}
                            </span>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="text-danger fw-bold">
                          {formatPrice(order.total)}
                        </td>
                        <td className="d-flex flex-column gap-2 align-items-center">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => handleShowModal(order)}
                          >
                            Xem chi tiết
                          </Button>
                          {order.status === "Chờ xác nhận" && (
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Hủy đơn hàng</Tooltip>}
                            >
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleShowCancelModal(order)}
                              >
                                <FaTrashAlt /> Hủy đơn
                              </Button>
                            </OverlayTrigger>
                          )}
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Mua lại đơn này</Tooltip>}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={() => handleReorder(order)}
                            >
                              <FaRedoAlt /> Mua lại
                            </Button>
                          </OverlayTrigger>
                          {order.status === "Đã giao hàng" && (
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Đánh giá đơn hàng</Tooltip>}
                            >
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => handleReview(order)}
                              >
                                <FaStar /> Đánh giá
                              </Button>
                            </OverlayTrigger>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Modal chi tiết đơn hàng */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaTruckMoving className="me-2 text-primary" />
            Chi tiết đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <div className="mb-3">
                <strong>Mã đơn:</strong> {selectedOrder.id} <br />
                <strong>Mã vận đơn:</strong> {selectedOrder.trackingCode} <br />
                <strong>Trạng thái:</strong>{" "}
                <Badge
                  bg={statusMap[selectedOrder.status]?.color || "secondary"}
                >
                  {statusMap[selectedOrder.status]?.icon} {selectedOrder.status}
                </Badge>
              </div>
              {/* Stepper tracking */}
              <div className="mb-4">
                <Steps
                  direction="horizontal"
                  size="small"
                  current={
                    selectedOrder.status === "Đã giao hàng"
                      ? 3
                      : selectedOrder.status === "Đang giao"
                      ? 2
                      : selectedOrder.status === "Chờ xác nhận"
                      ? 1
                      : selectedOrder.status === "Đã hủy"
                      ? 0
                      : 0
                  }
                  items={[
                    { title: "Đặt hàng" },
                    { title: "Chờ xác nhận" },
                    { title: "Đang giao" },
                    { title: "Đã giao" },
                  ]}
                />
              </div>
              <div className="mb-3 p-3 bg-light rounded">
                <FaUser className="me-2 text-secondary" />
                <strong>
                  {selectedOrder.shippingInfo?.lastName}{" "}
                  {selectedOrder.shippingInfo?.firstName}
                </strong>{" "}
                |
                <FaPhoneAlt className="mx-2 text-secondary" />
                {selectedOrder.shippingInfo?.phone} |
                <FaMapMarkerAlt className="mx-2 text-secondary" />
                {selectedOrder.shippingInfo?.address},{" "}
                {selectedOrder.shippingInfo?.ward},{" "}
                {selectedOrder.shippingInfo?.district},{" "}
                {selectedOrder.shippingInfo?.city}
              </div>
              <Table responsive bordered className="align-middle">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          rounded
                          className="border"
                          style={{ objectFit: "cover" }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>{formatPrice(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <div>
                    <strong>Phí vận chuyển:</strong>{" "}
                    {selectedOrder.shippingFee
                      ? formatPrice(selectedOrder.shippingFee)
                      : "Miễn phí"}
                  </div>
                  <div>
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {selectedOrder.paymentMethod}
                  </div>
                  {selectedOrder.note && (
                    <div>
                      <strong>Ghi chú:</strong> {selectedOrder.note}
                    </div>
                  )}
                  <div>
                    <strong>Thời gian đặt hàng:</strong>{" "}
                    {selectedOrder.timeline?.[0]?.time}
                  </div>
                  {selectedOrder.status === "Đã giao hàng" &&
                    selectedOrder.timeline?.[3]?.time && (
                      <div>
                        <strong>Thời gian giao hàng:</strong>{" "}
                        {selectedOrder.timeline[3].time}
                      </div>
                    )}
                </div>
                <div className="text-end fw-bold fs-5">
                  Tổng tiền:{" "}
                  <span className="text-danger">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal xác nhận hủy đơn hàng */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn hủy đơn hàng {orderToCancel?.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Đóng
          </Button>
          <Button
            variant="danger"
            onClick={() => handleCancelOrder(orderToCancel?.id)}
          >
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyOrders;
