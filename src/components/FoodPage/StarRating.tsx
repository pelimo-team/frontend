import React from 'react';
import '../../styles/FoodPage.css';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  interactive = false,
  onRatingChange
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleStarClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    const activeRating = hoverRating || rating;

    for (let i = 1; i <= maxRating; i++) {
      const filled = i <= activeRating;
      const halfFilled = !filled && i - 0.5 <= activeRating;

      stars.push(
        <span
          key={i}
          className={`star ${size} ${filled ? 'filled' : ''} ${halfFilled ? 'half-filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => interactive && setHoverRating(i)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      {renderStars()}
      {interactive && <span className="rating-value">({rating.toFixed(1)})</span>}
    </div>
  );
};

export default StarRating;