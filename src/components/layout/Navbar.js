import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import "../../styles/components/Navbar.css";

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <TopBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <BottomNav />
    </>
  );
};

export default React.memo(NavigationBar);
