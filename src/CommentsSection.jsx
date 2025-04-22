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
    </div>
  );
};

export default CommentsSection;
