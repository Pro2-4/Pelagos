// Định nghĩa các route trong ứng dụng
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  ORDERS: "/orders",
  FAVORITES: "/favorites",
  ABOUT: "/about",
  CONTACT: "/contact",
  NOT_FOUND: "*",
  NEW_ARRIVALS: "/new-arrivals",
  SALE: "/sale",
  ORDER_SUCCESS: "/order-success",
  // Admin routes
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_USERS: "/admin/users",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_SETTINGS: "/admin/settings",
};

// Các route công khai không cần đăng nhập
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.PRODUCTS,
  ROUTES.PRODUCT_DETAIL,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.NEW_ARRIVALS,
  ROUTES.SALE,
];

// Các route yêu cầu đăng nhập
export const PRIVATE_ROUTES = [
  ROUTES.CART,
  ROUTES.CHECKOUT,
  ROUTES.PROFILE,
  ROUTES.ORDERS,
  ROUTES.FAVORITES,
  ROUTES.ORDER_SUCCESS,
];

// Các route admin yêu cầu quyền admin
export const ADMIN_ROUTES = [
  ROUTES.ADMIN,
  ROUTES.ADMIN_DASHBOARD,
  ROUTES.ADMIN_PRODUCTS,
  ROUTES.ADMIN_ORDERS,
  ROUTES.ADMIN_USERS,
  ROUTES.ADMIN_ANALYTICS,
  ROUTES.ADMIN_SETTINGS,
];
