<<<<<<< Updated upstream
import React, { useState } from 'react';

const CommentsSection = ({ userId }) => {
  const [comments, setComments] = useState([
    { id: 1, name: 'مریم', date: '۱۴۰۳/۰۱/۱۰', message: 'خیلی خوب بود', rating: 5, likes: [], replies: [] },
    { id: 2, name: 'علی', date: '۱۴۰۳/۰۱/۱۲', message: 'طراحی خوبه 👌', rating: 4, likes: [], replies: [] },
  ]);
  const [formData, setFormData] = useState({ name: '', message: '', rating: 0 });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleLikeToggle = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likes.includes(userId)
                ? c.likes.filter((uid) => uid !== userId)
                : [...c.likes, userId],
            }
          : c
      )
    );
  };

  const handleReplySubmit = (parentId) => {
    if (replyText.trim() === '') return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, { name: 'شما', message: replyText }] } : c
      )
    );
    setReplyingTo(null);
    setReplyText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    const newComment = {
      id: Date.now(),
      name: formData.name,
      date: new Date().toLocaleDateString('fa-IR'),
      message: formData.message,
      rating: formData.rating,
      likes: [],
      replies: [],
    };
    setComments([newComment, ...comments]);
    setFormData({ name: '', message: '', rating: 0 });
  };

  const ratingStats = [5, 4, 3, 2, 1].map((r) =>
    Math.round((comments.filter((c) => c.rating === r).length / comments.length) * 100)
  );

  return (
    <div className="restaurant-commentssection restaurant-container my-5">
      <h4 className="fw-bold mb-3">دیدگاه‌ها</h4>

      {ratingStats.map((val, idx) => (
        <div key={idx} className="d-flex align-items-center gap-2 mb-2">
          <span>{'★'.repeat(5 - idx)}</span>
          <div className="progress flex-grow-1" style={{ height: '8px' }}>
            <div className="progress-bar bg-secondary" style={{ width: `${val}%` }}></div>
          </div>
          <span className="small">{val}%</span>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mb-5">
        <input
          name="name"
          placeholder="نام"
          className="form-control my-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          name="message"
          placeholder="پیام"
          className="form-control my-2"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <div className="mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              style={{ cursor: 'pointer', color: s <= formData.rating ? '#ffc107' : '#ccc' }}
              onClick={() => setFormData({ ...formData, rating: s })}
            >
              ★
            </span>
          ))}
        </div>
        <button className="btn btn-primary" type="submit">
          ارسال نظر
        </button>
      </form>

      {comments.map((c) => (
        <div key={c.id} className="border rounded p-3 mb-3">
          <div className="fw-bold d-flex justify-content-between">
            <span>{c.name}</span>
            <span style={{ color: '#ffc107' }}>{'★'.repeat(c.rating)}</span>
          </div>
          <div className="text-muted small mb-1">{c.date}</div>
          <div>{c.message}</div>

          <div className="d-flex gap-3 text-muted small mt-2">
            <span
              style={{ cursor: 'pointer', color: c.likes.includes(userId) ? 'red' : '#888' }}
              onClick={() => handleLikeToggle(c.id)}
            >
              ❤️ {c.likes.length}
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
            >
              🗨 پاسخ
            </span>
          </div>

          {replyingTo === c.id && (
            <div className="mt-3">
              <textarea
                className="form-control mb-2"
                rows="2"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="پاسخ خود را بنویسید..."
              />
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleReplySubmit(c.id)}
              >
                ارسال پاسخ
              </button>
            </div>
          )}

          {c.replies.length > 0 && (
            <div className="mt-3 ps-3 border-start">
              {c.replies.map((r, i) => (
                <div key={i} className="mb-2">
                  <div className="fw-bold small">{r.name}</div>
                  <div className="small">{r.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './CommentsSection.css'; // Use the updated CSS
import { api } from './utils/api'; // Import the api utility

const CommentsSection = ({ restaurantId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newStars, setNewStars] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reactions, setReactions] = useState({}); // Store user's reaction per comment { commentId: 'like' | 'dislike' | null }
  const navigate = useNavigate();

  // --- Fetch initial data --- 
  useEffect(() => {
    checkAuthStatus();
    fetchComments();
    // We might need to fetch user's reactions if the backend provides it
    // For now, reactions state is managed locally
  }, [restaurantId]);

  const checkAuthStatus = async () => {
    try {
      // Use api.get - it handles token automatically
      await api.get('/api/accounts/user/'); 
      setIsAuthenticated(true);
    } catch (err) {
      // api utility throws error on 401/403
      console.error('Auth check failed:', err.message);
      setIsAuthenticated(false);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      // Use api.get
      const data = await api.get(`/api/restaurants/${restaurantId}/reviews/`);
      // Assuming pagination or direct array
      setComments(Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : []); 
    } catch (err) {
      console.error('Error in fetchComments:', err);
      setFetchError(err.message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  // --- Like/Dislike Logic --- 
  const handleReaction = async (commentId, reactionType) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const currentReaction = reactions[commentId];
    const endpoint = `/api/restaurants/${restaurantId}/reviews/${commentId}/${reactionType}/`;

    // Optimistic update (optional, can make UI feel faster)
    const previousReactions = { ...reactions };
    const previousComments = [...comments];
    setReactions(prev => ({
      ...prev,
      [commentId]: prev[commentId] === reactionType ? null : reactionType
    }));
    // Find the comment and update its counts optimistically if needed (or rely on API response)

    try {
      // Use api.post - body isn't needed for these actions
      const data = await api.post(endpoint); 
      
      // Update comment state with actual counts from backend
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId ? { ...comment, likes: data.likes, dislikes: data.dislikes } : comment
        )
      );
      // Update reaction state based on backend response (confirms optimistic update)
      setReactions(prev => ({
         ...prev,
         [commentId]: data.status.includes('removed') ? null : reactionType
      }));

    } catch (err) {
      console.error(`Error submitting ${reactionType}:`, err);
      // Revert optimistic update on error
      setReactions(previousReactions);
      // setComments(previousComments); // Revert if needed
      // Optionally show an error message to the user
    }
  };

  // --- Submit Comment Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !newComment.trim() || newStars === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Use api.post, pass data in the second argument
      await api.post(`/api/restaurants/${restaurantId}/reviews/`, {
          comment: newComment,
          rating: newStars,
          // restaurant: restaurantId // Only include if backend serializer requires it
      });
      
      await fetchComments(); 
      setNewComment("");
      setNewStars(0);
    } catch (err) {
      console.error("Error submitting comment:", err);
      // Handle specific errors if needed, e.g., redirect on auth error
      if (err.message === 'Authentication required') {
         navigate('/login');
         setSubmitError('لطفا ابتدا وارد شوید');
      } else {
         setSubmitError(err.message || 'خطا در ثبت نظر');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Rendering Helpers ---
  const renderStars = (count, isInteractive = false) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star-add-comment ${index < (isInteractive ? newStars : count) ? "selected-add-comment" : ""}`}
        onClick={isInteractive ? () => setNewStars(index + 1) : undefined}
      >
        ★
      </span>
    ));
  };

  // --- Main Render --- 
  if (loading) {
    return <div className="comments-loading">در حال بارگذاری نظرات...</div>;
  }

  return (
    <div className="container-add-comment">
      {/* Tab button (only one, kept from user example) */} 
      <div className="tab-buttons-add-comment">
        <button className="tab-button-add-comment active-add-comment">Comments</button>
      </div>

      {fetchError && (
        <div className="error-message">
          Failed to load comments: {fetchError}
          <button onClick={fetchComments}>Try again</button>
        </div>
      )}

      {/* Render Comments List */} 
      <div className="comments-list-add-comment"> {/* Added a wrapper class */} 
        {(showAll ? comments : comments.slice(0, 3)).map((comment) => (
          <div className="card-add-comment" key={comment.id}>
            <div className="comment-header-add-comment">
              {/* Display username from comment data */} 
              <strong>{comment.user_details?.username || comment.user || 'User'}</strong> 
              <span className="date-add-comment">
                {comment.created_at ? new Date(comment.created_at).toLocaleDateString('fa-IR') : ''}
              </span>
            </div>
            <div className="stars-add-comment comment-stars-add-comment">
               {renderStars(comment.rating)}
            </div>
            <div className="comment-text-add-comment">{comment.comment}</div>
            <div className="comment-footer-add-comment">
              <button
                onClick={() => handleReaction(comment.id, 'like')}
                disabled={!isAuthenticated}
                className={`icon-button-add-comment ${
                  reactions[comment.id] === "like" ? "active-like-add-comment" : ""
                }`}
              >
                👍 {comment.likes ?? 0} {/* Use nullish coalescing */}
              </button>
              <button
                onClick={() => handleReaction(comment.id, 'dislike')}
                disabled={!isAuthenticated}
                className={`icon-button-add-comment ${
                  reactions[comment.id] === "dislike" ? "active-dislike-add-comment" : ""
                }`}
              >
                👎 {comment.dislikes ?? 0} {/* Use nullish coalescing */}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */} 
      {comments.length > 3 && (
        <button className="show-more-add-comment" onClick={() => setShowAll(!showAll)}>
          {showAll ? "نمایش کمتر" : "نمایش نظرات بیشتر"}
        </button>
      )}

      {/* Add Comment Form */} 
      <div className="card-add-comment">
        <h4>دیدگاه خود را بنویسید</h4>
        {!isAuthenticated && (
           <div className="auth-warning">
            لطفا برای ثبت نظر <button onClick={() => navigate('/login')}>وارد شوید</button> .
          </div>
        )}
        <form onSubmit={handleSubmit}>
           <div className="stars-add-comment selectable-add-comment">
             {renderStars(newStars, true)} 
          </div>
          <textarea
            className="comment-box-add-comment"
            placeholder="نظر خود را اینجا بنویسید..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            disabled={!isAuthenticated}
          />
           {submitError && <div className="error-message">{submitError}</div>}
          <button 
             type="submit" 
             className="submit-button-add-comment" 
             disabled={!isAuthenticated || !newComment.trim() || newStars === 0 || isSubmitting}
           >
            {isSubmitting ? 'در حال ثبت...' : 'ثبت نظر'}
          </button>
        </form>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default CommentsSection;
