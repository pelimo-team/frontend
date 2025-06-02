import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Restaurant } from './types';
import '../../styles/MainAdmin.css'

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onEdit, onDelete }) => {
  return (
    <div className="restaurant-card">
      <div className="restaurant-card-cover\" style={{ backgroundImage: `url(${restaurant.coverImage})` }}>
        <div className="restaurant-card-logo">
          <img src={restaurant.logo} alt={`${restaurant.name} logo`} />
        </div>
      </div>
      
      <div className="restaurant-card-content">
        <div className="restaurant-card-header">
          <h3 className="restaurant-card-title">{restaurant.name}</h3>
          <div className="restaurant-card-badge-container">
            {restaurant.isNightWalker && (
              <span className="restaurant-card-badge restaurant-card-badge-night">
                Night Walker
              </span>
            )}
            <span className="restaurant-card-badge">
              {restaurant.restaurantType}
            </span>
          </div>
        </div>
        
        <div className="restaurant-card-details">
          <div className="restaurant-card-detail">
            <span className="restaurant-card-detail-label">City:</span>
            <span className="restaurant-card-detail-value">{restaurant.city}</span>
          </div>
          
          <div className="restaurant-card-detail">
            <span className="restaurant-card-detail-label">Delivery Cost:</span>
            <span className="restaurant-card-detail-value">${restaurant.deliveryCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="restaurant-card-actions">
        <button 
          className="restaurant-card-action restaurant-card-action-edit"
          onClick={() => onEdit(restaurant.id)}
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
        
        <button 
          className="restaurant-card-action restaurant-card-action-delete"
          onClick={() => onDelete(restaurant.id)}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;