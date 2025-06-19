import React, { useState, useEffect } from "react";
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
  FaBars,
} from "react-icons/fa";
import { ROUTES } from "../../config/routes";
import useAuth from "../../hooks/useAuth";

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    return () => document.body.classList.remove("sidebar-open");
  }, [isSidebarOpen]);

  return (
    <div className="admin-layout">
      {isSidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          isSidebarOpen ? "show" : ""
        }`}
        style={
          isSidebarOpen
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                zIndex: 999,
                boxShadow: "0 0 20px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
                transform: "translateX(0)",
              }
            : {}
        }
      >
        <div className="sidebar-header d-flex align-items-center">
          <h4 className="mb-0">PELAGOS ADMIN</h4>
          <Button
            variant="link"
            className="sidebar-toggle d-none d-md-flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </Button>
          <span className="d-inline-block d-md-none ms-auto">
            <Button
              variant="link"
              style={{ color: "#fff", fontSize: 22 }}
              onClick={() => setIsSidebarOpen(false)}
            >
              &times;
            </Button>
          </span>
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
                onClick={() => setIsSidebarOpen(false)}
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

      <div className={`admin-main ${sidebarCollapsed ? "expanded" : ""}`}>
        <div className="admin-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span className="d-inline-block d-md-none">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  style={{ marginRight: 12 }}
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <FaBars />
                </Button>
              </span>
              <h1 className="page-title mb-0">
                {menuItems.find((item) => isActive(item.path, item.exact))
                  ?.label || "Admin"}
              </h1>
            </div>
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
