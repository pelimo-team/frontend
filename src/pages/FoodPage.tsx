import FoodDetail from "../components/FoodPage/FoodDetail";
import { foodItem } from "../components/FoodPage/data";
import "../styles/FoodPage.css";

function FoodPage() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">GourmetEats</h1>
        </div>
      </header>

      <main className="main-content">
        <FoodDetail food={foodItem} />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 GourmetEats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default FoodPage;
