import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../data/productsData";
import "../styles/pages/Home.css";

const bannerImages = [
  "/assets/banne1.png",
  "/assets/banne2.png",
  "/assets/banne3.png",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [imageError, setImageError] = useState(false);

  const featuredProducts = products.slice(0, 8);

  // Tối ưu hàm xử lý lỗi ảnh
  const handleImageError = useCallback((e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "/assets/fallback-banner.png";
    setImageError(true);
  }, []);

  // Tối ưu hàm chuyển banner
  const changeBanner = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    setProgressKey((prevKey) => prevKey + 1);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(changeBanner, 4000);
    return () => clearInterval(intervalId);
  }, [changeBanner]);

  // Preload ảnh banner
  useEffect(() => {
    bannerImages.forEach((src) => {
      const img = new Image();
      img.onerror = () => {
        console.warn(`Không thể tải ảnh banner: ${src}`);
      };
      img.src = src;
    });
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="text-dark py-5 mb-4 banner-container"
        style={{
          backgroundImage: imageError
            ? 'url("/assets/fallback-banner.png")'
            : `url(${bannerImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          position: "relative",
          overflow: "hidden",
        }}
        onError={handleImageError}
      >
        <div className="banner-controls">
          <svg
            className="progress-circle-svg"
            viewBox="0 0 36 36"
            key={progressKey}
          >
            <circle
              className="progress-circle-bg"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.2"
            />
            <circle
              className="progress-circle-fg"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
          <div className="play-pause-icon"></div>
        </div>
      </div>

      {/* Categories */}
      <Container className="mb-5">
        <h2 className="text-center mb-4">Danh Mục Sản Phẩm</h2>
        <Row>
          {[
            { title: "Áo Nam", image: "/assets/home1.webp", category: "ao" },
            {
              title: "Quần Nam",
              image: "/assets/home2.webp",
              category: "quan",
            },
            {
              title: "Phụ Kiện",
              image: "/assets/home3.webp",
              category: "phukien",
            },
          ].map((category, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={category.image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/fallback-category.png";
                  }}
                  alt={category.title}
                />
                <Card.Body className="text-center">
                  <Card.Title>{category.title}</Card.Title>
                  <Button
                    as={Link}
                    to={`/products?category=${category.category}`}
                    variant="outline-primary"
                  >
                    Xem thêm
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Products */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Sản Phẩm Nổi Bật</h2>
        <Row>
          {featuredProducts.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="h-100 product-card">
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/fallback-product.png";
                  }}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-danger fw-bold">
                    {product.price}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/product/${product.id}`}
                    variant="primary"
                    className="w-100"
                  >
                    Xem chi tiết
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Home);
