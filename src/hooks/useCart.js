import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";

const useCart = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { currentUser } = useAuth();

  const updateCartCount = useCallback(() => {
    if (currentUser) {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItemCount(cartItems.length);
      } catch (error) {
        console.error("Lỗi khi đọc giỏ hàng:", error);
        setCartItemCount(0);
      }
    } else {
      setCartItemCount(0);
    }
  }, [currentUser]);

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartChanged", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartChanged", updateCartCount);
    };
  }, [updateCartCount]);

  return cartItemCount;
};

export default useCart;
