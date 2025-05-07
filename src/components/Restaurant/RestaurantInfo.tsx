interface RestaurantInfoProps {
  name: string;
  location: string;
  rating: number;
}

const RestaurantInfo = ({ name, location, rating }: RestaurantInfoProps) => {
  return (
    <div className="restaurant-infosection px-5 py-4">
      <div className="restaurant-infotext">
        <div className="fs-5 fw-bold">Restaurant name: {name}</div>
        <div className="fs-6 mt-2">Location: {location}</div>
      </div>
      <div className="restaurant-rating">
        <span>{"⭐".repeat(Math.round(rating || 0))}</span>
        <span className="ms-2">{rating ? rating.toFixed(1) : "N/A"}/5</span>
      </div>
    </div>
  );
};

export default RestaurantInfo; 