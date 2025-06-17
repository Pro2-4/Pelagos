import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import {
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaMoneyBillWave,
} from "react-icons/fa";
import productsData from "../../data/productsData";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    setStats({
      totalUsers: users.length,
      totalOrders: orders.length,
      totalProducts: productsData.length,
      totalRevenue: totalRevenue,
    });

    // Get recent orders (last 5)
    const recent = orders.slice(0, 5);
    setRecentOrders(recent);
  }, []);

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

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <FaUsers size={40} className="text-primary mb-3" />
              <h3>{stats.totalUsers}</h3>
              <p className="text-muted mb-0">Tổng người dùng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <FaShoppingCart size={40} className="text-success mb-3" />
              <h3>{stats.totalOrders}</h3>
              <p className="text-muted mb-0">Tổng đơn hàng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <FaBox size={40} className="text-info mb-3" />
              <h3>{stats.totalProducts}</h3>
              <p className="text-muted mb-0">Tổng sản phẩm</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <FaMoneyBillWave size={40} className="text-warning mb-3" />
              <h3>{formatPrice(stats.totalRevenue)}</h3>
              <p className="text-muted mb-0">Tổng doanh thu</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Đơn hàng gần đây</h5>
            </Card.Header>
            <Card.Body>
              {recentOrders.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Ngày đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong>{order.id}</strong>
                        </td>
                        <td>
                          {order.shippingInfo?.firstName}{" "}
                          {order.shippingInfo?.lastName}
                        </td>
                        <td>{formatPrice(order.total)}</td>
                        <td>{getStatusBadge(order.status)}</td>
                        <td>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">Chưa có đơn hàng nào</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Thống kê nhanh</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Đơn hàng hôm nay</span>
                  <Badge bg="primary">0</Badge>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Đơn hàng tuần này</span>
                  <Badge bg="success">0</Badge>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Sản phẩm bán chạy</span>
                  <Badge bg="info">0</Badge>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Khách hàng mới</span>
                  <Badge bg="warning">0</Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
