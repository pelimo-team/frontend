import React, { useState } from 'react';
import { Comment } from './types';
import CommentCard from './CommentCard';
import StarRating from './StarRating';

interface CommentsSectionProps {
  comments: Comment[];
  isActive: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, isActive }) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className={`comments-content ${isActive ? "fade-in active" : "fade-out"}`}>
      <div className="row mb-5">
        <div className="col-12">
          <div className="add-comment-card p-4">
            <h3 className="section-title mb-4">نظر خود را ثبت کنید</h3>
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
              placeholder="نظر خود را بنویسید..."
            ></textarea>
            <button className="btn btn-submit pulse-on-hover">ثبت نظر</button>
          </div>
        </div>
      </div>

      <div className="comments-list">
        <h3 className="section-title mb-4">نظرات کاربران</h3>
        {comments.map((comment, index) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection; 