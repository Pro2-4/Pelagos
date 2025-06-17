import { toast } from "react-toastify";
import csrfService from "./csrfService";

class AuthService {
  constructor() {
    this.tokenKey = "auth_token";
    this.userKey = "currentUser";
    this.loginStatusKey = "userLoggedIn";
  }

  // Lưu token vào localStorage với prefix
  setAuthToken(token) {
    if (token) {
      localStorage.setItem(this.tokenKey, `Bearer ${token}`);
      localStorage.setItem(this.loginStatusKey, "true");
    }
  }

  // Lấy token từ localStorage
  getAuthToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Xóa token
  removeAuthToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.loginStatusKey);
    localStorage.removeItem(this.userKey);
    csrfService.clearCsrfToken();
  }

  // Kiểm tra trạng thái đăng nhập
  isAuthenticated() {
    return localStorage.getItem(this.loginStatusKey) === "true";
  }

  // Đăng nhập
  async login(email, password) {
    try {
      // Lấy CSRF token trước khi đăng nhập
      await csrfService.fetchCsrfToken();

      // Giả lập API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (email === "admin@example.com" && password === "password") {
            resolve({
              data: {
                token: "fake-jwt-token",
                user: {
                  id: 1,
                  email: "admin@example.com",
                  name: "Admin User",
                },
              },
            });
          } else {
            throw new Error("Email hoặc mật khẩu không đúng");
          }
        }, 1000);
      });

      this.setAuthToken(response.data.token);
      localStorage.setItem(this.userKey, JSON.stringify(response.data.user));
      toast.success("Đăng nhập thành công!");
      return response.data;
    } catch (error) {
      toast.error(error.message || "Đăng nhập thất bại!");
      throw error;
    }
  }

  // Đăng xuất
  logout() {
    this.removeAuthToken();
    toast.success("Đăng xuất thành công!");
  }

  // Lấy thông tin người dùng hiện tại
  getCurrentUser() {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

export default new AuthService();
