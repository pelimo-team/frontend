import React, { useState } from "react";

import {  Send } from "lucide-react";

import { Review } from "./Type";
import StarRating from "./StarRating";
import "../../styles/FoodPage.css";

interface ReviewItemProps {
  review: Review;
  restaurantId: number;
  onLike: (reviewId: string) => void;
  onDislike: (reviewId: string) => void;
  onAddReply: (reviewId: string, reply: string) => void;
  voted?: "like" | "dislike" | null;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,

  
  onAddReply,
 

}) => {
  console.log("Review replies:", review.replies);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubmitted, setReplySubmitted] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      onAddReply(review.id, replyText);
      setReplyText("");
      setReplySubmitted(true);

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
          <div>
            <h4 className="user-name"style={{fontSize:"2rem"}}>{review.user}</h4>
            <span className="review-date">{formatDate(review.created_at)}</span>
          </div>
        </div>
        <div className="review-rating">
          <StarRating rating={review.rating} size="small" />
        </div>
      </div>

      <p className="review-comment" style={{fontSize:"1.5rem"}}>{review.comment}</p>

      <div className="review-actions">
        {/* <button
          className={`action-btn like-btn ${voted === "like" ? "voted" : ""}`}
          onClick={() => onLike(review.id)}
          disabled={voted === "like"}
        >
          <ThumbsUp size={16} />
          <span className="action-count">{review.likes}</span>
        </button>

        <button
          className={`action-btn dislike-btn ${
            voted === "dislike" ? "voted" : ""
          }`}
          onClick={() => onDislike(review.id)}
          disabled={voted === "dislike"}
        >
          <ThumbsDown size={16} />
          <span className="action-count">{review.dislikes}</span>
        </button> */}

        {/* <button
          className="action-btn reply-btn"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          <MessageCircle size={16} />
          <span>Reply</span>
        </button> */}
      </div>

      {/* Replies Section */}
      {Array.isArray(review.replies) && review.replies.length > 0 && (
        <div className="replies-section">
          {review.replies.map((reply, index) => {
            const dateObj = new Date(reply.date);
            const formattedDate = isNaN(dateObj.getTime())
              ? "invalid date"
              : formatDate(reply.date);

            return (
              <div key={reply.id ?? `reply-${index}`} className="reply-item">
                <div>
                  <strong>{reply.user || "Unknown"}</strong> -{" "}
                  <small>{formattedDate}</small>
                </div>
                <p>{reply.comment}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && (
        <form
          className={`reply-form ${replySubmitted ? "submitted" : ""}`}
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
            <span>{replySubmitted ? "Sent!" : "Send"}</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewItem;
