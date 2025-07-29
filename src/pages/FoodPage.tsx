import { useState, useEffect } from "react";
import FoodDetail from "../components/FoodPage/FoodDetail";
import "../styles/FoodPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuItem } from "../components/AdvancedSearch/types";
import { api } from "../utils/api";

function FoodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item as MenuItem;
  
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await api.get("/api/cart/");
        let count = 0;
        if (Array.isArray(response)) {
          count = response.reduce((acc, cart) => acc + (cart.items?.length || 0), 0);
        } else if (response?.items) {
          count = response.items.length;
        }
        setCartItemsCount(count);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
    fetchCart();
    const intervalId = setInterval(fetchCart, 2000); // هر ۵ ثانیه به‌روزرسانی

    return () => clearInterval(intervalId);
  }, []);

  if (!item) {
    return <div>no item found!</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button className="food-basket-btn" onClick={() => navigate("/cart")}>
            <img src="./cart-shopping-solid.svg" alt="Cart" />
            {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
          </button>
          <img className="logo" src="./Logo.png" alt="Logo" />
          <button className="food-back-btn" onClick={() => navigate(-1)}>
            <img src="./arrow-right-solid.svg" alt="Back" />
          </button>
        </div>
      </header>
      <main className="main-content">
        <FoodDetail />
      </main>
    </div>
  );
}

export default FoodPage;
