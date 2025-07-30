import React, { useState } from 'react';

interface CommentsSectionProps {
  restaurantId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ restaurantId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('sending comment:', comment, ' for restaurant withID:', restaurantId);
    setComment('');
  };

  return (
    <div className="comments-section">
      <textarea
        placeholder="write your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>send</button>
    </div>
  );
};

export default CommentsSection;
