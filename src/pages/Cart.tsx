import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { api } from "../utils/api";
import "../Cart.css";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  sale_price?: number;
  onsale?: boolean;
  image?: string;
}

interface CartItem {
  id: number;
  quantity: number;
  menu_item: MenuItem;
}

interface Restaurant {
  id: number;
  name: string;
  logo?: string;
  delivery_cost: number;
}

interface Cart {
  id: number;
  created_at: string;
  items: CartItem[];
  restaurant: Restaurant;
}

const Cart: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = (await api.get("/api/cart/")) as Cart[];
      setCarts(Array.isArray(response) ? response : [response]);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching carts:", err);
      setError(err.message);
      if (err.message === "Authentication required") {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      await api.patch(`/api/cart/item/${itemId}/`, {
        quantity: newQuantity,
      });
      await fetchCarts();
    } catch (err: any) {
      console.error("Error updating quantity:", err);
      setError(err.message);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await api.delete(`/api/cart/item/${itemId}/delete/`);
      await fetchCarts();
    } catch (err: any) {
      console.error("Error removing item:", err);
      setError(err.message);
    }
  };

  const calculateTotal = (items: CartItem[]) => {
    if (!Array.isArray(items)) return 0;

    return items.reduce((total, item) => {
      const basePrice = Number(item?.menu_item?.price) || 0;
      const salePrice = Number(item?.menu_item?.sale_price) || basePrice;
      const price = item?.menu_item?.onsale ? salePrice : basePrice;
      const quantity = Number(item?.quantity) || 0;

      const itemTotal = price * quantity;
      return total + (Number.isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  };

  if (loading) {
    return (
      <Container className="cart-container">
        <div className="cart-loading">در حال بارگذاری سبد خرید...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="cart-container">
        <div className="cart-error">
          {error}
          <button className="custom-continue-btn" onClick={fetchCarts}>
            تلاش مجدد
          </button>
        </div>
      </Container>
    );
  }

  if (carts.length === 0) {
    return (
      <Container className="cart-container">
        <div className="cart-box text-center">
          <h2>سبد خرید شما خالی است</h2>
          <button
            className="custom-continue-btn mt-3"
            onClick={() => navigate("/")}
          >
            مشاهده رستوران‌ها
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="cart-container mt-4">
      <header className="d-flex align-items-center justify-content-between mb-4">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src="/back.png" alt="بازگشت" />
        </button>
        <h1 className="cart-title mb-0">سبد خرید</h1>
        <div style={{ width: "40px" }}></div>
      </header>

      {carts.map((cart) => (
        <div key={cart.id} className="cart-box">
          <div className="restaurant-header">
            <div className="d-flex align-items-center gap-3">
              <div className="logo-circle">
                <img
                  src={cart.restaurant.logo || "/restaurant-placeholder.png"}
                  alt={cart.restaurant.name}
                />
              </div>
              <div>
                <h2 className="cart-title">{cart.restaurant.name}</h2>
                <div className="cart-date">
                  {new Date(cart.created_at).toLocaleDateString("fa-IR")}
                </div>
              </div>
            </div>
          </div>

          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.menu_item.image || "/food-placeholder.png"}
                  alt={item.menu_item.name}
                  className="cart-food-img"
                />
                <div className="cart-item-content">
                  <div>
                    <h3 className="cart-food-name">
                      {item.menu_item?.name || "نامشخص"}
                    </h3>
                    <p className="cart-food-price">
                      {item.menu_item?.onsale ? (
                        <>
                          <span className="original-price">
                            {(
                              Number(item.menu_item?.price) || 0
                            ).toLocaleString()}{" "}
                            تومان
                          </span>
                          <span className="sale-price">
                            {(
                              Number(item.menu_item?.sale_price) || 0
                            ).toLocaleString()}{" "}
                            تومان
                          </span>
                        </>
                      ) : (
                        <span>
                          {(
                            Number(item.menu_item?.price) || 0
                          ).toLocaleString()}{" "}
                          تومان
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="custom-delete-btn ms-3"
                      onClick={() => removeItem(item.id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(() => {
            const itemsTotal = calculateTotal(cart.items);
            const deliveryCost = Number(cart.restaurant?.delivery_cost) || 0;
            const overallTotal = itemsTotal + deliveryCost;

            return (
              <div className="cart-summary mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>جمع سفارش:</span>
                  <span className="cart-food-price">
                    {itemsTotal.toLocaleString()} تومان
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>هزینه ارسال:</span>
                  <span className="cart-food-price">
                    {deliveryCost.toLocaleString()} تومان
                  </span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                  <span>مجموع:</span>
                  <span className="cart-food-price">
                    {overallTotal.toLocaleString()} تومان
                  </span>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button className="custom-continue-btn">تکمیل خرید</button>
                </div>
              </div>
            );
          })()}
        </div>
      ))}
    </Container>
  );
};

export default Cart;
