import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Badge,
  Tabs,
  Tab,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShare, FaArrowLeft, FaStar } from "react-icons/fa";
import productsData from "../../data/productsData"; // Import products data
import { toast } from "react-toastify";
import { formatDate } from "../../utils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [tabKey, setTabKey] = useState("mota");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Tìm sản phẩm trong productsData dựa trên ID
    const foundProduct = productsData.find((p) => p.id === id);
    setProduct(foundProduct);
    const savedReviews = localStorage.getItem(`product_reviews_${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [id]); // Chạy lại effect khi ID thay đổi

  useEffect(() => {
    if (product && product.image) {
      setMainImage(product.image);
    }
  }, [product]); // Dependency là product, chạy lại khi product thay đổi

  useEffect(() => {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setIsWishlisted(wishlistItems.includes(id));
  }, [id]);

  const handleReviewSubmit = () => {
    if (!review.comment.trim()) {
      toast.warn("Vui lòng nhập nội dung đánh giá!");
      return;
    }
    const newReview = {
      id: Date.now(),
      productId: id,
      rating: review.rating,
      comment: review.comment,
      date: formatDate(new Date()),
      user: JSON.parse(localStorage.getItem("currentUser"))?.name || "Khách",
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(
      `product_reviews_${id}`,
      JSON.stringify(updatedReviews)
    );
    setShowReviewModal(false);
    setReview({ rating: 5, comment: "" });
    toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
  };

  // Tính điểm trung bình và tỷ lệ từng mức sao
  const totalReviews = reviews.length;
  const avgRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;
  const starStats = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      star,
      count,
      percent: totalReviews ? Math.round((count / totalReviews) * 100) : 0,
    };
  });

  if (!product) {
    // Xử lý trường hợp không tìm thấy sản phẩm
    return (
      <Container className="py-4 text-center">
        <h2>Không tìm thấy sản phẩm</h2>
        <p>Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast.warn("Vui lòng chọn kích thước!", { position: "top-right" });
      return;
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      toast.warn("Vui lòng chọn màu sắc!", { position: "top-right" });
      return;
    }

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    };

    // Get existing cart items from localStorage
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the item with the same ID, size, and color already exists in the cart
    const existingItemIndex = existingCartItems.findIndex(
      (item) =>
        item.id === itemToAdd.id &&
        item.size === itemToAdd.size &&
        item.color === itemToAdd.color
    );

    if (existingItemIndex > -1) {
      // If item exists, update the quantity
      existingCartItems[existingItemIndex].quantity += quantity;
    } else {
      // If item does not exist, add it to the cart
      existingCartItems.push(itemToAdd);
    }

    // Save updated cart items back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    // Phát event để cập nhật icon
    window.dispatchEvent(new Event("cartChanged"));

    toast.success("Sản phẩm đã được thêm vào giỏ hàng!", {
      position: "top-right",
    });
  };

  const handleAddToWishlist = () => {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    let updatedWishlist;

    if (isWishlisted) {
      // Remove from wishlist
      updatedWishlist = wishlistItems.filter((item) => item !== id);
      toast.info("Sản phẩm đã xóa khỏi danh sách yêu thích!", {
        position: "top-right",
      });
    } else {
      // Add to wishlist
      updatedWishlist = [...wishlistItems, id];
      toast.success("Sản phẩm đã thêm vào danh sách yêu thích!", {
        position: "top-right",
      });
    }

    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    // Phát event để cập nhật icon
    window.dispatchEvent(new Event("favoritesChanged"));
    setIsWishlisted(!isWishlisted); // Toggle wishlist state
  };

  return (
    <Container className="py-5">
      <Row className="mb-3">
        <Col>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="text-dark text-decoration-none p-0"
          >
            <FaArrowLeft className="me-2" /> Quay lại
          </Button>
        </Col>
      </Row>
      <Row>
        {/* Product Images */}
        <Col md={6}>
          <div className="product-gallery mb-4">
            <div className="main-image-container mb-3">
              <img
                src={mainImage}
                alt={product.name}
                className="rounded main-image"
                style={{
                  width: "100%",
                  height: "516px",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        </Col>

        {/* Product Info */}
        <Col md={6}>
          <div className="product-info">
            <h1 className="product-title mb-3">{product.name}</h1>

            {/* Price and Badges */}
            <div className="price-section mb-4">
              <div className="d-flex align-items-center mb-2">
                <span className="current-price h3 text-danger me-3">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="original-price text-decoration-line-through text-muted">
                    {product.originalPrice}
                  </span>
                )}
                {product.isNewArrival && (
                  <Badge bg="success" className="ms-2">
                    Mới
                  </Badge>
                )}
                {product.isOnSale && (
                  <Badge bg="danger" className="ms-2">
                    Sale
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="description-section mb-4">
              <p className="text-muted">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="size-section mb-4">
                <h6 className="mb-3">Kích thước</h6>
                <div className="size-buttons d-flex flex-wrap gap-2 ">
                  {(product.category === "quan"
                    ? ["28", "29", "30", "31", "32", "33", "34"]
                    : product.sizes
                  ).map((size) => (
                    <Button
                      key={size}
                      variant={
                        selectedSize === size ? "primary" : "outline-secondary"
                      }
                      onClick={() => setSelectedSize(size)}
                      className="size-button"
                      style={{
                        minWidth: "50px",
                        borderRadius: "4px",
                        borderWidth: "1px",
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="color-section mb-4">
                <h6 className="mb-3">Màu sắc</h6>
                <div className="color-buttons d-flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={
                        selectedColor === color
                          ? "primary"
                          : "outline-secondary"
                      }
                      className="color-button text-capitalize"
                      onClick={() => setSelectedColor(color)}
                      style={{
                        borderRadius: "4px",
                        borderWidth: "1px",
                      }}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="quantity-section mb-4">
              <h6 className="mb-3">Số lượng</h6>
              <div className="quantity-control d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                  style={{ borderRadius: "4px 0 0 4px" }}
                >
                  -
                </Button>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="quantity-input text-center"
                  style={{
                    width: "70px",
                    borderRadius: "0",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                  style={{ borderRadius: "0 4px 4px 0" }}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons mb-4">
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={
                    (product.sizes &&
                      product.sizes.length > 0 &&
                      !selectedSize) ||
                    (product.colors &&
                      product.colors.length > 0 &&
                      !selectedColor)
                  }
                  className="add-to-cart-btn w-50"
                  style={{
                    borderRadius: "4px",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="buy-now-btn w-50"
                  style={{
                    borderRadius: "4px",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  onClick={() => {
                    if (
                      product.sizes &&
                      product.sizes.length > 0 &&
                      !selectedSize
                    ) {
                      alert("Vui lòng chọn kích thước");
                      return;
                    }
                    if (
                      product.colors &&
                      product.colors.length > 0 &&
                      !selectedColor
                    ) {
                      alert("Vui lòng chọn màu sắc");
                      return;
                    }
                    // Tạo item mua ngay
                    const buyNowItem = {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: quantity,
                      size: selectedSize,
                      color: selectedColor,
                    };
                    // Lưu vào localStorage (key riêng cho mua ngay)
                    localStorage.setItem(
                      "selectedCheckoutItems",
                      JSON.stringify([buyNowItem])
                    );
                    navigate("/checkout");
                  }}
                >
                  Mua ngay
                </Button>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="additional-actions d-flex gap-3 mb-4">
              <Button
                variant="link"
                className="text-dark text-decoration-none p-0"
                onClick={handleAddToWishlist}
              >
                <FaHeart
                  className="me-2"
                  style={{ color: isWishlisted ? "red" : "" }}
                />
                {isWishlisted ? "Đã thêm vào yêu thích" : "Thêm vào yêu thích"}
              </Button>
              <Button
                variant="link"
                className="text-dark text-decoration-none p-0"
              >
                <FaShare className="me-2" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Details Section */}
      <Row className="mt-5">
        <Col md={12}>
          <Tabs
            id="product-tabs"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="mb-4"
          >
            <Tab eventKey="mota" title="Mô tả">
              <Card className="border-0 shadow-sm mt-3">
                <Card.Body>
                  {product.details && product.details.length > 0 ? (
                    <ul className="list-unstyled">
                      {product.details.map((detail, index) => (
                        <li
                          key={index}
                          className="mb-3 d-flex align-items-start"
                        >
                          <span className="me-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Thông tin chi tiết sản phẩm đang được cập nhật.</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="size" title="Hướng dẫn chọn size">
              <Card className="border-0 shadow-sm mt-3">
                <Card.Body>
                  <p>Bảng size tham khảo:</p>
                  <ul>
                    <li>S: Dưới 55kg, cao dưới 1m65</li>
                    <li>M: 55-65kg, cao 1m65-1m70</li>
                    <li>L: 65-75kg, cao 1m70-1m75</li>
                    <li>XL: 75-85kg, cao 1m75-1m80</li>
                    <li>2XL: Trên 85kg hoặc cao trên 1m80</li>
                  </ul>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="policy" title="Chính sách bán hàng">
              <Card className="border-0 shadow-sm mt-3">
                <Card.Body>
                  <div style={{ fontSize: 16 }}>
                    <div className="mb-3">
                      <span role="img" aria-label="gift">
                        🎁
                      </span>
                      <b> ƯU ĐÃI ĐẶT ĐƠN WEBSITE PELAGOS:</b>
                      <ul style={{ marginBottom: 0 }}>
                        <li>Freeship toàn quốc – Phí 0 đ</li>
                        <li>Đổi hàng tận nhà phí 20K, qua sđt.</li>
                        <li>Voucher 25K, 50K Tháng 6</li>
                      </ul>
                    </div>
                    <div className="mb-3">
                      <span role="img" aria-label="truck">
                        🚚
                      </span>
                      <b> GIAO HÀNG NHANH – TIỆN LỢI</b>
                      <ul style={{ marginBottom: 0 }}>
                        <li>
                          Đặt trước <b>14h</b>, gửi đơn đi giao{" "}
                          <b>trong ngày</b> (Toàn quốc)
                        </li>
                        <li>Kiểm tra hàng trước khi thanh toán</li>
                      </ul>
                    </div>
                    <div className="mb-3">
                      <span role="img" aria-label="exchange">
                        🔄
                      </span>
                      <b> ĐỔI SIZE DỄ DÀNG</b>
                      <ul style={{ marginBottom: 0 }}>
                        <li>
                          Đổi size tận nhà, <b>nhanh & gọn</b>
                        </li>
                        <li>
                          SP lỗi/sai mô tả: <b>PELAGOS chịu phí ship</b>
                        </li>
                        <li>
                          Đổi do nhu cầu cá nhân: <b>chỉ 20K phí ship</b>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-3">
                      <span role="img" aria-label="money">
                        💰
                      </span>
                      <b> TRẢ HÀNG – HOÀN TIỀN</b>
                      <ul style={{ marginBottom: 0 }}>
                        <li>
                          Trả hàng trong <b>15 ngày</b> nếu lỗi
                        </li>
                        <li>
                          <b>Hoàn tiền 100%</b> nếu lỗi từ nhà sản xuất
                        </li>
                        <li>
                          Đổi trả nhanh theo <b>số điện thoại đặt hàng</b>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-2">
                      <span role="img" aria-label="phone">
                        📞
                      </span>
                      Hỗ trợ <b>Hotline: 032 992 6956</b>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Đánh giá sản phẩm */}
      <Row className="mt-5">
        <Col md={12}>
          <h4 className="mb-3">Đánh giá sản phẩm</h4>
          <div className="d-flex align-items-center mb-4">
            <span style={{ fontSize: 48, fontWeight: 700, marginRight: 16 }}>
              {avgRating}
            </span>
            <div>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    color={
                      star <= Math.round(avgRating) ? "#ffc107" : "#e4e5e9"
                    }
                    size={28}
                  />
                ))}
              </div>
              <div className="text-muted">{totalReviews} đánh giá</div>
            </div>
          </div>
          <Row className="mb-4">
            {starStats.map((stat) => (
              <Col key={stat.star} xs={6} md={2} className="mb-2 text-center">
                <div className="d-flex flex-column align-items-center">
                  <span className="mb-1">{stat.star} sao</span>
                  <ProgressBar
                    now={stat.percent}
                    style={{ width: "60px", height: "8px" }}
                  />
                  <span className="text-muted small">{stat.percent}%</span>
                </div>
              </Col>
            ))}
          </Row>
          <div className="mb-3 text-end">
            <Button variant="primary" onClick={() => setShowReviewModal(true)}>
              Viết đánh giá
            </Button>
          </div>
          {reviews.length > 0 ? (
            <ListGroup variant="flush">
              {reviews.map((review) => (
                <ListGroup.Item key={review.id}>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <strong>{review.user}</strong>
                      <div className="text-warning">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < review.rating ? "text-warning" : "text-muted"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <small className="text-muted">{review.date}</small>
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">Chưa có đánh giá nào cho sản phẩm này.</p>
          )}
        </Col>
      </Row>
      {/* Modal đánh giá */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Viết đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Đánh giá của bạn</Form.Label>
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className="cursor-pointer"
                    style={{ cursor: "pointer" }}
                    color={star <= review.rating ? "#ffc107" : "#e4e5e9"}
                    onClick={() => setReview({ ...review, rating: star })}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nhận xét của bạn</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleReviewSubmit}>
            Gửi đánh giá
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetail;
