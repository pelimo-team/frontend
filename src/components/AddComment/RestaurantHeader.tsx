
import "../AddComment.css";

interface RestaurantHeaderProps {
  onBack: () => void;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ onBack }) => {
  return (
    <header className="restaurant-header">
      <div className="restaurant-menuicon" onClick={onBack}>
        <img src="/back.png" alt="برگشت" />
      </div>
      <img src="/Logo.png" alt="لوگو" className="restaurant-logocenter" />
    </header>
  );
};

export default RestaurantHeader;
