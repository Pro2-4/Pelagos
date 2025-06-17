import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Vui lòng nhập họ và tên.";
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại.";
    if (!formData.email) newErrors.email = "Vui lòng nhập email.";
    else if (
      !/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    )
      newErrors.email = "Email không hợp lệ.";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu.";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp.";
    if (!formData.agreed) newErrors.agreed = "Bạn phải đồng ý với điều khoản.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Lấy danh sách người dùng hiện có từ localStorage hoặc tạo một mảng rỗng nếu chưa có
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Kiểm tra xem email đã tồn tại chưa
      const userExists = existingUsers.some(
        (user) => user.email === formData.email
      );

      if (userExists) {
        toast.error("Email này đã được đăng ký. Vui lòng sử dụng email khác!", {
          position: "top-right",
        });
        return;
      }

      // Thêm người dùng mới vào danh sách
      const newUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      };
      existingUsers.push(newUser);

      // Lưu lại danh sách người dùng đã cập nhật vào localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      toast.success("Đăng ký thành công!", { position: "top-right" });
      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      window.location.href = "/login";
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreed: false,
      });
    }
  };

  return (
    <Container className="py-5">
      <Row className="shadow bg-white rounded overflow-hidden">
        <Col md={6} className="p-0 d-none d-md-block">
          <img
            src="/assets/register.webp"
            alt="Register"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </Col>
        <Col xs={12} md={6} className="p-5">
          <h3 className="fw-bold mb-4 text-center">ĐĂNG KÝ</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên của bạn"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập Email của bạn"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu của bạn"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Button
                  variant="link"
                  className="position-absolute end-0 top-50 translate-middle-y text-decoration-none p-0 me-2"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Button
                  variant="link"
                  className="position-absolute end-0 top-50 translate-middle-y text-decoration-none p-0 me-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Đồng ý với tất cả các điều khoản"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                isInvalid={!!errors.agreed}
              />
              <Form.Control.Feedback type="invalid">
                {errors.agreed}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              className="w-100 py-2 fw-bold"
              style={{ backgroundColor: "black", border: "none" }}
            >
              ĐĂNG KÝ
            </Button>

            <div className="text-center mt-3">
              <span>Bạn có tài khoản? </span>
              <Link to="/login" className="fw-semibold text-decoration-none">
                Đăng nhập
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
