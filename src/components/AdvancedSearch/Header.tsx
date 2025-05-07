import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchMode: 'restaurants' | 'items';
  setSearchMode: (mode: 'restaurants' | 'items') => void;
}

const Header: React.FC<HeaderProps> = ({
  searchText,
  setSearchText,
  searchMode,
  setSearchMode,
}) => {
  const navigate = useNavigate();

  return (
    <header className="header-advanced-search">
      <div className="header-top-advanced-search">
        <button
          className="cart-icon-advanced-search"
          onClick={() => navigate("/cart")}
        >
          <img src="basket.png" alt="" />
        </button>
        <img
          src="/Logo.png"
          alt="PELIMO Logo"
          className="logo-advanced-search"
        />
        <button
          className="back-btn-advanced-search"
          onClick={() => navigate("/")}
        >
          <img src="back.png" alt="" />
        </button>
      </div>

      <div className="search-section-advanced-search">
        <div className="search-bar-advanced-search">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="جستجو..."
          />
          <button className="close-btn-advanced-search">✕</button>
        </div>
        <div className="search-toggle-advanced-search">
          <button
            className={`toggle-btn ${searchMode === "restaurants" ? "active" : ""}`}
            onClick={() => setSearchMode("restaurants")}
          >
            رستوران‌ها
          </button>
          <button
            className={`toggle-btn ${searchMode === "items" ? "active" : ""}`}
            onClick={() => setSearchMode("items")}
          >
            منو غذا
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 