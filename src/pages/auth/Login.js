import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Reset lỗi khi người dùng bắt đầu nhập lại
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: !formData.username.trim(),
      password: !formData.password.trim(),
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) return;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (u) =>
        (u.email === formData.username ||
          u.phone === formData.username ||
          u.name === formData.username) &&
        u.password === formData.password
    );

    if (user) {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Đăng nhập thành công!", { position: "top-right" });
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } else {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng.", {
        position: "top-right",
      });
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="border-0 shadow">
            <Row className="g-0">
              <Col md={6}>
                <img
                  src="/assets/login.webp"
                  alt="login"
                  className="img-fluid h-100 w-100 object-fit-cover"
                  style={{ objectFit: "cover" }}
                />
              </Col>
              <Col md={6}>
                <Card.Body className="p-5">
                  <h3 className="fw-bold mb-4">ĐĂNG NHẬP</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username/ Số điện thoại/ Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username/ Số điện thoại/ Email"
                        value={formData.username}
                        onChange={handleChange}
                        isInvalid={errors.username}
                        className="py-2"
                      />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập tên đăng nhập.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mật khẩu</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Mật khẩu của bạn"
                          value={formData.password}
                          onChange={handleChange}
                          isInvalid={errors.password}
                          className="py-2"
                        />
                        <Button
                          variant="link"
                          type="button"
                          className="position-absolute end-0 top-50 translate-middle-y text-dark me-2 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập mật khẩu.
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Ghi nhớ thông tin 30 ngày"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                      />
                      <Link
                        to="#"
                        className="text-decoration-none text-muted small"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      variant="dark"
                      className="w-100 py-2 fw-medium"
                    >
                      Đăng nhập
                    </Button>

                    <div className="text-center mt-4">
                      <span>Bạn chưa có tài khoản? </span>
                      <Link to="/register" className="fw-semibold">
                        Đăng ký ngay
                      </Link>
                    </div>
                  </Form>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
