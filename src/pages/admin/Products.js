import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Image,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import productsData from "../../data/productsData";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "ao", name: "Áo Nam" },
    { id: "quan", name: "Quần Nam" },
    { id: "phukien", name: "Phụ Kiện" },
    { id: "giay", name: "Giày" },
    { id: "balo", name: "Balo & Túi xách" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleSave = (productData) => {
    if (editingProduct) {
      // Edit existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: `prod${Date.now()}`,
        ...productData,
        isNewArrival: false,
        isOnSale: false,
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const getStatusBadge = (product) => {
    if (product.isNewArrival) return <Badge bg="success">Mới</Badge>;
    if (product.isOnSale) return <Badge bg="danger">Sale</Badge>;
    return <Badge bg="secondary">Thường</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý sản phẩm</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tìm kiếm</Form.Label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Danh mục</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Products Table */}
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      rounded
                    />
                  </td>
                  <td>
                    <div>
                      <strong>{product.name}</strong>
                      <br />
                      <small className="text-muted">ID: {product.id}</small>
                    </div>
                  </td>
                  <td>
                    <Badge bg="info">
                      {categories.find((c) => c.id === product.category)
                        ?.name || product.category}
                    </Badge>
                  </td>
                  <td>
                    <div>
                      <strong className="text-danger">{product.price}</strong>
                      {product.originalPrice && (
                        <div>
                          <small className="text-decoration-line-through text-muted">
                            {product.originalPrice}
                          </small>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{getStatusBadge(product)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <ProductModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={handleSave}
        categories={categories}
      />
    </Container>
  );
};

// Product Modal Component
const ProductModal = ({ show, onHide, product, onSave, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "ao",
    description: "",
    sizes: [],
    colors: [],
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        category: product.category || "ao",
        description: product.description || "",
        sizes: product.sizes || [],
        colors: product.colors || [],
        image: product.image || "",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        originalPrice: "",
        category: "ao",
        description: "",
        sizes: [],
        colors: [],
        image: "",
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories
                    .filter((c) => c.id !== "all")
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giá hiện tại</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="VD: 299.000đ"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giá gốc</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  placeholder="VD: 799.000đ"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL hình ảnh</Form.Label>
            <Form.Control
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="/assets/shirt/prod1.webp"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {product ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Products;
