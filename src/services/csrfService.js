import axios from "axios";

class CsrfService {
  constructor() {
    this.token = null;
    this.tokenHeader = "X-CSRF-Token";
  }

  // Lấy CSRF token từ server
  async fetchCsrfToken() {
    try {
      const response = await axios.get("/api/csrf-token");
      this.token = response.data.token;
      return this.token;
    } catch (error) {
      console.error("Lỗi khi lấy CSRF token:", error);
      return null;
    }
  }

  // Thêm CSRF token vào header của request
  addCsrfTokenToRequest(config) {
    if (this.token) {
      config.headers[this.tokenHeader] = this.token;
    }
    return config;
  }

  // Xóa CSRF token
  clearCsrfToken() {
    this.token = null;
  }
}

// Tạo instance duy nhất
const csrfService = new CsrfService();

// Cấu hình axios interceptor
axios.interceptors.request.use(
  (config) => csrfService.addCsrfTokenToRequest(config),
  (error) => Promise.reject(error)
);

export default csrfService;
