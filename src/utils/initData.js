// Khởi tạo dữ liệu mẫu cho ứng dụng
export const initializeSampleData = () => {
  // Khởi tạo users mẫu
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // Kiểm tra xem đã có admin chưa
  const hasAdmin = existingUsers.some((user) => user.role === "admin");

  if (!hasAdmin) {
    const adminUser = {
      id: "admin1",
      name: "Admin",
      email: "admin@pelagos.com",
      phone: "0123456789",
      password: "admin123",
      role: "admin",
      registrationDate: new Date().toISOString(),
      gender: "male",
      birthDate: "1990-01-01",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    };

    existingUsers.push(adminUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    console.log("✅ Đã tạo tài khoản admin mẫu!");
    console.log("📧 Email: admin@pelagos.com");
    console.log("🔑 Mật khẩu: admin123");
  }

  // Khởi tạo settings mẫu
  const existingSettings = localStorage.getItem("adminSettings");
  if (!existingSettings) {
    const defaultSettings = {
      siteName: "PELAGOS",
      siteDescription: "Thời trang nam chất lượng cao",
      contactEmail: "admin@pelagos.com",
      contactPhone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      currency: "VND",
      language: "vi",
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: false,
      maxUploadSize: 5,
      enableNotifications: true,
      theme: "light",
    };
    localStorage.setItem("adminSettings", JSON.stringify(defaultSettings));
    console.log("✅ Đã tạo cài đặt mẫu!");
  }

  // Khởi tạo một số đơn hàng mẫu nếu chưa có
  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  if (existingOrders.length === 0) {
    const sampleOrders = [
      {
        id: "DH20241201001",
        date: "01/12/2024 10:30:00",
        status: "Đã giao",
        total: 1250000,
        shippingFee: 0,
        paymentMethod: "Thanh toán khi nhận hàng",
        trackingCode: "VN12345678",
        timeline: [
          { status: "Đặt hàng", time: "01/12/2024 10:30:00" },
          { status: "Đang xử lý", time: "01/12/2024 11:00:00" },
          { status: "Đang giao", time: "01/12/2024 14:00:00" },
          { status: "Đã giao", time: "02/12/2024 09:00:00" },
        ],
        items: [
          {
            id: "prod1",
            name: "Áo Tank Top Uniqlo",
            image: "/assets/shirt/prod1.webp",
            price: 299000,
            quantity: 2,
          },
          {
            id: "prod3",
            name: "Áo Hoodie Champion",
            image: "/assets/shirt/prod3.webp",
            price: 750000,
            quantity: 1,
          },
        ],
        shippingInfo: {
          firstName: "Nguyễn",
          lastName: "Văn A",
          address: "123 Đường ABC",
          city: "TP.HCM",
          district: "Quận 1",
          ward: "Phường Bến Nghé",
          phone: "0123456789",
        },
        note: "Giao hàng giờ hành chính",
      },
      {
        id: "DH20241202001",
        date: "02/12/2024 15:45:00",
        status: "Đang giao",
        total: 850000,
        shippingFee: 15000,
        paymentMethod: "Thanh toán khi nhận hàng",
        trackingCode: "VN87654321",
        timeline: [
          { status: "Đặt hàng", time: "02/12/2024 15:45:00" },
          { status: "Đang xử lý", time: "02/12/2024 16:00:00" },
          { status: "Đang giao", time: "03/12/2024 08:00:00" },
        ],
        items: [
          {
            id: "prod2",
            name: "Áo Khoác Bomber Nike",
            image: "/assets/shirt/prod2.webp",
            price: 850000,
            quantity: 1,
          },
        ],
        shippingInfo: {
          firstName: "Trần",
          lastName: "Thị B",
          address: "456 Đường XYZ",
          city: "TP.HCM",
          district: "Quận 3",
          ward: "Phường Võ Thị Sáu",
          phone: "0987654321",
        },
        note: "",
      },
    ];

    localStorage.setItem("orders", JSON.stringify(sampleOrders));
    console.log("✅ Đã tạo đơn hàng mẫu!");
  }
};

// Hàm để reset dữ liệu về trạng thái ban đầu
export const resetData = () => {
  localStorage.removeItem("users");
  localStorage.removeItem("orders");
  localStorage.removeItem("adminSettings");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("wishlistItems");
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("currentUser");
  console.log("🔄 Đã reset tất cả dữ liệu!");
};

// Hàm để xem thông tin tài khoản admin
export const getAdminInfo = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const admin = users.find((user) => user.role === "admin");

  if (admin) {
    console.log("👤 Thông tin tài khoản Admin:");
    console.log(`📧 Email: ${admin.email}`);
    console.log(`📱 SĐT: ${admin.phone}`);
    console.log(`👤 Tên: ${admin.name}`);
    console.log(`🔑 Mật khẩu: admin123`);
  } else {
    console.log("❌ Chưa có tài khoản admin!");
  }

  return admin;
};
