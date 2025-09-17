import React from "react";

interface RestaurantType {
  id: number;
  name: string;
  icon?: string;
}

interface CategoryBarProps {
  restaurantTypes: RestaurantType[];
  selectedType: string;
  onTypeClick: (type: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({
  restaurantTypes,
  selectedType,
  onTypeClick,
}) => {
  return (
    <div className="nightwalker-category-bar-wrapper">
      <div className="nightwalker-category-bar">
        {Array.isArray(restaurantTypes) &&
          restaurantTypes.map((type) => (
            <button
              key={type.id}
              className={`nightwalker-category-button ${
                selectedType === type.name ? "active" : ""
              }`}
              onClick={() => onTypeClick(type.name)}
            >
              {type.icon && (
                <img src={type.icon} alt={type.name} className="category-icon" />
              )}
              <br />
              {type.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CategoryBar; 