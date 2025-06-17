import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PageTransition from "./components/common/PageTransition";
import Loading from "./components/common/Loading";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./styles/App.css";
import "./styles/admin/AdminLayout.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "./config/routes";
import { initializeSampleData } from "./utils/initData";

// Lazy load các components
const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/product/Products"));
const ProductDetail = React.lazy(() => import("./pages/product/ProductDetail"));
const Cart = React.lazy(() => import("./pages/checkout/Cart"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Profile = React.lazy(() => import("./pages/user/Profile"));
const NewArrivals = React.lazy(() => import("./pages/product/NewArrivals"));
const Sale = React.lazy(() => import("./pages/product/Sale"));
const Contact = React.lazy(() => import("./pages/info/Contact"));
const About = React.lazy(() => import("./pages/info/About"));
const Checkout = React.lazy(() => import("./pages/checkout/Checkout"));
const Favorites = React.lazy(() => import("./pages/user/Favorites"));
const OrderSuccess = React.lazy(() => import("./pages/checkout/OrderSuccess"));
const MyOrders = React.lazy(() => import("./pages/user/MyOrders"));

// Admin components
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = React.lazy(() => import("./pages/admin/Products"));
const AdminOrders = React.lazy(() => import("./pages/admin/Orders"));
const AdminUsers = React.lazy(() => import("./pages/admin/Users"));
const AdminAnalytics = React.lazy(() => import("./pages/admin/Analytics"));
const AdminSettings = React.lazy(() => import("./pages/admin/Settings"));
const AdminLayout = React.lazy(() => import("./components/admin/AdminLayout"));

// Memoize các component con
const MemoizedNavbar = React.memo(Navbar);
const MemoizedFooter = React.memo(Footer);
const MemoizedPageTransition = React.memo(PageTransition);

// Khởi tạo dữ liệu mẫu khi app load
initializeSampleData();

function App() {
  return (
    <ErrorBoundary>
      <div className="d-flex flex-column min-vh-100">
        <MemoizedNavbar />
        <main className="flex-grow-1">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={
                  <MemoizedPageTransition>
                    <Home />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.PRODUCTS}
                element={
                  <MemoizedPageTransition>
                    <Products />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.PRODUCT_DETAIL}
                element={
                  <MemoizedPageTransition>
                    <ProductDetail />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.CART}
                element={
                  <ProtectedRoute>
                    <MemoizedPageTransition>
                      <Cart />
                    </MemoizedPageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.LOGIN}
                element={
                  <MemoizedPageTransition>
                    <Login />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.REGISTER}
                element={
                  <MemoizedPageTransition>
                    <Register />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.CHECKOUT}
                element={
                  <MemoizedPageTransition>
                    <Checkout />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.PROFILE}
                element={
                  <ProtectedRoute>
                    <MemoizedPageTransition>
                      <Profile />
                    </MemoizedPageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.NEW_ARRIVALS}
                element={
                  <MemoizedPageTransition>
                    <NewArrivals />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.SALE}
                element={
                  <MemoizedPageTransition>
                    <Sale />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.CONTACT}
                element={
                  <MemoizedPageTransition>
                    <Contact />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.ABOUT}
                element={
                  <MemoizedPageTransition>
                    <About />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.FAVORITES}
                element={
                  <ProtectedRoute>
                    <MemoizedPageTransition>
                      <Favorites />
                    </MemoizedPageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ORDER_SUCCESS}
                element={
                  <MemoizedPageTransition>
                    <OrderSuccess />
                  </MemoizedPageTransition>
                }
              />
              <Route
                path={ROUTES.ORDERS}
                element={
                  <ProtectedRoute>
                    <MemoizedPageTransition>
                      <MyOrders />
                    </MemoizedPageTransition>
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path={ROUTES.ADMIN}
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_PRODUCTS}
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminProducts />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_ORDERS}
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminOrders />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_USERS}
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminUsers />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_ANALYTICS}
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminAnalytics />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN_SETTINGS}
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminSettings />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <MemoizedFooter />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </ErrorBoundary>
  );
}

export default React.memo(App);
