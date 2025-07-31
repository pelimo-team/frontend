import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem } from "../../components/AdvancedSearch/types";
import AddToBasket from "./AddToBasket";
import ReviewSection from "./ReviewSection";
import { api } from "../../utils/api"; // ← آدرس دقیق نسبت به پروژه‌ات

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/api/items/${id}/`)
        .then((data) => {
          setItem(data);
        })
        .catch((err) => {
          setError("error in fetching food information");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>item not found!</div>;

  return (
    <div className="food-detail-container">
      <div className="food-detail">
        <div className="food-image-container">
          <img
            src={item.image || "/food-placeholder.png"}
            alt={item.name}
            className="food-image"
          />
        </div>

        <div className="food-info">
          <h1 className="food-name">{item.name}</h1>
          <h2 className="restaurant-name">{item.restaurant?.name}</h2>



          <p className="food-description">{item.description}</p>

          {item.restaurant?.id ? (
            <AddToBasket
              price={item.price}
              restaurantId={item.restaurant.id}
              menuItemId={item.id}
              onSuccess={() => console.log("Item added!")}
            />
          ) : (
            <div className="error-message"> this item's restaurant is undefind</div>
          )}
        </div>
      </div>

      <ReviewSection />


    </div>
  );
};

export default FoodDetail;
