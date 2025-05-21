import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Send } from 'lucide-react';
import { Review } from './Type';
import StarRating from './StarRating';
import '../../styles/FoodPage.css';

interface ReviewItemProps {
  review: Review;
  onLike: (reviewId: string) => void;
  onDislike: (reviewId: string) => void;
  onAddReply: (reviewId: string, reply: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ 
  review, 
  onLike, 
  onDislike, 
  onAddReply 
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySubmitted, setReplySubmitted] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      onAddReply(review.id, replyText);
      setReplyText('');
      setReplySubmitted(true);
      
      // Hide form after animation
      setTimeout(() => {
        setShowReplyForm(false);
        setReplySubmitted(false);
      }, 1500);
    }
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <div className="user-info">
          <img src={review.userAvatar} alt={review.userName} className="user-avatar" />
          <div>
            <h4 className="user-name">{review.userName}</h4>
            <span className="review-date">{formatDate(review.date)}</span>
          </div>
        </div>
        <div className="review-rating">
          <StarRating rating={review.rating} size="small" />
        </div>
      </div>
      
      <p className="review-comment">{review.comment}</p>
      
      <div className="review-actions">
        <button 
          className="action-btn like-btn" 
          onClick={() => onLike(review.id)}
        >
          <ThumbsUp size={16} />
          <span className="action-count">{review.likes}</span>
        </button>
        
        <button 
          className="action-btn dislike-btn" 
          onClick={() => onDislike(review.id)}
        >
          <ThumbsDown size={16} />
          <span className="action-count">{review.dislikes}</span>
        </button>
        
        <button 
          className="action-btn reply-btn" 
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          <MessageCircle size={16} />
          <span>Reply</span>
        </button>
      </div>
      
      {/* Replies Section */}
      {review.replies.length > 0 && (
        <div className="replies-section">
          {review.replies.map(reply => (
            <div key={reply.id} className="reply-item">
              <div className="reply-header">
                <img src={reply.userAvatar} alt={reply.userName} className="user-avatar small" />
                <div>
                  <h5 className="user-name">{reply.userName}</h5>
                  <span className="review-date">{formatDate(reply.date)}</span>
                </div>
              </div>
              <p className="reply-comment">{reply.comment}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Reply Form */}
      {showReplyForm && (
        <form 
          className={`reply-form ${replySubmitted ? 'submitted' : ''}`}
          onSubmit={handleReplySubmit}
        >
          <textarea
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            required
          />
          <button type="submit" className="send-reply-btn">
            <Send size={16} />
            <span>{replySubmitted ? 'Sent!' : 'Send'}</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewItem;