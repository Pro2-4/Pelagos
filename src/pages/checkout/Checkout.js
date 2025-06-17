import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Collapse,
} from "react-bootstrap";
import productsData from "../../data/productsData";
import { useNavigate } from "react-router-dom";
import { formatPrice, formatDateTime } from "../../utils";
import { PAYMENT_METHODS, ORDER_STATUS } from "../../constants";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState("Nhanh (Miễn phí)");
  const [selectedPayment, setSelectedPayment] = useState(
    "Thanh toán khi nhận hàng"
  );
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    phone: "",
    notes: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // Ưu tiên lấy sản phẩm từ selectedCheckoutItems nếu có
    const selectedCheckoutItems = JSON.parse(
      localStorage.getItem("selectedCheckoutItems")
    );
    let itemsToCheckout = [];
    if (selectedCheckoutItems && selectedCheckoutItems.length > 0) {
      itemsToCheckout = selectedCheckoutItems;
    } else {
      itemsToCheckout = JSON.parse(localStorage.getItem("cartItems")) || [];
    }
    setCartItems(itemsToCheckout);

    const calculatedSubtotal = itemsToCheckout.reduce((sum, item) => {
      const product = productsData.find((p) => p.id === item.id);
      if (!product) return sum;
      const price = parseInt(product.price.replace(/[^\d]/g, "")) || 0;
      return sum + price * item.quantity;
    }, 0);
    setSubtotal(calculatedSubtotal);
  }, []);

  const shippingOptions = {
    "Nhanh (Miễn phí)": 0,
    "Tiết kiệm (15.000đ)": 15000,
  };

  const shippingFee = shippingOptions[selectedShipping] || 0;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.firstName ||
      !form.lastName ||
      !form.address ||
      !form.city ||
      !form.district ||
      !form.ward ||
      !form.phone
    ) {
      setFormError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    // Lưu đơn hàng vào localStorage
    const orderId = `DH${new Date()
      .toISOString()
      .replace(/[-:T.]/g, "")
      .slice(0, 12)}${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
    const order = {
      id: orderId,
      date: formatDateTime(new Date()),
      status: ORDER_STATUS.PENDING,
      total,
      shippingFee,
      paymentMethod: selectedPayment,
      trackingCode: `VN${Math.floor(Math.random() * 100000000)}`,
      timeline: [
        { status: "Đặt hàng", time: formatDateTime(new Date()) },
        { status: ORDER_STATUS.PENDING, time: formatDateTime(new Date()) },
      ],
      items: cartItems.map((item) => {
        const product = productsData.find((p) => p.id === item.id);
        return {
          id: item.id,
          name: product?.name || "",
          image: product?.image || "",
          price: parseInt(product?.price?.replace(/[^\d]/g, "")) || 0,
          quantity: item.quantity,
        };
      }),
      shippingInfo: { ...form },
      note: form.notes,
    };
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    // Xóa các sản phẩm đã mua khỏi cartItems gốc
    const oldCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCart = oldCart.filter(
      (item) =>
        !cartItems.some(
          (ci) =>
            ci.id === item.id &&
            ci.size === item.size &&
            ci.color === item.color
        )
    );
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    localStorage.removeItem("selectedCheckoutItems");
    navigate("/order-success");
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Thanh toán</h2>
      <Row>
        <Col md={7}>
          {/* Thông tin giao hàng */}
          <Card className="mb-4 h-100">
            <Card.Body>
              <h5 className="mb-4">Thông tin giao hàng</h5>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>Họ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập họ"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    placeholder="Ví dụ: 123 Đường ABC"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Tỉnh/Thành phố</Form.Label>
                    <Form.Control
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridDistrict">
                    <Form.Label>Quận/Huyện</Form.Label>
                    <Form.Control
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridWard">
                    <Form.Label>Phường/Xã</Form.Label>
                    <Form.Control
                      name="ward"
                      value={form.ward}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridPhone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridNotes">
                  <Form.Label>Ghi chú đơn hàng (tùy chọn)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                  />
                </Form.Group>

                {formError && (
                  <div className="text-danger mb-3">{formError}</div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          {/* Đơn hàng */}
          <Card className="h-100">
            <Card.Body>
              <h5 className="mb-3">Đơn hàng của bạn</h5>
              <Table bordered responsive size="sm" className="mb-3">
                <thead>
                  <tr className="text-center align-middle">
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const product = productsData.find((p) => p.id === item.id);
                    if (!product) return null;
                    const price =
                      parseInt(product.price.replace(/[^\d]/g, "")) || 0;
                    return (
                      <tr key={item.id} className="text-center align-middle">
                        <td>{product.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formatPrice(price * item.quantity)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* Phương thức vận chuyển */}
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <strong>Phương thức vận chuyển</strong>
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowShippingOptions(!showShippingOptions)}
                  >
                    Xem tất cả &gt;
                  </span>
                </div>
                <Collapse in={showShippingOptions}>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Nhanh (Miễn phí)"
                      name="shipping"
                      onChange={() => setSelectedShipping("Nhanh (Miễn phí)")}
                      checked={selectedShipping === "Nhanh (Miễn phí)"}
                    />
                    <Form.Check
                      type="radio"
                      label="Tiết kiệm (15.000đ)"
                      name="shipping"
                      onChange={() =>
                        setSelectedShipping("Tiết kiệm (15.000đ)")
                      }
                      checked={selectedShipping === "Tiết kiệm (15.000đ)"}
                    />
                  </div>
                </Collapse>
                <div className="mt-2">
                  <span>Đã chọn: </span>
                  <strong>{selectedShipping}</strong>
                </div>
              </div>

              {/* Mã giảm giá */}
              <div className="d-flex mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button variant="outline-primary" className="ms-2">
                  Áp dụng
                </Button>
              </div>

              {/* Phương thức thanh toán */}
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <strong>Phương thức thanh toán</strong>
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  >
                    Xem tất cả &gt;
                  </span>
                </div>
                <Collapse in={showPaymentOptions}>
                  <div>
                    <Form.Check
                      type="radio"
                      id="cod"
                      name="payment"
                      label={PAYMENT_METHODS.COD}
                      onChange={() => {
                        setSelectedPayment(PAYMENT_METHODS.COD);
                      }}
                      checked={selectedPayment === PAYMENT_METHODS.COD}
                    />
                    <Form.Check
                      type="radio"
                      id="banking"
                      name="payment"
                      label={PAYMENT_METHODS.BANKING}
                      onChange={() => {
                        setSelectedPayment(PAYMENT_METHODS.BANKING);
                      }}
                      checked={selectedPayment === PAYMENT_METHODS.BANKING}
                    />
                  </div>
                </Collapse>
                {selectedPayment && (
                  <div className="mt-2">{selectedPayment}</div>
                )}
              </div>

              {/* Chi tiết đơn hàng */}
              <div className="mt-4">
                <h6>Chi tiết đơn hàng</h6>
                <div className="d-flex justify-content-between">
                  <span>Tổng tiền hàng</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Tổng tiền thanh toán</strong>
                  <strong className="text-danger">{formatPrice(total)}</strong>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-100 mt-4"
                onClick={handleSubmit}
                type="submit"
              >
                Đặt hàng
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
