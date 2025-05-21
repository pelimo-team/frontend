import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  onRatingHover?: (rating: number) => void;
  hoverRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 18,
  interactive = false,
  onRatingChange,
  onRatingHover,
  hoverRating,
}) => {
  const displayRating = hoverRating || rating;

  const handleClick = (star: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(star);
    }
  };

  const handleHover = (star: number) => {
    if (interactive && onRatingHover) {
      onRatingHover(star);
    }
  };

  return (
    <div className={`d-flex ${interactive ? 'rating-stars' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${interactive ? 'star-icon' : 'rating-star'} ${
            star <= displayRating ? (interactive ? 'active' : 'filled') : (interactive ? '' : 'unfilled')
          }`}
          fill={star <= displayRating ? '#945436' : 'transparent'}
          stroke={star <= displayRating ? '#945436' : '#945436'}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleHover(star)}
          onMouseLeave={() => handleHover(0)}
        />
      ))}
    </div>
  );
};

export default StarRating; 