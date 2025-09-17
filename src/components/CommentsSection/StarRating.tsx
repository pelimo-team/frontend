import React from 'react';

interface StarRatingProps {
  count: number;
  isInteractive?: boolean;
  onStarClick?: (index: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ count, isInteractive = false, onStarClick }) => {
  return (
    <div className="stars-add-comment">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star-add-comment ${index < count ? "selected-add-comment" : ""}`}
          onClick={isInteractive ? () => onStarClick?.(index + 1) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating; 