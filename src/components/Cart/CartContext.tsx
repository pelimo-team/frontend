// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartRestaurantId: number | null;
  setCartRestaurantId: (id: number | null) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartRestaurantId, setCartRestaurantId] = useState<number | null>(null);

  const clearCart = () => {
    setCartRestaurantId(null);
  };

  return (
    <CartContext.Provider value={{ cartRestaurantId, setCartRestaurantId, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext must be used within a CartProvider');
  return context;
};
