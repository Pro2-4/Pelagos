import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaTshirt,
  FaUsers,
  FaAward,
  FaHeart,
  FaStore,
  FaShoppingBag,
  FaUserFriends,
  FaTshirt as FaProduct,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../../styles/pages/About.css";

const About = () => {
  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "Nguyễn Văn Quý",
      position: "Giám đốc",
      image:
        "/assets/user/giamdoc.webp",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 2,
      name: "Nguyễn Hữu Trường",
      position: "Quản lý sản phẩm",
      image:
        "/assets/user/quanly.webp",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 3,
      name: "Trần Hà Linh",
      position: "Thiết kế thời trang",
      image:
        "/assets/user/thietke.webp",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 4,
      name: "Hoàng Đình Quang Huy",
      position: "Chăm sóc khách hàng",
      image:
        "/assets/user/chamsoc.webp",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
  ];

  // Mock data for company values
  const companyValues = [
    {
      icon: <FaTshirt size={40} />,
      title: "Chất lượng",
      description:
        "Cam kết mang đến những sản phẩm chất lượng cao với giá cả phải chăng.",
      color: "#FF6B6B",
    },
    {
      icon: <FaUsers size={40} />,
      title: "Khách hàng",
      description:
        "Luôn lắng nghe và đáp ứng nhu cầu của khách hàng một cách tốt nhất.",
      color: "#4ECDC4",
    },
    {
      icon: <FaAward size={40} />,
      title: "Sáng tạo",
      description:
        "Không ngừng sáng tạo và cập nhật xu hướng thời trang mới nhất.",
      color: "#FFD93D",
    },
    {
      icon: <FaHeart size={40} />,
      title: "Đam mê",
      description:
        "Đam mê với thời trang và mong muốn mang đến phong cách cho mọi người.",
      color: "#95E1D3",
    },
  ];

  const achievements = [
    {
      icon: <FaStore size={40} />,
      number: "10+",
      text: "Năm kinh nghiệm",
      color: "#FF6B6B",
    },
    {
      icon: <FaShoppingBag size={40} />,
      number: "50+",
      text: "Cửa hàng trên toàn quốc",
      color: "#4ECDC4",
    },
    {
      icon: <FaUserFriends size={40} />,
      number: "100K+",
      text: "Khách hàng hài lòng",
      color: "#FFD93D",
    },
    {
      icon: <FaProduct size={40} />,
      number: "1000+",
      text: "Sản phẩm đa dạng",
      color: "#95E1D3",
    },
  ];

  return (
    <div className="about-page">
      <div className="about-hero-section">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="display-4 fw-bold mb-4">Về chúng tôi</h1>
                <p className="lead mb-4">
                  Chúng tôi là thương hiệu thời trang nam hàng đầu tại Việt Nam,
                  với hơn 10 năm kinh nghiệm trong ngành.
                </p>
                <p className="mb-4">
                  Với sứ mệnh mang đến những sản phẩm thời trang chất lượng cao,
                  phong cách và giá cả phải chăng, chúng tôi luôn nỗ lực để đáp
                  ứng nhu cầu của khách hàng một cách tốt nhất.
                </p>
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/assets/store.webp"
                  alt="Store"
                  className="img-fluid rounded-3 shadow-lg"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center mb-5 about-section-title">
            Giá trị cốt lõi
          </h2>
          <Row className="g-4">
            {companyValues.map((value, index) => (
              <Col key={index} md={3}>
                <Card className="h-100 about-value-card">
                  <Card.Body className="text-center">
                    <div
                      className="about-icon-wrapper mb-4"
                      style={{ color: value.color }}
                    >
                      {value.icon}
                    </div>
                    <Card.Title className="h4 mb-3">{value.title}</Card.Title>
                    <Card.Text>{value.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-5"
        >
          <h2 className="text-center mb-5 about-section-title">
            Đội ngũ của chúng tôi
          </h2>
          <Row className="g-4">
            {teamMembers.map((member) => (
              <Col key={member.id} md={3}>
                <Card className="h-100 about-team-card">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={member.image}
                      className="about-team-image"
                    />
                    <div className="about-social-links">
                      <a
                        href={member.social.linkedin}
                        className="about-social-link"
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a
                        href={member.social.twitter}
                        className="about-social-link"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        href={member.social.facebook}
                        className="about-social-link"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </div>
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="h5 mb-2">{member.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {member.position}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Company Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-5"
        >
          <Card className="about-achievement-card">
            <Card.Body className="p-5">
              <h2 className="text-center mb-5 about-section-title">
                Thành tựu của chúng tôi
              </h2>
              <Row className="g-4">
                {achievements.map((achievement, index) => (
                  <Col key={index} md={3}>
                    <div className="about-achievement-item text-center">
                      <div
                        className="about-achievement-icon mb-3"
                        style={{ color: achievement.color }}
                      >
                        {achievement.icon}
                      </div>
                      <h3 className="about-achievement-number mb-2">
                        {achievement.number}
                      </h3>
                      <p className="about-achievement-text">
                        {achievement.text}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-5"
        >
          <Card className="about-contact-card">
            <Card.Body className="p-5 text-center">
              <div className="about-contact-icon mb-4">
                <FaEnvelope size={50} />
              </div>
              <h2 className="about-section-title mb-4">
                Liên hệ với chúng tôi
              </h2>
              <p className="lead mb-4">
                Bạn có câu hỏi hoặc muốn tìm hiểu thêm về chúng tôi? Hãy liên hệ
                ngay!
              </p>
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="about-contact-button"
                >
                  Liên hệ ngay
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;
