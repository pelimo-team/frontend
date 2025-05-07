import React from 'react';
import { CartItem as CartItemType } from './types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="cart-item">
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
                  {(Number(item.menu_item?.price) || 0).toLocaleString()} تومان
                </span>
                <span className="sale-price">
                  {(Number(item.menu_item?.sale_price) || 0).toLocaleString()} تومان
                </span>
              </>
            ) : (
              <span>
                {(Number(item.menu_item?.price) || 0).toLocaleString()} تومان
              </span>
            )}
          </p>
        </div>
        <div className="item-actions">
          <button
            className="quantity-button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            className="quantity-button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
          <button
            className="custom-delete-btn ms-3"
            onClick={() => onRemoveItem(item.id)}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 