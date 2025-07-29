import React, { FormEvent, useState } from 'react';
import StarRating from './StarRating';

interface CommentFormProps {
  isAuthenticated: boolean;
  onSubmit: (comment: string, rating: number) => Promise<void>;
  onLoginClick: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({
  isAuthenticated,
  onSubmit,
  onLoginClick,
  isSubmitting,
  submitError,
}) => {
  const [newComment, setNewComment] = useState("");
  const [newStars, setNewStars] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated || !newComment.trim() || newStars === 0 || isSubmitting) return;
    await onSubmit(newComment, newStars);
    setNewComment("");
    setNewStars(0);
  };

  return (
    <div className="card-add-comment">
      <h4>write your review</h4>
      {!isAuthenticated && (
        <div className="auth-warning">
        for commenting{" "}
          <button onClick={onLoginClick}>please login</button> .
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="selectable-add-comment">
          <StarRating
            count={newStars}
            isInteractive={true}
            onStarClick={setNewStars}
          />
        </div>
        <textarea
          className="comment-box-add-comment"
          placeholder="write your review here"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          disabled={!isAuthenticated}
        />
        {submitError && <div className="error-message">{submitError}</div>}
        <button
          type="submit"
          className="submit-button-add-comment"
          disabled={!isAuthenticated || !newComment.trim() || newStars === 0 || isSubmitting}
        >
          {isSubmitting ? "sending..." : "sent"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm; 