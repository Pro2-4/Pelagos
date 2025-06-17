import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { toast } from "react-toastify";

const PROTECTED_ROUTE_TOAST_ID = "protected-route-warning";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("userLoggedIn") === "true";

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== ROUTES.LOGIN) {
      toast.warning("Vui lòng đăng nhập để tiếp tục!", {
        position: "top-right",
        autoClose: 3000,
        toastId: PROTECTED_ROUTE_TOAST_ID, // Thêm toastId để ngăn trùng lặp
      });
    }
  }, [isAuthenticated, location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default React.memo(ProtectedRoute);
