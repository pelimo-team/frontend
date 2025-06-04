import React from 'react';
import { AlignRight, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <header className={`restaurant-header sticky-top ${isCompact ? 'compact' : ''}`}>
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          <div className="col-2 d-flex align-items-center">
            <button
              className="btn-icon"
              aria-label="Go to Home"
              onClick={() => navigate('/')}
            >
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
            <button
              className="btn-icon position-relative"
              aria-label="Go to Cart"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart
                size={24}
                color="white"
                className={showCartAnimation ? 'cart-shake' : ''}
              />
              {cartItemCount > 0 && (
                <span className={`cart-badge ${showCartAnimation ? 'cart-badge-pop' : ''}`}>
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
