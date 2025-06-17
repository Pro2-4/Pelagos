import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
      });
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordChange({ ...passwordChange, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const validateProfileForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên không được để trống.";
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (
      !/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.phone.trim())
      newErrors.phone = "Số điện thoại không được để trống.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    let newErrors = {};
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser.password !== passwordChange.oldPassword) {
      newErrors.oldPassword = "Mật khẩu cũ không đúng.";
    }
    if (!passwordChange.newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống.";
    } else if (passwordChange.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
    }
    if (passwordChange.newPassword !== passwordChange.confirmNewPassword) {
      newErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Cập nhật danh sách người dùng trong localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = existingUsers.findIndex((u) => u.email === user.email);
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }

      setUser(updatedUser);
      setIsEditing(false);
      setMessage({
        type: "success",
        text: "Thông tin cá nhân đã được cập nhật thành công!",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      const updatedUser = {
        ...storedUser,
        password: passwordChange.newPassword,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Cập nhật danh sách người dùng trong localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = existingUsers.findIndex(
        (u) => u.email === storedUser.email
      );
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }

      setMessage({ type: "success", text: "Mật khẩu đã được đổi thành công!" });
      setPasswordChange({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <p>Đang tải thông tin người dùng hoặc bạn chưa đăng nhập.</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow mb-4">
            <Card.Header className="bg-dark text-white fw-bold">
              Thông tin tài khoản
            </Card.Header>
            <Card.Body className="p-4">
              {message.text && (
                <Alert variant={message.type}>{message.text}</Alert>
              )}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleProfileChange}
                    readOnly={!isEditing}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    readOnly={!isEditing}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleProfileChange}
                    readOnly={!isEditing}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleProfileChange}
                    readOnly={!isEditing}
                  />
                </Form.Group>

                {isEditing ? (
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset form data if cancel
                        setFormData({
                          name: user.name || "",
                          email: user.email || "",
                          phone: user.phone || "",
                          address: user.address || "",
                        });
                        setErrors({});
                      }}
                    >
                      Hủy
                    </Button>
                    <Button variant="dark" onClick={handleSaveProfile}>
                      Lưu thay đổi
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-end">
                    <Button variant="dark" onClick={() => setIsEditing(true)}>
                      Chỉnh sửa thông tin
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow">
            <Card.Header className="bg-dark text-white fw-bold">
              Đổi mật khẩu
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleChangePassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu cũ</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={passwordChange.oldPassword}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.oldPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.oldPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordChange.newPassword}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmNewPassword"
                    value={passwordChange.confirmNewPassword}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.confirmNewPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmNewPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="dark" type="submit">
                    Đổi mật khẩu
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
