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
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../../styles/pages/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setShowAlert(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt size={22} />,
      title: "Địa chỉ",
      content: "123 Đường ABC, Quận XYZ, TP.HCM",
      color: "#FF6B6B",
    },
    {
      icon: <FaPhone size={22} />,
      title: "Điện thoại",
      content: "(028) 1234 5678",
      color: "#4ECDC4",
    },
    {
      icon: <FaEnvelope size={22} />,
      title: "Email",
      content: "pelagos@mensfashion.com",
      color: "#FFD93D",
    },
    {
      icon: <FaClock size={22} />,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 7: 8:00 - 21:00\nChủ nhật: 9:00 - 18:00",
      color: "#95E1D3",
    },
  ];

  return (
    <div className="contact-page">
      <Container className="py-5">
        <Row className="g-4 align-items-stretch">
          {/* Contact Form */}
          <Col lg={7} className="d-flex">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-100 d-flex"
            >
              <Card className="contact-form-card flex-fill d-flex flex-column justify-content-between">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="contact-section-title mb-4">
                    Gửi tin nhắn cho chúng tôi
                  </h2>
                  {showAlert && (
                    <Alert
                      variant="success"
                      onClose={() => setShowAlert(false)}
                      dismissible
                      className="alert-custom"
                    >
                      <FaPaperPlane className="me-2" />
                      Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có
                      thể.
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="contact-form-control-custom"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="contact-form-control-custom"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="contact-form-control-custom"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Tiêu đề</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="contact-form-control-custom"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Nội dung</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="contact-form-control-custom"
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="contact-submit-button w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Gửi tin nhắn
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Contact Information */}
          <Col lg={5} className="d-flex flex-column gap-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="contact-info-card h-100">
                <Card.Body className="p-4 p-md-4">
                  <h2 className="contact-section-title mb-4">
                    Thông tin liên hệ
                  </h2>
                  <div className="contact-info-list">
                    {contactInfo.map((info, idx) => (
                      <div key={idx} className="contact-info-item">
                        <div
                          className="contact-icon-wrapper"
                          style={{ backgroundColor: `${info.color}15` }}
                        >
                          <span style={{ color: info.color }}>{info.icon}</span>
                        </div>
                        <div className="contact-info-content">
                          <h6 className="mb-1 fw-bold">{info.title}</h6>
                          <p className="mb-0">{info.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="contact-map-card h-100">
                <Card.Body className="p-4">
                  <h2 className="contact-section-title mb-4">Bản đồ</h2>
                  <div className="contact-map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241779445467!2d106.6984!3d10.7756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzMyLjEiTiAxMDbCsDQxJzU4LjRU!5e0!3m2!1svi!2s!4v1234567890"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="contact-map-iframe"
                      title="Bản đồ liên hệ"
                    ></iframe>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
