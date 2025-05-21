import React from 'react';

interface RestaurantBannerProps {
  image: string;
  name: string;
}

const RestaurantBanner: React.FC<RestaurantBannerProps> = ({ image, name }) => {
  return (
    <section className="restaurant-banner">
      <div className="container-fluid p-0">
        <div className="position-relative">
          <img
            src={image}
            alt={name}
            className="banner-image img-fluid w-100"
          />
          <div className="banner-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantBanner; 