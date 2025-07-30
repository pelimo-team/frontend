
import "../../styles/AddComment.css";

interface RestaurantHeaderProps {
  onBack: () => void;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ onBack }) => {
  return (
    <header className="restaurant-header">
      <div className="restaurant-menuicon" onClick={onBack}>
        <img src="/back.png" alt="back"/>
      </div>
      <img src="/Logo.png" alt="logo" className="restaurant-logocenter" />
    </header>
  );  
};

export default RestaurantHeader;
