import React from "react";

interface FoodDetailsProps {
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  onsale?: boolean;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({
  name,
  description,
  price,
  sale_price,
  onsale,
}) => {
  return (
    <div className="food-details">
      <h1 className="food-name">{name}</h1>
      <p className="food-description">{description || "بدون توضیحات"}</p>

      <div className="food-price-section">
        {onsale && sale_price ? (
          <>
            <span className="original-price">
              {price.toLocaleString()} تومان
            </span>
            <span className="sale-price">
              {sale_price.toLocaleString()} تومان
            </span>
          </>
        ) : (
          <span className="regular-price">{price.toLocaleString()} تومان</span>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
