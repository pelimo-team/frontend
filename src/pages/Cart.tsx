import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { api } from "../utils/api";
import "../styles/Cart.css";

import CartHeader from "../components/Cart/CartHeader";
import CartRestaurantInfo from "../components/Cart/CartRestaurantInfo";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import CartEmpty from "../components/Cart/CartEmpty";
import CartError from "../components/Cart/CartError";
import CartLoading from "../components/Cart/CartLoading";
import { Cart as CartType } from "../components/Cart/types";

const Cart: React.FC = () => {
  const [carts, setCarts] = useState<CartType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = (await api.get("/api/cart/")) as CartType[];
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

  if (loading) {
    return <CartLoading />;
  }

  if (error) {
    return <CartError error={error} onRetry={fetchCarts} />;
  }

  if (carts.length === 0) {
    return <CartEmpty />;
  }

  return (
    <Container className="cart-container mt-4">
      <CartHeader />

      {carts.map((cart) => (
        <div key={cart.id} className="cart-box">
          <CartRestaurantInfo
            restaurant={cart.restaurant}
            createdAt={cart.created_at}
          />

          <div className="cart-items">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            ))}
          </div>

          <CartSummary
            items={cart.items}
            deliveryCost={cart.restaurant.delivery_cost}
          />
        </div>
      ))}
    </Container>
  );
};

export default Cart;
