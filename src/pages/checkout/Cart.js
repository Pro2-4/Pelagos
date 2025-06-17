import React, { useState, useEffect, useMemo } from "react";
import { Container, Card, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import productsData from "../../data/productsData";
import { toast } from "react-toastify";
import { formatPrice } from "../../utils";

const Cart = () => {
  const getProductPriceAsNumber = (priceString) => {
    return parseInt(priceString.replace(/[^\d]/g, "")) || 0;
  };

  const getInitialCartItems = () => {
    try {
      const savedCartItems = localStorage.getItem("cartItems");
      const items = savedCartItems ? JSON.parse(savedCartItems) : [];
      return items
        .filter((item) => productsData.some((p) => p.id === item.id))
        .map((item) => ({ ...item, isSelected: item.isSelected ?? true }));
    } catch (error) {
      console.error("Lỗi khi đọc giỏ hàng:", error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(getInitialCartItems());

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // Phát event để cập nhật icon
      window.dispatchEvent(new Event("cartChanged"));
    } catch (error) {
      console.error("Lỗi khi lưu giỏ hàng:", error);
      toast.error("Có lỗi xảy ra khi lưu giỏ hàng!", { position: "top-right" });
    }
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.info("Đã xóa sản phẩm khỏi giỏ hàng!", { position: "top-right" });
  };

  const toggleItemSelection = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const toggleAllItems = (checked) => {
    setCartItems(cartItems.map((item) => ({ ...item, isSelected: checked })));
  };

  const calculateSubtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      if (!item.isSelected) return total;
      const product = productsData.find((p) => p.id === item.id);
      if (!product) return total;
      const price = getProductPriceAsNumber(product.price);
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const allItemsSelected = cartItems.every((item) => item.isSelected);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h4>Giỏ hàng của bạn đang trống</h4>
            <p className="text-muted mb-4">
              Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
            </p>
            <Button
              as={Link}
              to="/products"
              variant="primary"
              className="mx-auto d-block"
            >
              Tiếp tục mua sắm
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        type="checkbox"
                        checked={allItemsSelected}
                        onChange={(e) => toggleAllItems(e.target.checked)}
                      />
                    </th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const product = productsData.find((p) => p.id === item.id);
                    if (!product) return null;

                    return (
                      <tr key={item.id}>
                        <td className="align-middle">
                          <Form.Check
                            type="checkbox"
                            checked={item.isSelected}
                            onChange={() => toggleItemSelection(item.id)}
                          />
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width: "80px", marginRight: "15px" }}
                            />
                            <div>
                              <h6 className="mb-1">{product.name}</h6>
                              <small className="text-muted">
                                Size: {item.size} | Màu: {item.color}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">{product.price}</td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <Form.Control
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="mx-2"
                              style={{ width: "60px" }}
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="align-middle">
                          {formatPrice(
                            getProductPriceAsNumber(product.price) *
                              item.quantity
                          )}
                        </td>
                        <td className="align-middle">
                          <Button
                            variant="link"
                            className="text-danger"
                            onClick={() => removeItem(item.id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="mb-4">Tổng đơn hàng</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính</span>
                <span>{formatPrice(calculateSubtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Tổng cộng</strong>
                <strong className="text-danger">
                  {formatPrice(calculateSubtotal)}
                </strong>
              </div>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => {
                  const selectedItems = cartItems.filter(
                    (item) => item.isSelected
                  );
                  if (selectedItems.length === 0) {
                    alert("Vui lòng chọn ít nhất một sản phẩm để mua!");
                    return;
                  }
                  localStorage.setItem(
                    "selectedCheckoutItems",
                    JSON.stringify(selectedItems)
                  );
                  window.location.href = "/checkout";
                }}
              >
                Mua hàng
              </Button>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Cart;
