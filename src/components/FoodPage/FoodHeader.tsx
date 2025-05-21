import React from "react";

interface FoodHeaderProps {
  restaurantName: string;
  restaurantLogo?: string;
  onBack: () => void;
}

const FoodHeader: React.FC<FoodHeaderProps> = ({ restaurantName, restaurantLogo, onBack }) => {
  return (
    <header className="food-header">
      <button className="back-button" onClick={onBack}>
        <img src="/back.png" alt="بازگشت" />
      </button>
      <img src="/Logo.png" alt="لوگو" className="food-logocenter" />
      <div className="food-userinfo">
        <img
          src={restaurantLogo || "/restaurant-placeholder.png"}
          alt={restaurantName}
          className="food-useravatar"
        />
        <span className="food-username">{restaurantName}</span>
      </div>
    </header>
  );
};

export default FoodHeader;
