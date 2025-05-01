import React, { useRef, useState, useEffect } from "react";
import "./AdvancedSearch.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const categories = ["همه", "رستوران", "فست فود", "کافی شاپ", "آبمیوه سنتی", "شیرینی", "میوه"];
const allFilters = [
  "طبع سرد",
  "طبع گرم", 
  "دارای تخفیف",
  "خوش قیمت‌ترین",
  "موجود",
  "پرفروش‌ترین",
  "گران‌ترین",
  "ارزان‌ترین",
  "دارای عکس"
];

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [searchText, setSearchText] = useState(searchQuery);
  const [activeTab, setActiveTab] = useState("همه");
  const [activeFilters, setActiveFilters] = useState([]);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchMode, setSearchMode] = useState('restaurants'); // 'restaurants' or 'items'

  useEffect(() => {
    const activeIndex = categories.indexOf(activeTab);
    const currentTab = tabsRef.current[activeIndex];
    if (currentTab) {
      setUnderlineStyle({
        width: currentTab.offsetWidth + "px",
        left: currentTab.offsetLeft + "px",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    console.log('Search mode changed to:', searchMode);
    if (searchMode === 'restaurants') {
      fetchRestaurants();
    } else {
      fetchMenuItems();
    }
  }, [searchText, activeTab, activeFilters, searchMode]);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchText) queryParams.append('name', searchText);
      if (activeTab !== 'همه') queryParams.append('type', activeTab);
      
      if (activeFilters.includes('دارای تخفیف')) queryParams.append('has_onsale', 'true');
      if (activeFilters.includes('پرفروش‌ترین')) queryParams.append('has_bestseller', 'true');
      
      const url = `/api/restaurants/search/advanced/?${queryParams.toString()}`;
      console.log('Fetching restaurants from URL:', url);
      
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch restaurants';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            console.error('Error details:', errorData.details);
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }
      
      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);
      
      if (data && Array.isArray(data.results)) {
        setRestaurants(data.results);
        console.log(`Set ${data.results.length} restaurants`);
      } else if (Array.isArray(data)) {
        setRestaurants(data);
        console.log(`Set ${data.length} restaurants (legacy format)`);
      } else {
        console.error('Unexpected response format:', data);
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError(err.message);
      setRestaurants([]); // Reset restaurants on error
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchText) queryParams.append('name', searchText);
      if (activeTab !== 'همه') queryParams.append('restaurant_type', activeTab);
      
      if (activeFilters.includes('دارای تخفیف')) queryParams.append('is_onsale', 'true');
      if (activeFilters.includes('پرفروش‌ترین')) queryParams.append('is_bestseller', 'true');
      if (activeFilters.includes('دارای عکس')) queryParams.append('has_image', 'true');
      if (activeFilters.includes('گران‌ترین')) queryParams.append('ordering', '-price');
      if (activeFilters.includes('ارزان‌ترین')) queryParams.append('ordering', 'price');
      
      const url = `/api/items/search/advanced/?${queryParams.toString()}`;
      console.log('Fetching menu items from URL:', url);
      
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch menu items';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            console.error('Error details:', errorData.details);
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }
      
      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);
      
      if (data && Array.isArray(data.results)) {
        setMenuItems(data.results);
        console.log(`Set ${data.results.length} menu items`);
      } else if (Array.isArray(data)) {
        setMenuItems(data);
        console.log(`Set ${data.length} menu items (legacy format)`);
      } else {
        console.error('Unexpected response format:', data);
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error in fetchMenuItems:', err);
      setError(err.message);
      setMenuItems([]); // Reset menu items on error
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const [selectedShopIndex, setSelectedShopIndex] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);
  
  const visibleItems = searchMode === 'restaurants' 
    ? (showAllItems ? restaurants : restaurants.slice(0, 6))
    : (showAllItems ? menuItems : menuItems.slice(0, 6));

  // Add a debug log for rendering
  console.log('Current state:', {
    searchMode,
    loading,
    error,
    menuItemsCount: menuItems.length,
    restaurantsCount: restaurants.length,
    activeTab,
    activeFilters
  });

  return (
    <div className="advanced-search">
      {/* Header */}
      <header className="header-advanced-search">
        <div className="header-top-advanced-search">
          <button className="cart-icon-advanced-search" onClick={() => navigate('/cart')}>
            <img src="basket.png" alt="" />
          </button>
          <img src="/Logo.png" alt="PELIMO Logo" className="logo-advanced-search" />
          <button className="back-btn-advanced-search" onClick={() => navigate('/')}>
            <img src="back.png" alt="" />
          </button>
        </div>

        {/* Search Bar and Toggle */}
        <div className="search-section-advanced-search">
          <div className="search-bar-advanced-search">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="جستجو..."
            />
            <button className="close-btn-advanced-search">✕</button>
          </div>
          <div className="search-toggle-advanced-search">
            <button
              className={`toggle-btn ${searchMode === 'restaurants' ? 'active' : ''}`}
              onClick={() => setSearchMode('restaurants')}
            >
              رستوران‌ها
            </button>
            <button
              className={`toggle-btn ${searchMode === 'items' ? 'active' : ''}`}
              onClick={() => setSearchMode('items')}
            >
              منو غذا
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs-container-advanced-search">
          <div className="category-tabs-advanced-search">
            {categories.map((cat, i) => (
              <button
                key={cat}
                ref={(el) => (tabsRef.current[i] = el)}
                onClick={() => setActiveTab(cat)}
                className={`category-tab-advanced-search ${activeTab === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
            <span className="underline-advanced-search" style={underlineStyle}></span>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="filters-advanced-search">
        {allFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`filter-button-advanced-search ${activeFilters.includes(filter) ? "active-filter" : ""}`}
          >
            {activeFilters.includes(filter) && (
              <span className="close-tag-advanced-search">✕</span>
            )}
            {filter}
          </button>
        ))}
      </section>

      {/* Results Section */}
      <section className="results-section-advanced-search">
        <div className="section-header-advanced-search">
          <h3>{visibleItems.length} {searchMode === 'restaurants' ? 'فروشگاه' : 'غذا'}</h3>
          {visibleItems.length > 6 && (
            <a onClick={() => setShowAllItems(!showAllItems)} style={{ cursor: "pointer" }}>
              {showAllItems ? "بستن >" : "مشاهده همه <"}
            </a>
          )}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="items-grid-advanced-search">
            {searchMode === 'restaurants' ? (
              // Restaurant Cards
              visibleItems.map((restaurant, i) => (
                <div
                  key={restaurant.id}
                  className={`shop-card-advanced-search ${selectedShopIndex === i ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedShopIndex(i);
                    navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } });
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
                  <h4 className="shop-name-advanced-search">{restaurant.name}</h4>
                  <div className="shop-rating-advanced-search">
                    ⭐ {restaurant.rating ? restaurant.rating.toFixed(1) : 'N/A'} | {restaurant.reviews_count || 0} نظر
                  </div>
                  <div className="delivery-cost-advanced-search">
                    🛵 هزینه پیک: {restaurant.delivery_cost === 0 ? "رایگان" : `${restaurant.delivery_cost} تومان`}
                  </div>
                </div>
              ))
            ) : (
              // Menu Item Cards
              visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="menu-item-card-advanced-search"
                  onClick={() => navigate(`/restaurant/${item.restaurant?.id}`, {
                    state: { scrollToItem: item.id }
                  })}
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
                    {item.bestseller && <div className="bestseller-badge">پرفروش</div>}
                  </div>
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    {item.restaurant && (
                      <p className="item-restaurant">{item.restaurant.name}</p>
                    )}
                    {item.category_name && (
                      <p className="item-category">{item.category_name}</p>
                    )}
                    <div className="item-rating">
                      ⭐ {item.rate ? item.rate.toFixed(1) : 'N/A'}
                    </div>
                    <div className="item-price">
                      {item.onsale ? (
                        <>
                          <span className="original-price">{item.price} تومان</span>
                          <span className="sale-price">{item.sale_price} تومان</span>
                        </>
                      ) : (
                        <span>{item.price} تومان</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdvancedSearch;
