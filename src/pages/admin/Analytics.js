import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaUsers,
  FaShoppingCart,
  FaBox,
} from "react-icons/fa";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    monthlyRevenue: [],
    topProducts: [],
    orderStatus: {},
    userGrowth: [],
  });

  useEffect(() => {
    // Load data from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Calculate analytics
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Order status distribution
    const orderStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    // Top products (mock data)
    const topProducts = [
      { name: "Áo Tank Top Uniqlo", sales: 45, revenue: 13455000 },
      { name: "Áo Khoác Bomber Nike", sales: 32, revenue: 27200000 },
      { name: "Áo Hoodie Champion", sales: 28, revenue: 21000000 },
      { name: "Áo Sơ Mi Zara", sales: 25, revenue: 11250000 },
      { name: "Áo Tank Top H&M", sales: 22, revenue: 4840000 },
    ];

    // Monthly revenue (mock data)
    const monthlyRevenue = [
      { month: "T1", revenue: 15000000 },
      { month: "T2", revenue: 18000000 },
      { month: "T3", revenue: 22000000 },
      { month: "T4", revenue: 19000000 },
      { month: "T5", revenue: 25000000 },
      { month: "T6", revenue: 28000000 },
    ];

    setAnalytics({
      totalRevenue,
      totalOrders: orders.length,
      totalUsers: users.length,
      totalProducts: products.length,
      monthlyRevenue,
      topProducts,
      orderStatus,
      userGrowth: [],
    });
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const StatCard = ({ title, value, icon, trend, trendValue, color }) => (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="mb-1">{value}</h3>
            {trend && (
              <small
                className={`d-flex align-items-center ${
                  trend === "up" ? "text-success" : "text-danger"
                }`}
              >
                {trend === "up" ? (
                  <FaArrowUp className="me-1" />
                ) : (
                  <FaArrowDown className="me-1" />
                )}
                {trendValue}
              </small>
            )}
          </div>
          <div className={`stat-icon ${color}`}>{icon}</div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Thống kê & Phân tích</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <StatCard
            title="Tổng doanh thu"
            value={formatPrice(analytics.totalRevenue)}
            icon={<FaChartLine size={30} />}
            trend="up"
            trendValue="+12.5%"
            color="text-primary"
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard
            title="Tổng đơn hàng"
            value={analytics.totalOrders}
            icon={<FaShoppingCart size={30} />}
            trend="up"
            trendValue="+8.3%"
            color="text-success"
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard
            title="Tổng người dùng"
            value={analytics.totalUsers}
            icon={<FaUsers size={30} />}
            trend="up"
            trendValue="+15.2%"
            color="text-info"
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard
            title="Tổng sản phẩm"
            value={analytics.totalProducts}
            icon={<FaBox size={30} />}
            trend="up"
            trendValue="+5.7%"
            color="text-warning"
          />
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Doanh thu theo tháng</h5>
            </Card.Header>
            <Card.Body>
              <div className="chart-container" style={{ height: "300px" }}>
                <div className="d-flex align-items-end justify-content-between h-100">
                  {analytics.monthlyRevenue.map((item, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="chart-bar bg-primary"
                        style={{
                          height: `${(item.revenue / 30000000) * 200}px`,
                          width: "40px",
                        }}
                      ></div>
                      <small className="d-block mt-2">{item.month}</small>
                      <small className="text-muted">
                        {formatPrice(item.revenue)}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Trạng thái đơn hàng</h5>
            </Card.Header>
            <Card.Body>
              <div className="chart-container" style={{ height: "300px" }}>
                <div className="d-flex flex-column justify-content-center h-100">
                  {Object.entries(analytics.orderStatus).map(
                    ([status, count]) => (
                      <div
                        key={status}
                        className="d-flex justify-content-between align-items-center mb-2"
                      >
                        <span>{status}</span>
                        <div className="d-flex align-items-center">
                          <div
                            className="chart-bar bg-success me-2"
                            style={{
                              height: "20px",
                              width: `${
                                (count /
                                  Math.max(
                                    ...Object.values(analytics.orderStatus)
                                  )) *
                                100
                              }px`,
                            }}
                          ></div>
                          <span>{count}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Products */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Sản phẩm bán chạy</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng bán</th>
                      <th>Doanh thu</th>
                      <th>Tỷ lệ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.topProducts.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{product.name}</strong>
                        </td>
                        <td>{product.sales}</td>
                        <td>{formatPrice(product.revenue)}</td>
                        <td>
                          <div className="progress" style={{ height: "20px" }}>
                            <div
                              className="progress-bar bg-primary"
                              style={{
                                width: `${(product.sales / 45) * 100}%`,
                              }}
                            >
                              {Math.round((product.sales / 45) * 100)}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
