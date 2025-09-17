import React from "react";

interface RestaurantInfoProps {
  name: string;
  rating?: number;
  city?: string;
}

const RestaurantInfoSection: React.FC<RestaurantInfoProps> = ({ name, rating, city }) => {
  return (
    <div className="restaurant-section">
      <div className="restaurant-header">
        <h2>درباره {name}</h2>
        <div className="restaurant-rating">
          <span className="stars">
            {"⭐".repeat(Math.round(rating || 0))}
          </span>
          <span className="rating-text">
            {rating ? rating.toFixed(1) : "N/A"}/5
          </span>
        </div>
      </div>

      <p className="restaurant-location">
        <span className="location-icon">📍</span>
        {city || "آدرس نامشخص"}
      </p>
    </div>
  );
};

export default RestaurantInfoSection;
