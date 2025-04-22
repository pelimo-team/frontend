import React, { useEffect, useState, useRef } from 'react';

import CommentsSection from './CommentsSection';
import './FoodPage.css';

const Food = () => {
  const [restaurant, setRestaurant] = useState({});
  const userId = 'user123';

  useEffect(() => {
    setTimeout(() => {
      setRestaurant({
        name: 'رستوران پلومو',
        location: 'تهران، ونک',
        rating: 4,
        image: '/restaurant.jpg',
        logo: '/Logo.png',
        username: 'username123',
        avatar: null, // فرضاً کاربر عکس نداره
      });
    }, 500);
  }, []);

  return (
    <div className="food-page container-fluid p-0">
      <header className="food-header">
        <div className="food-menuicon">
          <img src="./back.png" alt="برگشت" />
        </div>
        <img src="/Logo.png" alt="لوگو" className="food-logocenter" />
        <div className="food-userinfo d-flex flex-column align-items-center">
          <img
            src={restaurant.avatar || '/profile.png'}
            alt="پروفایل"
            className="food-useravatar"
          />
          <span className="food-username">{restaurant.username}</span>
        </div>
      </header>

      <div className="food-banner">
        {restaurant.image && (
          <img src={restaurant.image} alt="رستوران" className="food-image" />
        )}
      </div>

      <div className="food-infosection px-5 py-4">
        <div className="food-infotext">
          <div className="fs-5 fw-bold">اسم رستوران: {restaurant.name}</div>
          <div className="fs-6 mt-2">لوکیشن: {restaurant.location}</div>
        </div>
        <div className="food-rating">
          <span>{'⭐'.repeat(restaurant.rating || 0)}</span>
          <span className="ms-2">{restaurant.rating}/5</span>
        </div>
      </div>

      {/* بخش نظرات */}
      <CommentsSection userId={userId} />
    </div>
  );
};

export default Food;
