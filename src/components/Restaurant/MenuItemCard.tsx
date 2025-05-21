import React from 'react';
import { Heart } from 'lucide-react';
import { MenuItem } from './types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (itemId: string) => void;
  isVisible: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, isVisible }) => {
  return (
    <div 
      id={item.id}
      className={`menu-item-card h-100 ${isVisible ? 'visible' : ''}`}
    >
      <div className="menu-item-image">
        <img
          src={item.image}
          alt={item.name}
          className="img-fluid"
        />
        <button className="favorite-btn">
          <Heart size={20} />
        </button>
      </div>
      <div className="menu-item-content p-3">
        <h3 className="menu-item-title">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="menu-item-price">
            {item.price.toLocaleString()} تومان
          </span>
          <button
            className="btn btn-add-to-cart pulse-on-hover"
            onClick={() => onAddToCart(item.id)}
            aria-label={`افزودن ${item.name} به سبد خرید`}
          >
            افزودن به سبد
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard; 