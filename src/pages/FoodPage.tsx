
import FoodDetail from "../components/FoodPage/FoodDetail";
import { foodItem } from "../components/FoodPage/data";
import "../styles/FoodPage.css";
import { useNavigate } from "react-router-dom";


function FoodPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button className="food-basket-btn" onClick={() => navigate("/cart")}>
            <img src="./cart-shopping-solid.svg" alt="" />
          </button>
          <img className="logo" src="./Logo.png" alt="" />
          <button
            className="food-back-btn"
            onClick={() => navigate(`/foodpage/`)}
          >
            <img src="./arrow-right-solid.svg" alt="" />
          </button>
        </div>
      </header>

      <main className="main-content">
        <FoodDetail food={foodItem} />
      </main>

 
    </div>
  );
}

export default FoodPage;
