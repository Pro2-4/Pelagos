import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { Heart, Trash } from "react-bootstrap-icons";
import productsData from "../../data/productsData";
import { toast } from "react-toastify";
import { formatPrice } from "../../utils";

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const loadedFavoriteProducts = productsData.filter((product) =>
      wishlistItems.includes(product.id)
    );
    setFavoriteProducts(loadedFavoriteProducts);
  }, []);

  const handleRemoveFromFavorites = (productId) => {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const updatedWishlist = wishlistItems.filter((item) => item !== productId);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    // Phát event để cập nhật icon
    window.dispatchEvent(new Event("favoritesChanged"));

    const updatedFavoriteProducts = favoriteProducts.filter(
      (product) => product.id !== productId
    );
    setFavoriteProducts(updatedFavoriteProducts);
    toast.info("Sản phẩm đã xóa khỏi danh sách yêu thích!", {
      position: "top-right",
    });
  };

  return (
    <Container className="favorites-container mt-5">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h2 className="favorites-title fw-bold mb-4">Sản phẩm yêu thích</h2>
          {favoriteProducts.length === 0 ? (
            <div className="empty-favorites">
              <div className="heart-animation">
                <Heart size={100} color="#ff6b6b" className="mb-4" />
              </div>
              <h3 className="mb-3">Danh sách yêu thích trống</h3>
              <p className="text-muted mb-4">
                Hãy thêm những sản phẩm bạn yêu thích vào danh sách để dễ dàng
                theo dõi và mua sắm sau này.
              </p>
              <Button
                variant="dark"
                size="lg"
                href="/products"
                className="shop-now-btn"
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          ) : (
            <Table responsive className="favorites-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th style={{ width: "150px", verticalAlign: "middle" }}>
                    Giá
                  </th>
                  <th style={{ width: "150px", verticalAlign: "middle" }}></th>
                  <th style={{ width: "50px", verticalAlign: "middle" }}></th>
                </tr>
              </thead>
              <tbody>
                {favoriteProducts.map((product) => (
                  <tr key={product.id}>
                    <td style={{ verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "80px", marginRight: "15px" }}
                        />
                        <div>
                          <h6 className="mb-1">{product.name}</h6>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {formatPrice(
                        parseInt(product.price.replace(/[^\d]/g, "")) || 0
                      )}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Button
                        variant="primary"
                        size="sm"
                        href={`/product/${product.id}`}
                        className="view-product-btn w-100"
                      >
                        Xem sản phẩm
                      </Button>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Button
                        variant="link"
                        className="text-danger"
                        onClick={() => handleRemoveFromFavorites(product.id)}
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
