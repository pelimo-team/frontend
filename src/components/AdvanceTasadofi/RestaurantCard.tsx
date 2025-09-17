import React from "react";

interface Restaurant {
  name: string;
  cover_image?: string;
  city?: {
    name: string;
  };
  average_rating?: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant | null;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  if (!restaurant) return null;

  console.log("Restaurant data:", restaurant); // Debug log

  return (
    <div className="tasadofi-card">
      <img
        src={restaurant.cover_image || "/restaurant-placeholder.png"}
        alt={restaurant.name}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/restaurant-placeholder.png";
        }}
      />
      <div className="tasadofi-name">{restaurant.name}</div>
      <div className="tasadofi-location">
        📍 {restaurant.city?.name || "Unknown Location"}
      </div>
      <div className="tasadofi-stars">
        {"⭐".repeat(Math.round(restaurant.average_rating || 0))}
      </div>
    </div>
  );
};

export default RestaurantCard; 