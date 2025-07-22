// src/hooks/useCart.ts
import { useCartContext } from "./CartContext";

export const useCart = () => {
  const { cartRestaurantId, setCartRestaurantId, clearCart } = useCartContext();

  return {
    cartRestaurantId,
    setCartRestaurantId,
    clearCart,
  };
};
