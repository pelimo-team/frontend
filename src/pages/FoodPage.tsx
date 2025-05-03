import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import "../FoodPage.css";

interface Review {
  id?: string;
  user?: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Restaurant {
  name: string;
  logo?: string;
  rating?: number;
  city?: string;
  reviews?: Review[];
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  onsale?: boolean;
  image?: string;
  restaurant: Restaurant;
}

const FoodPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("FoodPage: Attempting to fetch data for ID:", id);

      if (!id) {
        console.error("No ID provided in URL parameters");
        setError("شناسه غذا یافت نشد");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("FoodPage: Making API request to:", `/api/items/${id}/`);

        const response = (await api.get(`/api/items/${id}/`)) as MenuItem;
        console.log("FoodPage: Received response:", response);

        if (!response) {
          throw new Error("No data received from API");
        }

        setMenuItem(response);
      } catch (err: unknown) {
        console.error("FoodPage: Error fetching data:", err);
        setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="food-page">
        <div className="loading-spinner">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error || !menuItem) {
    return (
      <div className="food-page">
        <div className="error-message">
          {error || "اطلاعات غذا یافت نشد"}
          <button
            className="custom-continue-btn mt-3"
            onClick={() => navigate(-1)}
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  if (!menuItem.restaurant) {
    console.error("Restaurant data is missing in the API response:", menuItem);
    return (
      <div className="food-page">
        <div className="error-message">
          اطلاعات رستوران یافت نشد
          <button
            className="custom-continue-btn mt-3"
            onClick={() => navigate(-1)}
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  const { restaurant } = menuItem;

  return (
    <div className="food-page">
      <header className="food-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src="/back.png" alt="بازگشت" />
        </button>
        <img src="/Logo.png" alt="لوگو" className="food-logocenter" />
        <div className="food-userinfo">
          <img
            src={restaurant.logo || "/restaurant-placeholder.png"}
            alt={restaurant.name}
            className="food-useravatar"
          />
          <span className="food-username">{restaurant.name}</span>
        </div>
      </header>

      <div className="food-content">
        <div className="food-banner">
          <img
            src={menuItem.image || "/food-placeholder.png"}
            alt={menuItem.name}
            className="food-image"
          />
        </div>

        <div className="food-details">
          <h1 className="food-name">{menuItem.name}</h1>
          <p className="food-description">
            {menuItem.description || "بدون توضیحات"}
          </p>

          <div className="food-price-section">
            {menuItem.onsale && menuItem.sale_price ? (
              <>
                <span className="original-price">
                  {menuItem.price.toLocaleString()} تومان
                </span>
                <span className="sale-price">
                  {menuItem.sale_price.toLocaleString()} تومان
                </span>
              </>
            ) : (
              <span className="regular-price">
                {menuItem.price.toLocaleString()} تومان
              </span>
            )}
          </div>
        </div>

        <div className="restaurant-section">
          <div className="restaurant-header">
            <h2>درباره {restaurant.name}</h2>
            <div className="restaurant-rating">
              <span className="stars">
                {"⭐".repeat(Math.round(restaurant.rating || 0))}
              </span>
              <span className="rating-text">
                {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}/5
              </span>
            </div>
          </div>

          <p className="restaurant-location">
            <span className="location-icon">📍</span>
            {restaurant.city || "آدرس نامشخص"}
          </p>
        </div>

        {restaurant.reviews && restaurant.reviews.length > 0 && (
          <div className="reviews-section">
            <h3>نظرات کاربران درباره {restaurant.name}</h3>
            <div className="reviews-list">
              {restaurant.reviews.map((review, index) => (
                <div key={review.id || index} className="review-card">
                  <div className="review-header">
                    <span className="reviewer-name">
                      {review.user || "کاربر"}
                    </span>
                    <span className="review-rating">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="review-text">{review.comment}</p>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
