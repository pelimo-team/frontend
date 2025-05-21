import React from 'react';
import { AlignRight, ShoppingCart } from 'lucide-react';

interface RestaurantHeaderProps {
  logo: string;
  restaurantName: string;
  cartItemCount: number;
  showCartAnimation: boolean;
  isCompact: boolean;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  logo,
  restaurantName,
  cartItemCount,
  showCartAnimation,
  isCompact,
}) => {
  return (
    <header className={`restaurant-header sticky-top ${isCompact ? 'compact' : ''}`}>
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          <div className="col-2 d-flex align-items-center">
            <button className="btn-icon" aria-label="منو">
              <AlignRight size={24} color="white" />
            </button>
          </div>
          <div className="col-8 text-center">
            <img
              src={logo}
              alt={restaurantName}
              className="restaurant-logo img-fluid"
            />
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button className="btn-icon position-relative" aria-label="سبد خرید">
              <ShoppingCart 
                size={24} 
                color="white" 
                className={showCartAnimation ? "cart-shake" : ""}
              />
              {cartItemCount > 0 && (
                <span className={`cart-badge ${showCartAnimation ? "cart-badge-pop" : ""}`}>
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader; 