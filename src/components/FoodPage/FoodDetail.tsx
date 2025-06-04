import React from "react";
import { Food } from "./Type";
import StarRating from "./StarRating";
import AddToBasket from "./AddToBasket";
import ReviewSection from "./ReviewSection";
import "../../styles/FoodPage.css";
import { useLocation } from "react-router-dom";
import { MenuItem } from "../../components/AdvancedSearch/types";

interface FoodDetailProps {
  food: Food;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ food }) => {
  const handleAddToBasket = (quantity: number) => {
    console.log(`Added ${quantity} ${item.name} to basket`);
    // In a real app, this would dispatch to a cart/store
  };
  const location = useLocation();
  const item = location.state?.item as MenuItem;
  if (!item) {
    return <div>هیچ آیتمی برای نمایش یافت نشد.</div>;
  }

  console.log(item);

  return (
    <div className="food-detail-container">
      <div className="food-detail">
        <div className="food-image-container">
          <img
            src={item.image || undefined}
            alt={item.name}
            className="food-image"
          />
        </div>

        <div className="food-info">
          <h1 className="food-name">{item.name}</h1>
          <h2 className="restaurant-name">{item.restaurant?.name}</h2>

          <div className="food-rating">
            <StarRating rating={item.rate} />
            <span className="rating-value">({item.rate})</span>
          </div>

          <p className="food-description">{item.description}</p>

          <AddToBasket price={item.price} onAddToBasket={handleAddToBasket} />
        </div>
      </div>

      <ReviewSection reviews={food.reviews} />
    </div>
  );
};

export default FoodDetail;
