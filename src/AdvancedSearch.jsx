import React, { useRef, useState, useEffect } from "react";
import "./AdvancedSearch.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const categories = ["همه", "رستوران", "فست فود", "کافی شاپ", "آبمیوه سنتی", "شیرینی", "میوه"];
const allFilters = ["طبع سرد", "طبع گرم", "دارای تخفیف", "خوش قیمت‌ترین", "موجود", "پرفروش‌ترین", "گران‌ترین", "ارزان‌ترین"];

const AdvancedSearch = () => {
  const navigate = useNavigate();

  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const searchQuery = queryParams.get("query") || "pizza";

  const [activeTab, setActiveTab] = useState("همه");
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
    { id: 1 ,name: "رستوران نمونه ۱", rating: "۴٫۲", reviews: 200, delivery: "رایگان" },
    {id: 2, name: "رستوران نمونه ۲", rating: "۴٫۰", reviews: 150, delivery: "۱۰,۰۰۰ تومان" },
    { id:3, name: "رستوران نمونه ۳", rating: "۴٫۵", reviews: 250, delivery: "۵,۰۰۰ تومان" },
    { id: 4, name: "رستوران نمونه 4", rating: "۴٫۵", reviews: 250, delivery: "۵,۰۰۰ تومان" },
    { id: 5, name: "رستوران نمونه 5", rating: "۴٫۲", reviews: 200, delivery: "رایگان" },
    { id: 6, name: "رستوران نمونه 6", rating: "۴٫۰", reviews: 150, delivery: "۱۰,۰۰۰ تومان" },
    { id: 7, name: "رستوران نمونه 7", rating: "۴٫۵", reviews: 250, delivery: "۵,۰۰۰ تومان" },
    { id: 8, name: "رستوران نمونه 8", rating: "۴٫۵", reviews: 250, delivery: "۵,۰۰۰ تومان" },
    { id: 9, name: "رستوران نمونه 9", rating: "۴٫۲", reviews: 200, delivery: "رایگان" },
    { id: 10, name: "رستوران نمونه 10", rating: "۴٫۰", reviews: 150, delivery: "۱۰,۰۰۰ تومان" },
    { id: 11, name: "رستوران نمونه 11", rating: "۴٫۵", reviews: 250, delivery: "۵,۰۰۰ تومان" },
    { id: 12, name: "رستوران نمونه 12", rating: "۴٫۵", reviews: 250, delivery: "۵,۰۰۰ تومان" },
  ];

  const [showAllShops, setShowAllShops] = useState(false);
const visibleShops = showAllShops ? shopList : shopList.slice(0, 6);

const [showAllProducts, setShowAllProducts] = useState(false);
const productList = [
  { name: "پیتزا مخصوص", rating: "۳٫۶", restaurant: "اسم رستوران", delivery: "هزینه پیک", price: "قیمت" },
  { name: "پیتزا پپرونی", rating: "۴٫۲", restaurant: "اسم رستوران", delivery: "رایگان", price: "۱۲۰,۰۰۰ تومان" },
  { name: "پیتزا گوشت", rating: "۴٫۰", restaurant: "اسم رستوران", delivery: "۵,۰۰۰ تومان", price: "۱۳۰,۰۰۰ تومان" },
  { name: "پیتزا سبزیجات", rating: "۳٫۸", restaurant: "اسم رستوران", delivery: "۱۰,۰۰۰ تومان", price: "۱۱۰,۰۰۰ تومان" },
  { name: "پیتزا مارگاریتا", rating: "۴٫۳", restaurant: "اسم رستوران", delivery: "رایگان", price: "۱۰۰,۰۰۰ تومان" },
  { name: "پیتزا قارچ", rating: "۴٫۵", restaurant: "اسم رستوران", delivery: "۵,۰۰۰ تومان", price: "۱۲۵,۰۰۰ تومان" },
  { name: "پیتزا دودی", rating: "۴٫۱", restaurant: "اسم رستوران", delivery: "۱۰,۰۰۰ تومان", price: "۱۳۵,۰۰۰ تومان" },
  { name: "پیتزا استیک", rating: "۴٫۷", restaurant: "اسم رستوران", delivery: "۵,۰۰۰ تومان", price: "۱۵۰,۰۰۰ تومان" },
  { name: "پیتزا مکزیکی", rating: "۴٫۶", restaurant: "اسم رستوران", delivery: "رایگان", price: "۱۴۵,۰۰۰ تومان" },
  { name: "پیتزا مرغ", rating: "۴٫۴", restaurant: "اسم رستوران", delivery: "۵,۰۰۰ تومان", price: "۱۱۵,۰۰۰ تومان" },

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


          <button className="close-btn-advanced-search">✕</button>
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

      {/* Shops Section */}
      <section className="shops-section-advanced-search">
  <div className="section-header-advanced-search">
    <h3>{shopList.length} فروشگاه</h3>
    {shopList.length > 6 && (
      <a onClick={() => setShowAllShops(!showAllShops)} style={{ cursor: "pointer" }}>
        {showAllShops ? "بستن >" : "مشاهده همه <"}
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
        <div className="delivery-cost-advanced-search">🛵 هزینه پیک: {shop.delivery}</div>
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
        {showAllProducts ? "بستن >" : "مشاهده همه <"}
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
