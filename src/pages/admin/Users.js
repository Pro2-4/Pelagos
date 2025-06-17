import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Badge,
  Form,
} from "react-bootstrap";
import { FaEye, FaBan, FaCheck, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)
  );

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const getStatusBadge = (user) => {
    if (user.isBlocked) {
      return <Badge bg="danger">Đã khóa</Badge>;
    }
    return <Badge bg="success">Hoạt động</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý người dùng</h2>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày đăng ký</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.id}</strong>
                  </td>
                  <td>
                    <div>
                      <strong>{user.name}</strong>
                      <br />
                      <small className="text-muted">
                        {user.gender === "male"
                          ? "Nam"
                          : user.gender === "female"
                          ? "Nữ"
                          : "Khác"}
                      </small>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.registrationDate || "Không có"}</td>
                  <td>{getStatusBadge(user)}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewUser(user)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant={
                          user.isBlocked ? "outline-success" : "outline-warning"
                        }
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.isBlocked ? <FaCheck /> : <FaBan />}
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">Không có người dùng nào</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* User Detail Modal */}
      <UserDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
      />
    </Container>
  );
};

// User Detail Modal Component
const UserDetailModal = ({ show, onHide, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết người dùng - {user.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h6>Thông tin cá nhân</h6>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Họ tên:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {user.phone}
            </p>
            <p>
              <strong>Giới tính:</strong>{" "}
              {user.gender === "male"
                ? "Nam"
                : user.gender === "female"
                ? "Nữ"
                : "Khác"}
            </p>
            <p>
              <strong>Ngày sinh:</strong> {user.birthDate || "Không có"}
            </p>
          </Col>
          <Col md={6}>
            <h6>Thông tin tài khoản</h6>
            <p>
              <strong>Ngày đăng ký:</strong>{" "}
              {user.registrationDate || "Không có"}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {user.isBlocked ? (
                <Badge bg="danger">Đã khóa</Badge>
              ) : (
                <Badge bg="success">Hoạt động</Badge>
              )}
            </p>
            <p>
              <strong>Loại tài khoản:</strong> {user.role || "Người dùng"}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {user.address || "Không có"}
            </p>
            <p>
              <strong>Ghi chú:</strong> {user.notes || "Không có"}
            </p>
          </Col>
        </Row>

        <hr />

        <h6>Thống kê hoạt động</h6>
        <Row>
          <Col md={3}>
            <div className="text-center">
              <h4 className="text-primary">0</h4>
              <small>Đơn hàng</small>
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center">
              <h4 className="text-success">0đ</h4>
              <small>Tổng chi tiêu</small>
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center">
              <h4 className="text-info">0</h4>
              <small>Sản phẩm yêu thích</small>
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center">
              <h4 className="text-warning">0</h4>
              <small>Lần đăng nhập</small>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Users;
