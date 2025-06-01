import React, { useState } from "react";
import CommentCard from "./CommentCard";
import ReplyForm from "./ReplyForm";

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
  replies?: Comment[];
}

interface CommentListProps {
  comments: Comment[];
  isAuthenticated: boolean;
  reactions: Record<number, "like" | "dislike" | null>;
  onReaction: (commentId: number, reactionType: "like" | "dislike") => void;
  onReplySubmit: (parentCommentId: number, replyText: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  isAuthenticated,
  reactions,
  onReaction,
  onReplySubmit,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [replyOpenFor, setReplyOpenFor] = useState<number | null>(null);

  return (
    <>
      <div className="comments-list-add-comment">
        {(showAll ? comments : comments.slice(0, 3)).map((comment) => (
          <div key={comment.id} className="comment-wrapper">
            <CommentCard
              comment={comment}
              isAuthenticated={isAuthenticated}
              reaction={reactions[comment.id]}
              onReaction={onReaction}
              onReplyClick={() =>
                setReplyOpenFor((prev) => (prev === comment.id ? null : comment.id))
              }
            />

            {/* فرم ریپلای */}
            {replyOpenFor === comment.id && (
              <ReplyForm
                onSubmit={(replyText) => {
                  onReplySubmit(comment.id, replyText);
                  setReplyOpenFor(null);
                }}
              />
            )}

            {/* ریپلای‌های این کامنت */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="replies-list">
                {comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    comment={reply}
                    isAuthenticated={isAuthenticated}
                    reaction={reactions[reply.id]}
                    onReaction={onReaction}
                    isReply // prop مخصوص ریپلای
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {comments.length > 3 && (
        <button
          className="show-more-add-comment"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "نمایش کمتر" : "نمایش نظرات بیشتر"}
        </button>
      )}
    </>
  );
};

export default CommentList;
