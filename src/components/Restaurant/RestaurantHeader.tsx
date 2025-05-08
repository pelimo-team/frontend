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
        <img src="public/back.png" alt="برگشت" />
      </div>
      <img src="Logo.png" alt="logo" className="restaurant-logocenter" />
      <div className="restaurant-name-avatar">
      <img src="public/Logo_white.png" alt="لوگو" className="restaurant-logocenter" />
      </div>
      <div className="restaurant-userinfo d-flex flex-column align-items-center">
        <button className="cart-icon-restaurant" onClick={() => navigate("/cart")}>
          <img src="public/basket.png" alt="سبد خرید" />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>
        <img
          src={restaurantLogo || "public/profile.png"}
          alt="پروفایل"
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