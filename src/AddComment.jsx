import React, { useState } from "react";
import "./AddComment.css";

const initialComments = [
  {
    id: 1,
    name: "Ali",
    date: "2025-04-01",
    text: "Very good product. I liked it.",
    stars: 4,
    likes: 3,
    dislikes: 0,
  },
  {
    id: 2,
    name: "Sara",
    date: "2025-04-10",
    text: "It could be better.",
    stars: 3,
    likes: 1,
    dislikes: 2,
  },
  {
    id: 3,
    name: "mammad",
    date: "2025-04-15",
    text: "Amazing quality. Highly recommended!",
    stars: 5,
    likes: 5,
    dislikes: 0,
  },
  {
    id: 4,
    name: "dara",
    date: "2025-04-16",
    text: "Not bad at all.",
    stars: 3,
    likes: 2,
    dislikes: 1,
  }
];

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [showAll, setShowAll] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newStars, setNewStars] = useState(0);
  const [reactions, setReactions] = useState({});

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === id) {
          const isLiked = reactions[id] === "like-add-comment";
          const isDisliked = reactions[id] === "dislike-add-comment";

          return {
            ...comment,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
            dislikes: isDisliked ? comment.dislikes - 1 : comment.dislikes,
          };
        }
        return comment;
      })
    );

    setReactions((prev) => ({
      ...prev,
      [id]: reactions[id] === "like-add-comment" ? null : "like-add-comment",
    }));
  };

  const handleDislike = (id) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === id) {
          const isDisliked = reactions[id] === "dislike-add-comment";
          const isLiked = reactions[id] === "like-add-comment";

          return {
            ...comment,
            dislikes: isDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
            likes: isLiked ? comment.likes - 1 : comment.likes,
          };
        }
        return comment;
      })
    );

    setReactions((prev) => ({
      ...prev,
      [id]: reactions[id] === "dislike-add-comment" ? null : "dislike-add-comment",
    }));
  };

  const handleSubmit = () => {
    if (!newComment || newStars === 0) return;
    const newEntry = {
      id: comments.length + 1,
      name: "Current User",
      date: new Date().toISOString().split("T")[0],
      text: newComment,
      stars: newStars,
      likes: 0,
      dislikes: 0,
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
    setNewStars(0);
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star-add-comment ${index < count ? "selected-add-comment" : ""}`}
      >
        ★
      </span>
    ));
  };

  const handleStarSelect = (index) => {
    setNewStars(index + 1);
  };

  return (
    <div className="container-add-comment">
      <div className="tab-buttons-add-comment">
        <button className="tab-button-add-comment active-add-comment">Comments</button>
      </div>

      {(showAll ? comments : comments.slice(0, 3)).map((comment) => (
        <div className="card-add-comment" key={comment.id}>
          <div className="comment-header-add-comment">
            <strong>{comment.name}</strong>
            <span className="date-add-comment">{comment.date}</span>
          </div>
          <div className="stars-add-comment comment-stars-add-comment">{renderStars(comment.stars)}</div>
          <div className="comment-text-add-comment">{comment.text}</div>
          <div className="comment-footer-add-comment">
            <button
              onClick={() => handleLike(comment.id)}
              className={`icon-button-add-comment ${
                reactions[comment.id] === "like-add-comment" ? "active-like-add-comment" : ""
              }`}
            >
              👍 {comment.likes}
            </button>
            <button
              onClick={() => handleDislike(comment.id)}
              className={`icon-button-add-comment ${
                reactions[comment.id] === "dislike-add-comment" ? "active-dislike-add-comment" : ""
              }`}
            >
              👎 {comment.dislikes}
            </button>
          </div>
        </div>
      ))}

      {comments.length > 3 && (
        <button className="show-more-add-comment" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less comments" : "Show more comments"}
        </button>
      )}

      <div className="card-add-comment">
        <h4>Leave a comment</h4>
        <div className="stars-add-comment selectable-add-comment">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star-add-comment ${index < newStars ? "selected-add-comment" : ""}`}
              onClick={() => handleStarSelect(index)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="comment-box-add-comment"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="submit-button-add-comment" onClick={handleSubmit}>
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
