import React, { useState } from 'react';
import CommentCard from './CommentCard';

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

interface CommentListProps {
  comments: Comment[];
  isAuthenticated: boolean;
  reactions: Record<number, 'like' | 'dislike' | null>;
  onReaction: (commentId: number, reactionType: 'like' | 'dislike') => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  isAuthenticated,
  reactions,
  onReaction,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="comments-list-add-comment">
        {(showAll ? comments : comments.slice(0, 3)).map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isAuthenticated={isAuthenticated}
            reaction={reactions[comment.id]}
            onReaction={onReaction}
          />
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