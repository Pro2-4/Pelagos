import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { ROUTES } from "../../config/routes";
import useAuth from "../../hooks/useAuth";

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const menuItems = [
    {
      path: "/admin",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/admin/products",
      icon: <FaBox />,
      label: "Sản phẩm",
    },
    {
      path: "/admin/orders",
      icon: <FaShoppingCart />,
      label: "Đơn hàng",
    },
    {
      path: "/admin/users",
      icon: <FaUsers />,
      label: "Người dùng",
    },
    {
      path: "/admin/analytics",
      icon: <FaChartBar />,
      label: "Thống kê",
    },
    {
      path: "/admin/settings",
      icon: <FaCog />,
      label: "Cài đặt",
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogoutClick = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      handleLogout();
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h4 className="mb-0">PELAGOS ADMIN</h4>
          <Button
            variant="link"
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </Button>
        </div>

        <Nav className="flex-column sidebar-nav">
          {menuItems.map((item) => (
            <Nav.Item key={item.path}>
              <Nav.Link
                as={Link}
                to={item.path}
                className={`sidebar-link ${
                  isActive(item.path, item.exact) ? "active" : ""
                }`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="sidebar-label">{item.label}</span>
                )}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <div className="sidebar-footer">
          <Button
            variant="outline-light"
            className="w-100"
            onClick={handleLogoutClick}
          >
            <FaSignOutAlt className="me-2" />
            {!sidebarCollapsed && "Đăng xuất"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`admin-main ${sidebarCollapsed ? "expanded" : ""}`}>
        <div className="admin-header">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="page-title">
              {menuItems.find((item) => isActive(item.path, item.exact))
                ?.label || "Admin"}
            </h1>
            <div className="header-actions">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => navigate(ROUTES.HOME)}
              >
                Về trang chủ
              </Button>
            </div>
          </div>
        </div>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
