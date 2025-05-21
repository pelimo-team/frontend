import React, { useState } from "react";
import { Send } from "lucide-react";
import StarRating from "./StarRating";
import '../../styles/FoodPage.css';

interface AddReviewProps {
  onAddReview: (rating: number, comment: string) => void;
}

const AddReview: React.FC<AddReviewProps> = ({ onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim().length < 10) {
      setError("Please write a comment with at least 10 characters");
      return;
    }

    setError("");
    onAddReview(rating, comment);
    setComment("");
    setRating(5);
    setSubmitted(true);

    // Reset submitted state after animation
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="add-review">
      <h3>Add Your Review</h3>

      <form onSubmit={handleSubmit} className={submitted ? "submitted" : ""}>
        <div className="rating-field">
          <label>Your Rating</label>
          <StarRating
            rating={rating}
            interactive={true}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className="comment-field">
          <label htmlFor="comment">Your Comment</label>
          <textarea
            id="comment"
            placeholder="Share your experience with this food..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <button type="submit" className="submit-review-btn">
          <Send size={16} />
          <span>{submitted ? "Review Submitted!" : "Submit Review"}</span>
        </button>
      </form>
    </div>
  );
};

export default AddReview;
