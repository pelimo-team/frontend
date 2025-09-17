import React from "react";

interface FoodBannerProps {
  image?: string | null;
  name: string;
}

const FoodBanner: React.FC<FoodBannerProps> = ({ image, name }) => {
  return (
    <div className="food-banner">
      <img
        src={image || "/food-placeholder.png"}
        alt={name}
        className="food-image"
      />
    </div>
  );
};

export default FoodBanner;
