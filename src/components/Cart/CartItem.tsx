import React from 'react';
import { useNavigate } from 'react-router-dom'; // ← اضافه کن
import { CartItem as CartItemType } from './types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate(); // ← هوک ناوبری

  const handleClick = () => {
    navigate(`/foodpage/${item.menu_item.id}`, {
      state: { item }, // اختیاری
    });
    
  };

  return (
    <div
      className="cart-item"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={item.menu_item.image || "/food-placeholder.png"}
        alt={item.menu_item.name}
        className="cart-food-img"
      />
      <div className="cart-item-content">
        <div>
          <h3 className="cart-food-name">
            {item.menu_item?.name || "Undifiend"}
          </h3>
          <p className="cart-food-price">
            {item.menu_item?.onsale ? (
              <>
                <span className="original-price">
                  {(Number(item.menu_item?.price) || 0).toLocaleString()} Toman
                </span>
                <span className="sale-price">
                  {(Number(item.menu_item?.sale_price) || 0).toLocaleString()} Toman
                </span>
              </>
            ) : (
              <span>
                {(Number(item.menu_item?.price) || 0).toLocaleString()} Toman
              </span>
            )}
          </p>
        </div>

        <div
          className="item-actions"
          onClick={(e) => e.stopPropagation()} // ← جلوگیری از ناوبری ناخواسته
        >
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
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
