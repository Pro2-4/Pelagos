import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";

const useFavorites = () => {
  const [favoriteItemCount, setFavoriteItemCount] = useState(0);
  const { currentUser } = useAuth();

  const updateFavoriteCount = useCallback(() => {
    if (currentUser) {
      try {
        const favoriteItems = JSON.parse(
          localStorage.getItem("wishlistItems") || "[]"
        );
        setFavoriteItemCount(favoriteItems.length);
      } catch (error) {
        console.error("Lỗi khi đọc danh sách yêu thích:", error);
        setFavoriteItemCount(0);
      }
    } else {
      setFavoriteItemCount(0);
    }
  }, [currentUser]);

  useEffect(() => {
    updateFavoriteCount();

    window.addEventListener("storage", updateFavoriteCount);
    window.addEventListener("favoritesChanged", updateFavoriteCount);

    return () => {
      window.removeEventListener("storage", updateFavoriteCount);
      window.removeEventListener("favoritesChanged", updateFavoriteCount);
    };
  }, [updateFavoriteCount]);

  return favoriteItemCount;
};

export default useFavorites;
