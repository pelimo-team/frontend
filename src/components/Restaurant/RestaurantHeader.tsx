import { useNavigate } from "react-router-dom";
import "../../styles/RestaurantPage.css";

interface RestaurantHeaderProps {
  restaurantName: string;
  restaurantLogo?: string;
  cartItemCount: number;
}

const RestaurantHeader = ({
  restaurantName,
  restaurantLogo,
  cartItemCount,
}: RestaurantHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="restaurantpage-header">
      <div className="restaurantpage-name-avatar"></div>
      <div className="restaurantpage-userinfo d-flex flex-column align-items-center">
        <button
          className="cart-icon-restaurant"
          onClick={() => navigate("/cart")}
        >
          <img src="cart-shopping-solid.svg" alt="سبد خرید" />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
        <img
          src={restaurantLogo}
          alt="پروفایل"
          className="restaurantpage-useravatar"
        />
        <span className="restaurantpage-username">{restaurantName}</span>
      </div>
      <img src="Logo.png" alt="logo" className="restaurant-logocenter" />
      <div className="restaurantpage-userinfo d-flex flex-column align-items-center">
        <button
          className="cart-icon-restaurant"
          onClick={() => navigate("/cart")}
        >
          <img src="arrow-right-solid.svg" alt="Back" />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default RestaurantHeader;
