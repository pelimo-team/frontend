import React from "react";
import { MenuItem } from "../../components/AdvancedSearch/types";
import StarRating from "./StarRating";
import AddToBasket from "./AddToBasket";
import ReviewSection from "./ReviewSection";
import "../../styles/FoodPage.css";

interface FoodDetailProps {
  food: MenuItem & {
    rate?: number;
    description?: string;
    restaurant?: { name: string };
    reviews?: any[];
  };
  onAddToBasket: (quantity: number) => void;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ food, onAddToBasket }) => {
  return (
    <div className="food-detail-container">
      <div className="food-detail">
        <div className="food-image-container">
          <img
            src={food.image || "/food-placeholder.png"}
            alt={food.name}
            className="food-image"
          />
        </div>

        <div className="food-info">
          <h1 className="food-name">{food.name}</h1>
          <h2 className="restaurant-name">{food.restaurant?.name}</h2>

          <div className="food-rating">
            <StarRating rating={food.rate || 0} />
            <span className="rating-value">({food.rate || 0})</span>
          </div>

          <p className="food-description">{food.description || " No description"}</p>

          <AddToBasket price={food.price} onAddToBasket={onAddToBasket} />
        </div>
      </div>

      <ReviewSection reviews={food.reviews || []} />
    </div>
  );
};

export default FoodDetail;
