import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import CommentsSection from './CommentsSection';
import './RestaurantPage.css';
import { api } from './utils/api';

const Restaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurant: initialRestaurant } = location.state || {};
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(initialRestaurant || {});
  const [menuCategories, setMenuCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [activeTab, setActiveTab] = useState('menu');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    fetchRestaurantData();
    fetchCart();
  }, [id]);

  const checkAuthStatus = async () => {
    try {
      await api.get('/api/accounts/user/');
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const fetchRestaurantData = async () => {
    setLoading(true);
    setError(null);
    try {
      let restaurantData = initialRestaurant;
      if (!restaurantData) {
        const response = await api.get(`/api/restaurants/${id}/`);
        restaurantData = response;
      }
      setRestaurant(restaurantData);

      const menuResponse = await api.get(`/api/restaurants/${id}/menu/`);
      if (menuResponse) {
        if (menuResponse.categories && Array.isArray(menuResponse.categories)) {
          setMenuCategories(menuResponse.categories);
        } else if (Array.isArray(menuResponse)) {
          const categoriesMap = menuResponse.reduce((acc, item) => {
            const categoryId = item.category?.id;
            const categoryName = item.category?.name || 'Other';
            if (!acc[categoryId]) {
              acc[categoryId] = {
                id: categoryId,
                name: categoryName,
                menu_items: []
              };
            }
            acc[categoryId].menu_items.push(item);
            return acc;
          }, {});
          setMenuCategories(Object.values(categoriesMap));
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load restaurant data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const cartData = await api.get('/api/cart/');
      const cartState = {};
      if (cartData && cartData.items) {
        cartData.items.forEach(item => {
          cartState[item.menu_item.id] = item.quantity;
        });
      }
      setCart(cartState);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const updateCart = async (itemId, newQuantity) => {
    try {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      const currentQty = cart[itemId] || 0;

      if (newQuantity === 0) {
        const cartData = await api.get('/api/cart/');
        const itemToDelete = cartData.items.find(item => item.menu_item.id === itemId);
        if (itemToDelete) {
          await api.delete(`/api/cart/item/${itemToDelete.id}/delete/`);
        }
      } else if (currentQty === 0) {
        await api.post('/api/cart/add/', {
          restaurant_id: id,
          menu_item_id: itemId,
          quantity: newQuantity
        });
      } else {
        const cartData = await api.get('/api/cart/');
        const itemToUpdate = cartData.items.find(item => item.menu_item.id === itemId);
        if (itemToUpdate) {
          await api.patch(`/api/cart/item/${itemToUpdate.id}/`, {
            quantity: newQuantity
          });
        }
      }

      setCart(prev => ({
        ...prev,
        [itemId]: newQuantity
      }));

      await fetchCart();
    } catch (err) {
      console.error('Error updating cart:', err);
      if (err.message === 'Authentication required') {
        navigate('/login');
      }
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="restaurant-page restaurant-container-fluid p-0">
      <header className="restaurant-header">
        <div className="restaurant-menuicon" onClick={() => navigate(-1)}>
          <img src="images/back.png" alt="برگشت" />
        </div>
        <img src="images/Logo.png" alt="لوگو" className="restaurant-logocenter" />
        <div className="restaurant-userinfo d-flex flex-column align-items-center">
          <button className="cart-icon-restaurant" onClick={() => navigate('/cart')}>
            <img src="images/basket.png" alt="سبد خرید" />
            {Object.values(cart).reduce((a, b) => a + b, 0) > 0 && (
              <span className="cart-badge">{Object.values(cart).reduce((a, b) => a + b, 0)}</span>
            )}
          </button>
          <img
            src={restaurant.logo || 'images/profile.png'}
            alt="پروفایل"
            className="restaurant-useravatar"
          />
          <span className="restaurant-username">{restaurant.name}</span>
        </div>
      </header>

      <div className="restaurant-banner">
        {restaurant.image && (
          <img 
            src={restaurant.image}
            alt={restaurant.name} 
            className="restaurant-image" 
          />
        )}
      </div>

      <div className="restaurant-infosection px-5 py-4">
        <div className="restaurant-infotext">
          <div className="fs-5 fw-bold">اسم رستوران: {restaurant.name}</div>
          <div className="fs-6 mt-2">لوکیشن: {restaurant.location}</div>
        </div>
        <div className="restaurant-rating">
          <span>{'⭐'.repeat(Math.round(restaurant.rating || 0))}</span>
          <span className="ms-2">{restaurant.rating ? restaurant.rating.toFixed(1) : 'N/A'}/5</span>
        </div>
      </div>

      <div className="restaurant-tabs">
        <div 
          className={`restaurant-tab ${activeTab === 'menu' ? 'active' : ''}`} 
          onClick={() => setActiveTab('menu')}
        >
          منو
        </div>
        <div 
          className={`restaurant-tab ${activeTab === 'comments' ? 'active' : ''}`} 
          onClick={() => setActiveTab('comments')}
        >
          نظرات
        </div>
      </div>

      {activeTab === 'menu' && menuCategories.length > 0 ? (
        <Menu 
          categories={menuCategories} 
          cart={cart} 
          updateCart={updateCart}
          isAuthenticated={isAuthenticated}
        />
      ) : activeTab === 'menu' ? (
        <div className="menu-empty">منو در دسترس نیست</div>
      ) : (
        <CommentsSection restaurantId={id} />
      )}
    </div>
  );
};

export default Restaurant;