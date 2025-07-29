import React from "react";
import StarRating from "./StarRating";

interface Comment {
  id: number;
  user_details?: {
    username: string;
  };
  user?: string;
  created_at: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
}

interface CommentCardProps {
  comment: Comment;
  isAuthenticated: boolean;
  reaction: "like" | "dislike" | null;
  onReaction: (commentId: number, reactionType: "like" | "dislike") => void;
  isReply?: boolean; // 🔹 آیا این یک ریپلای است؟
  onReplyClick?: () => void; // 🔹 عملکرد دکمه پاسخ
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  isAuthenticated,
  reaction,
  onReaction,
  isReply = false,
  onReplyClick,
}) => {
  return (
    <div className={`card-add-comment ${isReply ? "reply-card-add-comment" : ""}`}>
      <div className="comment-header-add-comment">
        <strong>{comment.user_details?.username || comment.user || "User"}</strong>
        <span className="date-add-comment">
          {comment.created_at
            ? new Date(comment.created_at).toLocaleDateString("fa-IR")
            : ""}
        </span>
      </div>

      <div className="comment-stars-add-comment">
        <StarRating count={comment.rating} />
      </div>

      <div className="comment-text-add-comment">{comment.comment}</div>

      <div className="comment-footer-add-comment">
        <button
          onClick={() => onReaction(comment.id, "like")}
          disabled={!isAuthenticated}
          className={`icon-button-add-comment ${
            reaction === "like" ? "active-like-add-comment" : ""
          }`}
        >
          👍 {comment.likes ?? 0}
        </button>

        <button
          onClick={() => onReaction(comment.id, "dislike")}
          disabled={!isAuthenticated}
          className={`icon-button-add-comment ${
            reaction === "dislike" ? "active-dislike-add-comment" : ""
          }`}
        >
          👎 {comment.dislikes ?? 0}
        </button>

        {/* دکمه پاسخ فقط برای کامنت‌های اصلی نمایش داده شود */}
        {!isReply && onReplyClick && (
          <button
            className="reply-button-add-comment"
            onClick={onReplyClick}
            disabled={!isAuthenticated}
          >
            reply
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
