import { useState } from "react";
import OrderHistory from "../components/UserOrders/OrderHistory";
import OrderStatus from "../components/UserOrders/OrderStatus";
import "../styles/UserOrders.css";
import { useNavigate } from "react-router-dom";

function UserOrders() {
  const [currentPage, setCurrentPage] = useState<"history" | "status">(
    "history"
  );
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-bar">
          <button
            className="header-icon-button"
            onClick={() => navigate("/cart")}
          >
            <img
              src="/cart-shopping-solid.svg"
              alt="Cart"
              style={{ width: "10rem", height: "40px", display: "block" }}
            />
          </button>

          <img src="./Logo.png" alt="Logo" className="header-logo" />

          <button className="header-icon-button" onClick={() => navigate(-1)}>
          <img
              src="/arrow-right-solid.svg"
              alt="Back"
              style={{ width: "10rem", height: "40px", display: "block" }}
            />
          </button>
        </div>

        <nav className="navigation">
          <button
            className={`nav-button ${
              currentPage === "history" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("history")}
          >
            Order History
          </button>
          <button
            className={`nav-button ${currentPage === "status" ? "active" : ""}`}
            onClick={() => setCurrentPage("status")}
          >
            Order Status
          </button>
        </nav>
      </header>

      <main className="main-content">
        {currentPage === "history" ? <OrderHistory /> : <OrderStatus />}
      </main>
    </div>
  );
}

export default UserOrders;
