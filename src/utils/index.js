// Utility functions
export const formatPrice = (price) => {
  const numericPrice =
    typeof price === "string"
      ? parseInt(price.replace(/[^\d]/g, "")) || 0
      : price;
  return numericPrice.toLocaleString("vi-VN") + "đ";
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString("vi-VN");
};

// Add more utility functions as needed
