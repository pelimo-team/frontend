import React, { useRef, useState, useEffect } from "react";
import "./AdvancedSearch.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const categories = ["All", "Restaurant", "FastFood", "Coffee Shop", "Juice and Ice Cream", "Sweet", "Fruit"];
const allFilters = ["Cold-tempared", "Hot-tempared", "Discounted", " Affordable", "exists", "Best-Selling", "Most expensive", "Cheapest"];

const AdvancedSearch = () => {
  const navigate = useNavigate();

  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const searchQuery = queryParams.get("query") || "pizza";

  const [activeTab, setActiveTab] = useState("All");
  const [activeFilters, setActiveFilters] = useState([]);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);

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

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  const [selectedShopIndex, setSelectedShopIndex] = useState(null);
  const shopList = [
    { id: 1 ,name: "Restaurant1", rating: "4.2", reviews: 200, delivery: "Free" },
    {id: 2, name: "Restaurant2", rating: "4.0", reviews: 150, delivery: "12000 T" },
    { id:3, name: "Restaurant3", rating: "4.5", reviews: 250, delivery: "5000 T" },
    { id: 4, name: "Restaurant4", rating: "4.5", reviews: 250, delivery: "5000 T" },
    { id: 5, name: "Restaurant5", rating: "4.2", reviews: 200, delivery: "Free" },
    { id: 6, name: "Restaurant6", rating: "4.0", reviews: 150, delivery: "10000 T" },
    { id: 7, name: "Restaurant7", rating: "4.5", reviews: 250, delivery: "5000 T" },
    { id: 8, name: "Restaurant8", rating: "4.5", reviews: 250, delivery: "5000 T" },
    { id: 9, name: "Restaurant9", rating: "4.2", reviews: 200, delivery: "Free" },
    { id: 10, name: "Restaurant10", rating: "4.0", reviews: 150, delivery: "10000 T" },
    { id: 11, name: "Restaurant11", rating: "4.5", reviews: 250, delivery: "5000 T" },
    { id: 12, name: "Restaurant12", rating: "4.5", reviews: 250, delivery: "5000 T" },
  ];

  const [showAllShops, setShowAllShops] = useState(false);
const visibleShops = showAllShops ? shopList : shopList.slice(0, 6);

const [showAllProducts, setShowAllProducts] = useState(false);
const productList = [
  { name: "PizzaSpecial", rating: "3.6", restaurant: "Name  Restaurant", delivery: "Courier", price: "Cost" },
  { name: "PizzaPeper", rating: "4.2", restaurant: "Name  Restaurant", delivery: "Free", price: "۱۲۰,۰۰۰ تومان" },
  { name: "PizzaMeet", rating: "4.1", restaurant: "Name  Restaurant", delivery: "5000 T", price: "۱۳۰,۰۰۰ تومان" },
  { name: "PizzaVegan", rating: "3.8", restaurant: "Name  Restaurant", delivery: "10000 T", price: "۱۱۰,۰۰۰ تومان" },
  { name: "PizzaMargaret", rating: "4.3", restaurant: "Name  Restaurant", delivery: "Free", price: "۱۰۰,۰۰۰ تومان" },
  { name: "PizzaMashroom", rating: "4.5", restaurant: "Name  Restaurant", delivery: "۵,۰۰ توما5ن", price: "۱۲۵,۰۰۰ تومان" },
  { name: "PizzaWell-down", rating: "4.1", restaurant: "Name  Restaurant", delivery: "۱۰,۰۰۰ تومان", price: "۱۳۵,۰۰۰ تومان" },
  { name: "PizzaSteak", rating: "4.7", restaurant: "Name  Restaurant", delivery: "۵,۰۰۰ تومان", price: "۱۵۰,۰۰۰ تومان" },
  { name: "PizzaMeczzico", rating: "4.6", restaurant: "Name  Restaurant", delivery: "رایگان", price: "۱۴۵,۰۰۰ تومان" },
  { name: "PizzaChicken", rating: "4.4", restaurant: "Name  Restaurant", delivery: "۵,۰۰۰ تومان", price: "۱۱۵,۰۰۰ تومان" },

];
const visibleProducts = showAllProducts ? productList : productList.slice(0, 6);
const [selectedProductIndex, setSelectedProductIndex] = useState(null);
const [searchText, setSearchText] = useState(searchQuery);


  return (
    <div className="advanced-search">
      {/* Header */}
      <header className="header-advanced-search">
        <div className="header-top-advanced-search">
                   
 
<button className="cart-icon-advanced-search" onClick={() => navigate('/cart')}>
  
            <img src="basket.png" alt="" />
          </button>
          <img src="/Logo.png" alt="PELIMO Logo" className="logo-advanced-search" />
          <button
  className="back-btn-advanced-search"
  onClick={() => navigate('/')}
>
  <img src="back.png" alt="" />
</button>
 
        </div>

        {/* Search Bar */}
        <div className="search-bar-advanced-search">
        <input
  type="text"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>


          <button className="close-btn-advanced-search" onClick={() => setSearchText("")}>
            <img src="/close.png" alt="close" />
            
          </button>
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

      {/* Shops Section */}
      <section className="shops-section-advanced-search">
  <div className="section-header-advanced-search">
    <h3>{shopList.length} Restaurants</h3>
    {shopList.length > 6 && (
      <a onClick={() => setShowAllShops(!showAllShops)} style={{ cursor: "pointer" }}>
        {showAllShops ? "Close >" : "See All  <"}
      </a>
    )}
  </div>
  <div className="shop-cards-advanced-search">
    {visibleShops.map((shop, i) => (
      <div
        key={i}
        className={`shop-card-advanced-search ${selectedShopIndex === i ? "selected" : ""}`}
        onClick={() => {
          setSelectedShopIndex(i);
          navigate(`/restaurant/${i + 1}`, { state: { shop: shop } });
        }}
      >
        <h4 className="shop-name-advanced-search">{shop.name}</h4>
        <div className="shop-rating-advanced-search">
          ⭐ {shop.rating} | {shop.reviews} نظر
        </div>
        <div className="delivery-cost-advanced-search">🛵 Courier: {shop.delivery}</div>
      </div>
    ))}
  </div>
</section>




      {/* Products Section */}
      <section className="products-section-advanced-search">
  <div className="section-header-advanced-search">
  <h3>{productList.length} محصول</h3>
    {productList.length > 6 && (
      <a onClick={() => setShowAllProducts(!showAllProducts)} style={{ cursor: "pointer" }}>
        {showAllProducts ? "Close >" : "See All  <"}
      </a>
    )}
  </div>
  <div className={`product-cards-advanced-search ${showAllProducts ? "scrollable-row" : ""}`}>
  {visibleProducts.map((product, i) => (
  <div
    key={i}
    className={`product-card-advanced-search ${selectedProductIndex === i ? "selected" : ""}`}
    onClick={() => setSelectedProductIndex(i)}
  >
    <div className="product-rating-advanced-search">⭐ {product.rating}</div>
    <div className="product-image-advanced-search">عکس غذا</div>
    <div className="product-info-advanced-search">
      <p>{product.name}</p>
      <p className="restaurant-name-advanced-search">{product.restaurant}</p>
      <p className="delivery-price-advanced-search">{product.delivery}</p>
      <p className="price-advanced-search">{product.price}</p>
    </div>
  </div>
))}

  </div>
</section>


    </div>
  );
};

export default AdvancedSearch;
