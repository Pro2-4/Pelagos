// Trạng thái đơn hàng
export const ORDER_STATUS = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy",
};

// Phương thức thanh toán
export const PAYMENT_METHODS = {
  COD: "Thanh toán khi nhận hàng",
  BANKING: "Chuyển khoản ngân hàng",
};

// Thông báo
export const MESSAGES = {
  ADD_TO_CART_SUCCESS: "Sản phẩm đã được thêm vào giỏ hàng!",
  ADD_TO_WISHLIST_SUCCESS: "Sản phẩm đã thêm vào danh sách yêu thích!",
  REMOVE_FROM_WISHLIST_SUCCESS: "Sản phẩm đã xóa khỏi danh sách yêu thích!",
  ORDER_SUCCESS: "Đặt hàng thành công!",
  LOGIN_SUCCESS: "Đăng nhập thành công!",
  REGISTER_SUCCESS: "Đăng ký thành công!",
  LOGOUT_SUCCESS: "Đăng xuất thành công!",
};

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_REGEX: /^[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 6,
};
