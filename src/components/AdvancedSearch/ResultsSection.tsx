import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant, MenuItem } from './types';

interface ResultsSectionProps {
  searchMode: 'restaurants' | 'items';
  visibleItems: (Restaurant | MenuItem)[];
  loading: boolean;
  error: string | null;
  showAllItems: boolean;
  setShowAllItems: (show: boolean) => void;
  selectedShopIndex: number | null;
  setSelectedShopIndex: (index: number | null) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  searchMode,
  visibleItems,
  loading,
  error,
  showAllItems,
  setShowAllItems,
  selectedShopIndex,
  setSelectedShopIndex,
}) => {
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="results-section-advanced-search">
      <div className="section-header-advanced-search">
        <h3>
          {visibleItems.length}{" "}
          {searchMode === "restaurants" ? "Store" : "Food"}
        </h3>
        {visibleItems.length > 6 && (
          <a
            onClick={() => setShowAllItems(!showAllItems)}
            style={{ cursor: "pointer" }}
          >
            {showAllItems ? "Close >" : "Show All <"}
          </a>
        )}
      </div>
      <div className="items-grid-advanced-search">
        {searchMode === "restaurants"
          ? (visibleItems as Restaurant[]).map((restaurant, i) => (
              <div
                key={restaurant.id}
                className={`shop-card-advanced-search ${
                  selectedShopIndex === i ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedShopIndex(i);
                  navigate(`/restaurant/${restaurant.id}`, {
                    state: { restaurant },
                  });
                }}
              >
                <div className="shop-image-container">
                  {restaurant.image ? (
                    <img
                      src={`http://127.0.0.1:8000${restaurant.image}`}
                      alt={restaurant.name}
                      className="shop-image"
                    />
                  ) : (
                    <div className="shop-image-placeholder">No Image</div>
                  )}
                </div>
                <h4 className="shop-name-advanced-search">
                  {restaurant.name}
                </h4>
                <div className="shop-rating-advanced-search">
                  ⭐{" "}
                  {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}{" "}
                  | {restaurant.reviews_count || 0} Comment
                </div>
                <div className="delivery-cost-advanced-search">
                  🛵 Delivery Cost :{" "}
                  {restaurant.delivery_cost === 0
                    ? "Free"
                    : `${restaurant.delivery_cost} T`}
                </div>
              </div>
            ))
          : (visibleItems as MenuItem[]).map((item) => (
              <div
                key={item.id}
                className="menu-item-card-advanced-search"
                onClick={() =>
                  navigate(`/restaurant/${item.restaurant?.id}`, {
                    state: { scrollToItem: item.id },
                  })
                }
              >
                <div className="item-image-container">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                  ) : (
                    <div className="item-image-placeholder">No Image</div>
                  )}
                  {item.bestseller && (
                    <div className="bestseller-badge">Best Seller</div>
                  )}
                </div>
                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  {item.restaurant && (
                    <p className="item-restaurant">
                      {item.restaurant.name}
                    </p>
                  )}
                  {item.category_name && (
                    <p className="item-category">{item.category_name}</p>
                  )}
                  <div className="item-rating">
                    ⭐ {item.rate ? item.rate.toFixed(1) : "N/A"}
                  </div>
                  <div className="item-price">
                    {item.onsale ? (
                      <>
                        <span className="original-price">
                          {item.price} T
                        </span>
                        <span className="sale-price">
                          {item.sale_price} T
                        </span>
                      </>
                    ) : (
                      <span>{item.price} T</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default ResultsSection; 