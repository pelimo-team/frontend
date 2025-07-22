import React from 'react';
import { CartItem } from './types';

interface CartSummaryProps {
  items: CartItem[];
  deliveryCost: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, deliveryCost }) => {
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

  const itemsTotal = calculateTotal(items);
  const overallTotal = itemsTotal +  (Number(deliveryCost) || 0);

  return (
    <div className="cart-summary mt-4">
      <div className="d-flex justify-content-between mb-2">
        <span>Order Cost:</span>
        <span className="cart-food-price">
        {(itemsTotal || 0).toLocaleString()} Toman        
        </span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span>Delivery Cost:</span>
        <span className="cart-food-price">
          { (Number(deliveryCost) || 0).toLocaleString()} Toman
        </span>
      </div>
      <div className="d-flex justify-content-between fw-bold">
        <span>Total Cost:</span>
        <span className="cart-food-price">
          {(overallTotal || 0).toLocaleString()} Toman
        </span>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="custom-continue-btn">Payment</button>
      </div>
    </div>
  );
};

export default CartSummary; 