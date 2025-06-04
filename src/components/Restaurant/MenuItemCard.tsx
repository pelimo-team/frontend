import React from 'react';
import { Heart } from 'lucide-react';
import { MenuItem } from './types';
import { useNavigate } from 'react-router-dom';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (itemId: string) => void;
  isVisible: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, isVisible }) => {
  const navigate = useNavigate();
  return (
<<<<<<< Updated upstream
    <button 
      id={item.id}
      className={`menu-item-card h-100 ${isVisible ? 'visible' : ''}`}
      onClick={() => navigate("/foodpage")}
    >
=======
    <div className={`menu-item-card h-100 ${isVisible ? 'visible' : ''}`}>
>>>>>>> Stashed changes
      <div className="menu-item-image">
        <img
          src={item.image}
          alt={item.name}
          className="img-fluid"
        />
        <button className="favorite-btn" aria-label="Add to favorites">
          <Heart size={20} />
        </button>
      </div>
      <div className="menu-item-content p-3">
        <h3 className="menu-item-title">{item.name}</h3>
        <p className="menu-item-description">
          {item.description || 'No description available.'}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="menu-item-price">
            {item.price.toLocaleString()} Toman
          </span>
          <button
            className="btn btn-add-to-cart pulse-on-hover"
            onClick={() => onAddToCart(item.id)}
            aria-label={`Add ${item.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </button>
  );
};

export default MenuItemCard;
