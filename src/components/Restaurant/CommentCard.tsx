import React from 'react';
import { Comment } from '../types';
import StarRating from './StarRating';

interface CommentCardProps {
  comment: Comment;
  index: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, index }) => {
  return (
    <div 
      className={`comment-card mb-4 p-4 comment-fade-in`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="comment-user">{comment.user}</h4>
        <div className="comment-rating d-flex align-items-center">
          <StarRating rating={comment.rating} />
        </div>
      </div>
      <div className="comment-date text-muted mb-3">{comment.date}</div>
      <p className="comment-text">{comment.text}</p>
    </div>
  );
};

export default CommentCard; 