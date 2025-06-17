import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import productsData from "../../data/productsData"; // Import products data

// Helper function to convert price string to number
const priceToNumber = (priceString) => {
  return parseInt(priceString.replace(/[^0-9]/g, "")) || 0;
};

const Products = () => {
  // Use separate states for applied filters and temporary filters (for Apply button)
  const [appliedCategories, setAppliedCategories] = useState(["all"]);
  const [appliedSizes, setAppliedSizes] = useState([]);
  const [appliedColors, setAppliedColors] = useState([]);
  const [appliedStockStatus, setAppliedStockStatus] = useState("all");
  const [appliedPriceRange, setAppliedPriceRange] = useState("all");
  const [appliedSortBy, setAppliedSortBy] = useState("newest"); // Keep sorting applied immediately

  const [tempCategories, setTempCategories] = useState(["all"]);
  const [tempSizes, setTempSizes] = useState([]);
  const [tempColors, setTempColors] = useState([]);
  const [tempStockStatus, setTempStockStatus] = useState("all");
  const [tempPriceRange, setTempPriceRange] = useState("all");

  // State to control filter card visibility
  const [showFilterCard, setShowFilterCard] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate hook
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search"); // Get search term from URL

  // Initialize state based on URL params (if any)
  useEffect(() => {
    if (initialCategory) {
      setAppliedCategories([initialCategory]);
      setTempCategories([initialCategory]);
    } else {
      // If no category in URL, reset to "all"
      setAppliedCategories(["all"]);
      setTempCategories(["all"]);
    }
  }, [initialCategory, location.search]); // Depend on location.search to re-run when URL changes

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Số sản phẩm mỗi trang

  // Updated categories list to match image requirements
  const categories = [
    { id: "all", name: "Tất cả sản phẩm" },
    { id: "ao", name: "Áo Nam" },
    { id: "quan", name: "Quần Nam" },
    { id: "phukien", name: "Phụ Kiện" },
    { id: "giay", name: "Giày" },
    { id: "balo", name: "Balo & Túi xách" },
  ];

  const sizes = useMemo(() => {
    if (tempCategories.includes("quan") || tempCategories.includes("all")) {
      return [
        { id: "28", name: "28" },
        { id: "29", name: "29" },
        { id: "30", name: "30" },
        { id: "31", name: "31" },
        { id: "32", name: "32" },
        { id: "33", name: "33" },
        { id: "34", name: "34" },
        { id: "XS", name: "XS" },
        { id: "S", name: "S" },
        { id: "M", name: "M" },
        { id: "L", name: "L" },
        { id: "XL", name: "XL" },
        { id: "2XL", name: "2XL" },
      ];
    } else {
      return [
        { id: "XS", name: "XS" },
        { id: "S", name: "S" },
        { id: "M", name: "M" },
        { id: "L", name: "L" },
        { id: "XL", name: "XL" },
        { id: "2XL", name: "2XL" },
      ];
    }
  }, [tempCategories]);

  const availableColors = useMemo(() => {
    const colors = new Set();
    productsData.forEach((product) => {
      if (product.colors && Array.isArray(product.colors)) {
        product.colors.forEach((color) => colors.add(color));
      }
    });
    return Array.from(colors);
  }, []);

  // Mapping colors to hex codes (example, actual implementation might need a mapping)
  const colorHexMap = {
    Đen: "#000000",
    Trắng: "#FFFFFF",
    Xám: "#808080",
    Bạc: "#C0C0C0",
    Đỏ: "#FF0000",
    Hồng: "#FFC0CB",
    Cam: "#FFA500",
    Vàng: "#FFFF00",
    Be: "#F5F5DC",
    Nâu: "#A52A2A",
    "Nâu nhạt": "#D2B48C",
    "Xanh lá": "#008000",
    "Xanh lá nhạt": "#90EE90",
    "Xanh lá đậm": "#006400",
    "Xanh rêu": "#556B2F",
    Xanh: "#0000FF",
    "Xanh dương": "#4682B4",
    "Xanh da trời": "#87CEFA",
    "Xanh navy": "#000080",
    "Xanh lam": "#1E90FF",
    "Xanh ngọc": "#40E0D0",
    "Xanh ngọc đậm": "#008080",
    Tím: "#800080",
    "Tím pastel": "#D8BFD8",
    Ghi: "#D3D3D3",
    "Ghi đậm": "#A9A9A9",
    "Vàng chanh": "#E3CF57",
    "Cam đất": "#CD853F",
    "Hồng đất": "#C08081",
    "Đỏ đô": "#8B0000",
    "Đỏ cam": "#FF4500",
    "Hồng sen": "#FF69B4",
    "Hồng pastel": "#FFD1DC",
  };

  // Hàm xử lý thay đổi danh mục (Applies immediately)
  const handleCategoryChange = (categoryId) => {
    // When a category button is clicked, set both temporary and applied state
    setTempCategories([categoryId]);
    setAppliedCategories([categoryId]);
    setCurrentPage(1); // Reset to page 1 on category change

    // Update URL with selected category
    const newSearchParams = new URLSearchParams(location.search);
    if (categoryId === "all") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", categoryId);
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  // Hàm xử lý thay đổi size (Temporary state)
  const handleSizeChange = (sizeId) => {
    setTempSizes((prev) =>
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId]
    );
    // Note: Filters are applied only on clicking "ÁP DỤNG"
  };

  // Hàm xử lý thay đổi màu sắc (Temporary state)
  const handleColorChange = (color) => {
    setTempColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    // Note: Filters are applied only on clicking "ÁP DỤNG"
  };

  // Hàm xử lý thay đổi tình trạng hàng (Temporary state)
  const handleStockStatusChange = (status) => {
    setTempStockStatus(status);
    // Note: Filters are applied only on clicking "ÁP DỤNG"
  };

  // Hàm xử lý thay đổi sắp xếp - Applies immediately (not on "ÁP DỤNG") based on image
  const handleSortByChange = (sortOption) => {
    setAppliedSortBy(sortOption);
    setCurrentPage(1); // Reset to page 1 on sort change
  };

  // Apply Filters button logic
  const handleApplyFilters = () => {
    setAppliedCategories(tempCategories);
    setAppliedSizes(tempSizes);
    setAppliedColors(tempColors);
    setAppliedStockStatus(tempStockStatus);
    setAppliedPriceRange(tempPriceRange);
    setCurrentPage(1); // Reset to page 1 on applying filters
  };

  // Reset Filters button logic
  const handleResetFilters = () => {
    setTempCategories(["all"]);
    setTempSizes([]);
    setTempColors([]);
    setTempStockStatus("all");
    setTempPriceRange("all");
    setAppliedCategories(["all"]);
    setAppliedSizes([]);
    setAppliedColors([]);
    setAppliedStockStatus("all");
    setAppliedPriceRange("all");
    setAppliedSortBy("newest"); // Reset sort as well
    setCurrentPage(1);
  };

  // Toggle filter card visibility
  const toggleFilterCard = () => {
    setShowFilterCard((prev) => !prev);
  };

  // Lọc và sắp xếp sản phẩm - Uses applied states
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData;

    // Lọc theo từ khóa tìm kiếm (always applied)
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Lọc theo danh mục (Applied state)
    if (appliedCategories.length > 0 && !appliedCategories.includes("all")) {
      filtered = filtered.filter((product) =>
        appliedCategories.includes(product.category)
      );
    }

    // Lọc theo size (Applied state)
    if (appliedSizes.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.sizes &&
          product.sizes.some((size) => appliedSizes.includes(size))
      );
    }

    // Lọc theo màu sắc (Applied state)
    if (appliedColors.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.colors &&
          product.colors.some((color) => appliedColors.includes(color))
      );
    }

    // Lọc theo tình trạng hàng (Applied state)
    if (appliedStockStatus !== "all") {
      // Assuming isOnSale indicates 'in stock' for this mock data
      if (appliedStockStatus === "inStock") {
        filtered = filtered.filter((product) => product.isOnSale);
      } else if (appliedStockStatus === "outOfStock") {
        filtered = filtered.filter((product) => !product.isOnSale);
      }
    }

    // Lọc theo khoảng giá (Applied state)
    if (appliedPriceRange !== "all") {
      filtered = filtered.filter((product) => {
        const price = priceToNumber(product.price);

        if (appliedPriceRange === "0-200") return price <= 200000;
        if (appliedPriceRange === "200-500")
          return price > 200000 && price <= 500000;
        if (appliedPriceRange === "500-1000")
          return price > 500000 && price <= 1000000;
        if (appliedPriceRange === "1000+") return price > 1000000;
        return true; // Trả về tất cả nếu không khớp
      });
    }

    // Sắp xếp (Applied state - applies immediately)
    const sorted = [...filtered].sort((a, b) => {
      if (appliedSortBy === "newest") {
        return b.id.localeCompare(a.id);
      } else if (appliedSortBy === "price-asc") {
        const priceA = priceToNumber(a.price);
        const priceB = priceToNumber(b.price);
        return priceA - priceB;
      } else if (appliedSortBy === "price-desc") {
        const priceA = priceToNumber(a.price);
        const priceB = priceToNumber(b.price);
        return priceB - priceA;
      } else if (appliedSortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (appliedSortBy === "banchay") {
        // Sorting by 'Bán chạy' requires sales data, not implementable with current data.
        return 0;
      }
      return 0; // Default no sort
    });

    return sorted;
  }, [
    searchTerm,
    appliedCategories,
    appliedSizes,
    appliedColors,
    appliedStockStatus,
    appliedPriceRange,
    appliedSortBy,
  ]); // Depend on applied states

  // Reset về trang 1 khi applied filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    appliedCategories,
    appliedSizes,
    appliedColors,
    appliedStockStatus,
    appliedPriceRange,
    appliedSortBy,
  ]);

  // Get products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="py-4">
      {/* Category Filter Buttons at the top and Filter button*/}
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              // Check against appliedCategories state for active style
              variant={
                appliedCategories.includes(category.id) ? "dark" : "light"
              }
              onClick={() => handleCategoryChange(category.id)}
              className="me-2 mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>
        {/* Bộ lọc button */}
        <Button variant="outline-secondary" onClick={toggleFilterCard}>
          Bộ lọc <i className="bi bi-sliders"></i>
        </Button>
      </div>

      {/* Filters Section - Conditionally rendered */}
      {showFilterCard && (
        <Card className="mb-4">
          <Card.Body>
            {/* Hàng trên: Color - Size - Sắp xếp */}
            <Row className="mb-3">
              {/* Color Filter */}
              <Col md={4} className="mb-3">
                <h6 className="fw-bold mb-2">Color</h6>
                <div className="d-flex flex-wrap gap-1">
                  {availableColors.map((color) => (
                    <div
                      key={color}
                      className={`color-swatch ${
                        tempColors.includes(color) ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: colorHexMap[color] || "#ccc",
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        border: tempColors.includes(color)
                          ? "2px solid #000"
                          : "1px solid #ccc",
                      }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    ></div>
                  ))}
                </div>
              </Col>

              {/* Size Filter */}
              <Col md={4} className="mb-3">
                <h6 className="fw-bold mb-2">Size</h6>
                <div className="d-flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size.id}
                      variant={
                        tempSizes.includes(size.id)
                          ? "dark"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() => handleSizeChange(size.id)}
                    >
                      {size.name}
                    </Button>
                  ))}
                </div>
              </Col>

              {/* Sorting */}
              <Col md={4} className="mb-3">
                <h6 className="fw-bold mb-2">SẮP XẾP</h6>
                <div className="d-flex flex-wrap gap-2">
                  <Button
                    variant={
                      appliedSortBy === "price-desc"
                        ? "dark"
                        : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => handleSortByChange("price-desc")}
                  >
                    Giá cao nhất
                  </Button>
                  <Button
                    variant={
                      appliedSortBy === "price-asc"
                        ? "dark"
                        : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => handleSortByChange("price-asc")}
                  >
                    Giá thấp nhất
                  </Button>
                  <Button
                    variant={
                      appliedSortBy === "banchay" ? "dark" : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => handleSortByChange("banchay")}
                    disabled
                  >
                    Bán chạy
                  </Button>
                  <Button
                    variant={
                      appliedSortBy === "newest" ? "dark" : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => handleSortByChange("newest")}
                  >
                    Mới nhất
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Tình trạng */}
            <Row className="mb-3">
              <Col md={4}>
                <h6 className="fw-bold mb-2">TÌNH TRẠNG</h6>
                <div className="d-flex gap-2">
                  <Button
                    variant={
                      tempStockStatus === "outOfStock"
                        ? "dark"
                        : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => handleStockStatusChange("outOfStock")}
                  >
                    Hết hàng
                  </Button>
                  <Button
                    variant={
                      tempStockStatus === "inStock"
                        ? "dark"
                        : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => handleStockStatusChange("inStock")}
                  >
                    Còn hàng
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Action buttons */}
            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={handleResetFilters}
              >
                ĐẶT LẠI
              </Button>
              <Button variant="dark" onClick={handleApplyFilters}>
                ÁP DỤNG
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Products Grid */}
      <Row className="align-items-stretch">
        {currentProducts.map((product) => (
          <Col
            key={product.id}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex flex-column"
          >
            <Card className="h-100 product-card">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
              />
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-danger fw-bold mt-auto">
                  {product.price}
                </Card.Text>
                <Button
                  as={Link}
                  to={`/product/${product.id}`}
                  variant="primary"
                  className="w-100 mt-auto"
                >
                  Xem chi tiết
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        </Pagination>
      </div>
      {/* Added style tag for custom styles */}
      <style>
        {`
          .product-card {
            box-shadow: none !important;
          }
          .product-card:hover {
            transform: none !important;
            box-shadow: none !important;
          }
          .color-swatch {
              border-radius: 50%;
          }
          .color-swatch.selected {
              border: 2px solid #000 !important;
          }
        `}
      </style>
    </Container>
  );
};

export default Products;
