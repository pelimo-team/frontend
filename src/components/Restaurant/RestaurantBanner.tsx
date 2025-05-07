interface RestaurantBannerProps {
  image?: string;
  name: string;
}

const RestaurantBanner = ({ image, name }: RestaurantBannerProps) => {
  return (
    <div className="restaurant-banner">
      {image && (
        <img src={image} alt={name} className="restaurant-image" />
      )}
    </div>
  );
};

export default RestaurantBanner; 