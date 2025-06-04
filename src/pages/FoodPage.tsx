import FoodDetail from "../components/FoodPage/FoodDetail";
import "../styles/FoodPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuItem } from "../components/AdvancedSearch/types";
import { api } from "../utils/api";
import AddToBasket from "../components/FoodPage/AddToBasket";

function FoodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item as MenuItem;

  if (!item) {
    return <div>هیچ آیتمی برای نمایش یافت نشد.</div>;
  }

  const handleAddToBasket = async (quantity: number) => {
    try {
      await api.post("/api/cart/add/", {
        menu_item_id: item.id,
        quantity,
      });
      alert("آیتم با موفقیت به سبد خرید اضافه شد");
      // navigate("/cart"); // اگر بخوای کاربر رو به سبد بفرستی
    } catch (err: any) {
      console.error("خطا در افزودن آیتم:", err.message);
      alert("افزودن به سبد خرید ناموفق بود");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button className="food-basket-btn" onClick={() => navigate("/cart")}>
            <img src="./cart-shopping-solid.svg" alt="" />
          </button>
          <img className="logo" src="./Logo.png" alt="" />
          <button className="food-back-btn" onClick={() => navigate(-1)}>
            <img src="./arrow-right-solid.svg" alt="" />
          </button>
        </div>
      </header>

      <main className="main-content">
        <FoodDetail food={item} onAddToBasket={handleAddToBasket} />
      </main>
    </div>
  );
}

export default FoodPage;
