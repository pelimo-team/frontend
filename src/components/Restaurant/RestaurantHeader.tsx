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
        <img src="images/back.png" alt="برگشت" />
      </div>
      <img src="images/Logo.png" alt="لوگو" className="restaurant-logocenter" />
      <div className="restaurant-userinfo d-flex flex-column align-items-center">
        <button className="cart-icon-restaurant" onClick={() => navigate("/cart")}>
          <img src="images/basket.png" alt="سبد خرید" />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>
        <img
          src={restaurantLogo || "images/profile.png"}
          alt="پروفایل"
          className="restaurant-useravatar"
        />
        <span className="restaurant-username">{restaurantName}</span>
      </div>
    </header>
  );
};

export default RestaurantHeader; 