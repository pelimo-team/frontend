import React, { useState } from 'react';

interface CommentsSectionProps {
  restaurantId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ restaurantId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('ارسال نظر:', comment, 'برای رستوران با ID:', restaurantId);
    setComment('');
  };

  return (
    <div className="comments-section">
      <textarea
        placeholder="نظر خود را بنویسید..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>ارسال نظر</button>
    </div>
  );
};

export default CommentsSection;
