import "../AddComment.css";

interface RestaurantInfoProps {
  restaurantName: string;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurantName }) => {
  return (
    <div className="restaurant-info">
      <h2>{restaurantName}</h2>
    </div>
  );
};

export default RestaurantInfo;
