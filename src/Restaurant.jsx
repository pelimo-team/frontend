import React, { useEffect, useState, useRef } from 'react';
import Menu from './Menu';
import CommentsSection from './CommentsSection';
import './RestaurantPage.css';
import { useParams, useLocation } from 'react-router-dom';


const Restaurant=()=>{
  const location = useLocation();
const { shop } = location.state || {};  // گرفتن اطلاعات فروشگاه

  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [activeTab, setActiveTab] = useState('menu');
  const categoryRefs = useRef([]);
  const userId = 'user123';

  useEffect(() => {
    if (shop) {
      setRestaurant({
        name: shop.name,
        location: 'تهران، ونک',
        rating: parseFloat(shop.rating),
        image: '/restaurant.jpg',
        logo: '/Logo.png',
        username: 'username123',
        avatar: null,
      });
    } else {
      setRestaurant({
        name: `رستوران ${id === '0' ? 'پلومو' : 'دیگر'}`,
        location: 'تهران، ونک',
        rating: 4,
        image: '/restaurant.jpg',
        logo: '/Logo.png',
        username: 'username123',
        avatar: null,
      });
    }
  
    setMenuItems([
      {
        category: 'دسته بندی ۱',
        items: [
          { id: 1, name: 'سالاد سزار', price: '50000', image: '/food_image.jpg' },
          { id: 2, name: 'سوپ ورمیشل', price: '30000', image: '/food_image.jpg' },
          { id: 3, name: 'پیتزا مارگاریتا', price: '70000', image: '/food_image.jpg' },
        ],
      },
      {
        category: 'دسته بندی ۲',
        items: [
          { id: 4, name: 'استیک گوشت', price: '150000', image: '/food_image.jpg' },
          { id: 5, name: 'پاستا آلفردو', price: '120000', image: '/food_image.jpg' },
          { id: 6, name: 'چیکن کوردن بلو', price: '110000', image: '/food_image.jpg' },
        ],
      },
      {
        category: 'دسته بندی ۳',
        items: [
          { id: 7, name: 'برگر کلاسیک', price: '90000', image: '/food_image.jpg' },
          { id: 8, name: 'هات‌داگ ویژه', price: '60000', image: '/food_image.jpg' },
          { id: 9, name: 'ساندویچ مرغ', price: '65000', image: '/food_image.jpg' },
        ],
      },
    ]);
  
  }, [id, shop]);
  

  const updateCart = (itemId, change) => {
    setCart((prev) => {
      const newQty = (prev[itemId] || 0) + change;
      return { ...prev, [itemId]: Math.max(newQty, 0) };
    });
  };

  return (
    <div className="restaurant-page restaurant-container-fluid p-0">
      <header className="restaurant-header">
        <div className="restaurant-menuicon">
          <img src="/back.png" alt="برگشت" />
        </div>
        <img src="/Logo.png" alt="لوگو" className="restaurant-logocenter" />
        <div className="restaurant-userinfo d-flex flex-column align-items-center">
          <img
            src={restaurant.avatar || '/profile.png'}
            alt="پروفایل"
            className="restaurant-useravatar"
          />
          <span className="restaurant-username">{restaurant.username}</span>
        </div>
      </header>

      <div className="restaurant-banner">
        {restaurant.image && (
          <img src={restaurant.image} alt="رستوران" className="restaurant-image" />
        )}
      </div>

      

      <div className="restaurant-infosection px-5 py-4">
        <div className="restaurant-infotext">
          <div className="fs-5 fw-bold">اسم رستوران: {restaurant.name}</div>
          <div className="fs-6 mt-2">لوکیشن: {restaurant.location}</div>
        </div>
        <div className="restaurant-rating">
          <span>{'⭐'.repeat(restaurant.rating || 0)}</span>
          <span className="ms-2">{restaurant.rating}/5</span>
        </div>
      </div>

      <div className="restaurant-tabs">
        <div className={`restaurant-tab ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>منو</div>
        <div className={`restaurant-tab ${activeTab === 'comments' ? 'active' : ''}`} onClick={() => setActiveTab('comments')}>نظرات</div>
      </div>

      {activeTab === 'menu' ? (
        <Menu menuItems={menuItems} cart={cart} updateCart={updateCart} />
      ) : (
        <CommentsSection userId={userId} />
      )}
    </div>
  );
};

export default Restaurant;