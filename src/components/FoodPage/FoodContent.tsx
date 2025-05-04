import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuItem } from '../../types/types';

import FoodHeader from './FoodHeader';
import FoodBanner from './FoodBanner';
import FoodDetails from './FoodDetails';
import RestaurantInfoSection from './RestaurantInfoSection';
import ReviewsSection from './ReviewsSection';

interface FoodContentProps {
  menuItem: MenuItem;
}

const FoodContent: React.FC<FoodContentProps> = ({ menuItem }) => {
  const navigate = useNavigate();
  const { restaurant } = menuItem;

  return (
    <div className="food-page">
      <FoodHeader
        restaurantName={restaurant.name}
        restaurantLogo={restaurant.logo || ""}
        onBack={() => navigate(-1)}
      />

      <div className="food-content">
        <FoodBanner name={menuItem.name} image={menuItem.image} />

        <FoodDetails
          name={menuItem.name}
          description={menuItem.description}
          price={menuItem.price}
          sale_price={menuItem.sale_price}
          onsale={menuItem.onsale}
        />

        <RestaurantInfoSection
          name={restaurant.name}
          rating={restaurant.rating}
          city={restaurant.city}
        />

        {restaurant.reviews && restaurant.reviews.length > 0 && (
          <ReviewsSection name={restaurant.name} reviews={restaurant.reviews} />
        )}
      </div>
    </div>
  );
};

export default FoodContent; 