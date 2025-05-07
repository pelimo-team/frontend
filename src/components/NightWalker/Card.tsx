import React from "react";
import { useNavigate } from "react-router-dom";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  delivery_cost: number;
  average_rating: number;
  cover_image?: string;
}

interface CardProps {
  restaurant: Restaurant;
}

const Card: React.FC<CardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="nightwalker-card" onClick={handleClick}>
      <div className="nightwalker-image">
        <img
          src={restaurant.cover_image || "/restaurant-placeholder.png"}
          alt={restaurant.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/restaurant-placeholder.png";
          }}
        />
      </div>
      <div className="nightwalker-info">
        <p>
          <strong>{restaurant.name}</strong>
        </p>
        <p>{restaurant.description}</p>
        <p>Delivery Cost: {restaurant.delivery_cost} تومان</p>
        <div className="nightwalker-stars">
          {"⭐".repeat(Math.round(restaurant.average_rating || 0))}
        </div>
      </div>
    </div>
  );
};

export default Card; 