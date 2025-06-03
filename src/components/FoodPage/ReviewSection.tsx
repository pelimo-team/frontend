import React, { useState } from 'react';
import { Review } from './Type';
import ReviewItem from './ReviewItem';
import AddReview from './AddReview';
import '../../styles/FoodPage.css';

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleLike = (reviewId: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, likes: review.likes + 1 } 
          : review
      )
    );
  };

  const handleDislike = (reviewId: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, dislikes: review.dislikes + 1 } 
          : review
      )
    );
  };

  const handleAddReply = (reviewId: string, replyText: string) => {
    const newReply = {
      id: `reply-${Date.now()}`,
      userId: 'currentUser',
      userName: 'You',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      comment: replyText,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, replies: [...review.replies, newReply] } 
          : review
      )
    );
  };

  const handleAddReview = (rating: number, comment: string) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: 'currentUser',
      userName: 'You',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const reviewsCount = reviews.length;

  return (
    <div className="review-section">
      <div className="review-summary">
        <h2>Customer Reviews</h2>
        <div className="review-stats">
          <div className="average-rating">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <span className="rating-max">/5</span>
          </div>
          <div className="reviews-count">
            Based on {reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'}
          </div>
        </div>
      </div>
      
      <div className="reviews-list">
        {reviews.map(review => (
          <ReviewItem 
            key={review.id} 
            review={review} 
            onLike={handleLike}
            onDislike={handleDislike}
            onAddReply={handleAddReply}
          />
        ))}
      </div>
      
      <AddReview onAddReview={handleAddReview} />
    </div>
  );
};

export default ReviewSection;