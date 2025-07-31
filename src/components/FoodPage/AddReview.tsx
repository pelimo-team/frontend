import React, { useState } from "react";
import { Send } from "lucide-react";
import StarRating from "./StarRating";
import "../../styles/FoodPage.css";

interface AddReviewProps {
  onAddReview: (rating: number, comment: string) => Promise<void>;
}

const AddReview: React.FC<AddReviewProps> = ({ onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim().length < 10) {
      setError("please write at least 10 character");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onAddReview(rating, comment);
      setComment("");
      setRating(5);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      setError("error in sending comment. please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-review">
      <h3 style={{fontSize:"1.5rem"}}> add your comment</h3>

      <form onSubmit={handleSubmit} className={submitted ? "submitted" : ""}>
        <div className="rating-field">
          <label>your rate</label>
          <StarRating
            rating={rating}
            interactive={!loading}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className="comment-field">
          <label htmlFor="comment">your comment</label>
          <textarea
            id="comment"
            placeholder="share your experience with us..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            disabled={loading}
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <button
          type="submit"
          className="submit-review-btn"
          disabled={loading}
          aria-busy={loading}
        >
          <Send size={16} />
          <span>{submitted ? "sent!" : "send comment"}</span>
        </button>
      </form>
    </div>
  );
};

export default AddReview;
