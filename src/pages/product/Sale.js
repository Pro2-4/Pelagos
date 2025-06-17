import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import productsData from "../../data/productsData"; // Import products data

const Sale = () => {
  // Filter products that are on sale
  const saleProducts = productsData.filter((product) => product.isOnSale);

  return (
    <Container className="py-4">
      <Row>
        {saleProducts.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 product-card">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                {product.originalPrice && (
                  <Card.Text className="text-muted text-decoration-line-through mb-0">
                    {product.originalPrice}
                  </Card.Text>
                )}
                <Card.Text className="text-danger fw-bold">
                  {product.price}
                </Card.Text>
                {product.discount && (
                  <Card.Text className="text-success">
                    Giảm {product.discount}
                  </Card.Text>
                )}
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
  );
};

export default Sale;
