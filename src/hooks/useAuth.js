import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { toast } from "react-toastify";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
      if (userLoggedIn) {
        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Lỗi khi đọc thông tin đăng nhập:", error);
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("currentUser");
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      toast.success("Đăng xuất thành công!");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      toast.error("Có lỗi xảy ra khi đăng xuất!");
    }
  };

  return { currentUser, handleLogout };
};

export default useAuth;
