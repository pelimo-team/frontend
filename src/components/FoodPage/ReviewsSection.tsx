import React from "react";

interface Review {
  id?: string;
  user?: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  restaurantName: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, restaurantName }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="reviews-section">
      <h3>نظرات کاربران درباره {restaurantName}</h3>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={review.id || index} className="review-card">
            <div className="review-header">
              <span className="reviewer-name">{review.user || "کاربر"}</span>
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
  );
};

export default ReviewsSection;
