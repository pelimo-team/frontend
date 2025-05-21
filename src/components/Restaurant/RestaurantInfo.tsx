import React from 'react';
import { MapPin } from 'lucide-react';
import StarRating from './StarRating';

interface RestaurantInfoProps {
  name: string;
  location: string;
  rating: number;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ name, location, rating }) => {
  return (
    <section className="restaurant-info py-4 px-3 animated-section">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-8">
            <h1 className="restaurant-name mb-3">{name}</h1>
            <div className="d-flex align-items-center mb-2">
              <MapPin size={18} className="text-primary me-2" />
              <span className="location-text">{location}</span>
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <div className="rating-box d-inline-flex align-items-center">
              <StarRating rating={rating} />
              <span className="rating-value ms-2">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantInfo; 