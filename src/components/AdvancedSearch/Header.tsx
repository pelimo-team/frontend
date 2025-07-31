import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api"; // آدرس درست api را اصلاح کن

interface HeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchMode: "restaurants" | "items";
  setSearchMode: (mode: "restaurants" | "items") => void;
}

const Header: React.FC<HeaderProps> = ({
  searchText,
  setSearchText,
  searchMode,
  setSearchMode,
}) => {
  const navigate = useNavigate();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await api.get("/api/cart/");
        let count = 0;
        if (Array.isArray(response)) {
          count = response.reduce(
            (acc, cart) => acc + (cart.items?.length || 0),
            0
          );
        } else if (response?.items) {
          count = response.items.length;
        }
        setCartItemsCount(count);
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };

    fetchCartCount();

    // اگر بخواهی هر چند ثانیه آپدیت شود:
    const intervalId = setInterval(fetchCartCount, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="header-advanced-search">
      <div className="header-top-advanced-search">
        <button
          className="cart-icon-advanced-search"
          onClick={() => navigate("/cart")}
        >
          <img src="cart-shopping-solid.svg" alt="Cart" />
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
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
          <img src="arrow-right-solid.svg" alt="Back" />
        </button>
      </div>

      <div className="search-section-advanced-search">
        <div className="search-bar-advanced-search">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <button
            className="close-btn-advanced-search"
            onClick={() => {
              setSearchText("");
              localStorage.removeItem("searchText");
            }}
          >
            ✕
          </button>
        </div>
        <div className="search-toggle-advanced-search">
          <button
            className={`toggle-btn ${
              searchMode === "restaurants" ? "active" : ""
            }`}
            onClick={() => setSearchMode("restaurants")}
          >
            Restaurants
          </button>
          <button
            className={`toggle-btn ${searchMode === "items" ? "active" : ""}`}
            onClick={() => setSearchMode("items")}
          >
            Food Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
