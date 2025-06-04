import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Comment } from './types';
import CommentCard from './CommentCard';
import StarRating from './StarRating';

interface CommentsSectionProps {
  comments: Comment[];
  isActive: boolean;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function getCsrfToken(): string {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : '';
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  isActive,
  setComments
}) => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>('');

  const handleSubmit = async () => {
    if (!commentText || userRating === 0) return;

    try {
      await fetch(`/api/restaurants/${restaurantId}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({
          comment: commentText,
          rating: userRating,
        }),
        credentials: 'include',
      });

      const res = await fetch(`/api/restaurants/${restaurantId}/reviews/`);
      const data = await res.json();
      setComments(data.results || []);

      setUserRating(0);
      setCommentText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const averageRating = useMemo(() => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
    return parseFloat((total / comments.length).toFixed(1));
  }, [comments]);

  return (
    <div className={`comments-content ${isActive ? 'fade-in active' : 'fade-out'}`}>
      <div className="row mb-5">
        <div className="col-12">
          <div className="add-comment-card p-4">
            <h3 className="section-title mb-4">Leave Your Review</h3>
            <StarRating
              rating={userRating}
              size={28}
              interactive={true}
              onRatingChange={setUserRating}
              onRatingHover={setHoverRating}
              hoverRating={hoverRating}
            />
            <textarea
              className="form-control mb-4"
              rows={4}
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="btn btn-submit pulse-on-hover" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </div>

      <div className="comments-list">
        <h3 className="section-title mb-4">User Reviews</h3>

        {comments.length > 0 && (
          <div className="mb-4">
            <strong>Average Rating: </strong>
            <StarRating rating={averageRating} size={22} interactive={false} />
            <span className="ms-2 text-muted">({averageRating} from 5)</span>
          </div>
        )}

        {comments.map((comment, index) => {
          const formattedDate = new Date(comment.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });

          return (
            <CommentCard
              key={comment.id}
              comment={{ ...comment, formattedDate }}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
