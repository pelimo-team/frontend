import React from 'react';
import { Restaurant } from './types';

interface CartRestaurantInfoProps {
  restaurant: Restaurant;
  createdAt: string;
}

const CartRestaurantInfo: React.FC<CartRestaurantInfoProps> = ({ restaurant, createdAt }) => {
  return (
    <div className="restaurant-header">
      <div className="d-flex align-items-center gap-3">
        <div className="logo-circle">
          <img
            src={restaurant.logo || "/restaurant-placeholder.png"}
            alt={restaurant.name}
          />
        </div>
        <div>
          <h2 className="cart-title">{restaurant.name}</h2>
          <div className="cart-date">
            {new Date(createdAt).toLocaleDateString("fa-IR")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRestaurantInfo; 