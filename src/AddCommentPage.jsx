import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentsSection from './CommentsSection';
import './CommentsSection.css';

const AddCommentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantId, restaurantName } = location.state || {};

  if (!restaurantId) {
    return <div>Error: Restaurant ID not provided</div>;
  }

  return (
    <div className="comments-page">
      <header className="restaurant-header">
        <div className="restaurant-menuicon" onClick={() => navigate(-1)}>
          <img src="/back.png" alt="برگشت" />
        </div>
        <img src="/Logo.png" alt="لوگو" className="restaurant-logocenter" />
      </header>
      <div className="restaurant-info">
        <h2>{restaurantName}</h2>
      </div>
      <CommentsSection restaurantId={restaurantId} />
    </div>
  );
};

export default AddCommentPage; 