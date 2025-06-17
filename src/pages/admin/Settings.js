import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { FaSave, FaCog, FaShieldAlt, FaBell, FaPalette } from "react-icons/fa";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "PELAGOS",
    siteDescription: "Thời trang nam chất lượng cao",
    contactEmail: "admin@pelagos.com",
    contactPhone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    currency: "VND",
    language: "vi",
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: false,
    maxUploadSize: 5,
    enableNotifications: true,
    theme: "light",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cài đặt hệ thống</h2>
        <Button variant="primary" onClick={handleSave}>
          <FaSave className="me-2" />
          Lưu cài đặt
        </Button>
      </div>

      {showAlert && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowAlert(false)}
        >
          Cài đặt đã được lưu thành công!
        </Alert>
      )}

      <Row>
        {/* General Settings */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaCog className="me-2" />
                Cài đặt chung
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tên website</Form.Label>
                <Form.Control
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả website</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) =>
                    handleChange("siteDescription", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email liên hệ</Form.Label>
                <Form.Control
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={settings.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* System Settings */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaShieldAlt className="me-2" />
                Cài đặt hệ thống
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tiền tệ</Form.Label>
                <Form.Select
                  value={settings.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                >
                  <option value="VND">VND (Việt Nam Đồng)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ngôn ngữ</Form.Label>
                <Form.Select
                  value={settings.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Kích thước upload tối đa (MB)</Form.Label>
                <Form.Control
                  type="number"
                  value={settings.maxUploadSize}
                  onChange={(e) =>
                    handleChange("maxUploadSize", parseInt(e.target.value))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="maintenanceMode"
                  label="Chế độ bảo trì"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    handleChange("maintenanceMode", e.target.checked)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="allowRegistration"
                  label="Cho phép đăng ký"
                  checked={settings.allowRegistration}
                  onChange={(e) =>
                    handleChange("allowRegistration", e.target.checked)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="requireEmailVerification"
                  label="Yêu cầu xác thực email"
                  checked={settings.requireEmailVerification}
                  onChange={(e) =>
                    handleChange("requireEmailVerification", e.target.checked)
                  }
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Notification Settings */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaBell className="me-2" />
                Cài đặt thông báo
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="enableNotifications"
                  label="Bật thông báo"
                  checked={settings.enableNotifications}
                  onChange={(e) =>
                    handleChange("enableNotifications", e.target.checked)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="emailNotifications"
                  label="Thông báo qua email"
                  defaultChecked
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="smsNotifications"
                  label="Thông báo qua SMS"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="pushNotifications"
                  label="Push notifications"
                  defaultChecked
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Appearance Settings */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaPalette className="me-2" />
                Giao diện
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Theme</Form.Label>
                <Form.Select
                  value={settings.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                >
                  <option value="light">Sáng</option>
                  <option value="dark">Tối</option>
                  <option value="auto">Tự động</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Màu chủ đạo</Form.Label>
                <div className="d-flex gap-2">
                  {["primary", "success", "info", "warning", "danger"].map(
                    (color) => (
                      <div
                        key={color}
                        className={`color-picker bg-${color}`}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          border: "2px solid #ddd",
                        }}
                        title={color}
                      ></div>
                    )
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="showAnimations"
                  label="Hiệu ứng animation"
                  defaultChecked
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="compactMode"
                  label="Chế độ compact"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
