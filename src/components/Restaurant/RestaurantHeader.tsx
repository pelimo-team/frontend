import { useNavigate } from "react-router-dom";

interface RestaurantHeaderProps {
  restaurantName: string;
  restaurantLogo?: string;
  cartItemCount: number;
}

const RestaurantHeader = ({ restaurantName, restaurantLogo, cartItemCount }: RestaurantHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="restaurant-header">
      <div className="restaurant-menuicon" onClick={() => navigate(-1)}>
        <img src="cart-shopping-solid.svg" alt="Basket" />
      </div>
      <img src="Logo.png" alt="logo" className="restaurant-logocenter" />
      <div className="restaurant-name-avatar">
        <img
          src={restaurantLogo || "images/profile.png"}
          alt="Profile"
          className="restaurant-useravatar"
        />
        <span className="restaurant-username">{restaurantName}</span>
      </div>
      <div className="restaurant-userinfo d-flex flex-column align-items-center">
        <button className="cart-icon-restaurant" onClick={() => navigate("/cart")}>
          <img src="arrow-right-solid.svg" alt="Back" />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>
      </div>
      
    </header>
  );
};

export default RestaurantHeader; 