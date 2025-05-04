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
};

export default CartSummary; 