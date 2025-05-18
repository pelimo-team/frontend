import React from 'react';
import {Food} from "./Type";
import StarRating from './StarRating';
import AddToBasket from './AddToBasket';
import ReviewSection from './ReviewSection';
import '../../styles/FoodPage.css';

interface FoodDetailProps {
  food: Food;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ food }) => {
  const handleAddToBasket = (quantity: number) => {
    console.log(`Added ${quantity} ${food.name} to basket`);
    // In a real app, this would dispatch to a cart/store
  };

  return (
    <div className="food-detail-container">
      <div className="food-detail">
        <div className="food-image-container">
          <img src={food.imageUrl} alt={food.name} className="food-image" />
        </div>
        
        <div className="food-info">
          <h1 className="food-name">{food.name}</h1>
          
          <div className="food-rating">
            <StarRating rating={food.rating} />
            <span className="rating-value">({food.rating})</span>
          </div>
          
          <p className="food-description">{food.description}</p>
          
          <AddToBasket 
            price={food.price} 
            onAddToBasket={handleAddToBasket} 
          />
        </div>
      </div>
      
      <ReviewSection reviews={food.reviews} />
    </div>
  );
};

export default FoodDetail;