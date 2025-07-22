import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import AddReview from "./AddReview";
import { Review } from "./Type";
import { api } from "../../utils/api"; 


const ReviewSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    if (!id) return;
    api
      .get(`/api/items/${id}/reviews/`)
      .then((res) => {
        // اگه از DRF استفاده می‌کنی، داده‌ها در res.results هستند
        setReviews(res.results || []);
      })
      .catch(() => {
        setError("خطا در دریافت نظرات");
      });
  }, [id]);

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleDislike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, dislikes: r.dislikes + 1 } : r
      )
    );
  };

  const handleAddReply = (reviewId: string, replyText: string) => {
    const newReply = {
      id: `reply-${Date.now()}`,
      userId: "currentUser",
      userName: "You",
      userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
      comment: replyText,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, replies: [...r.replies, newReply] } : r
      )
    );
  };

  const handleAddReview = async (
    rating: number,
    comment: string
  ): Promise<void> => {
    if (!id) return;

    try {
      const newReview = await api.post(`/api/items/${id}/reviews/`, {
        rating,
        comment,
      });
      setReviews((prev) => [newReview, ...prev]);
    } catch {
      alert("adding comment faild");
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="review-section">
      <div className="review-summary">
        <h2>Reviews</h2>
        <div>
          <strong>{averageRating.toFixed(1)} / 5</strong> ({reviews.length}{" "}
          reviews)
        </div>
      </div>

      {error && <p>{error}</p>}

      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onLike={handleLike}
          onDislike={handleDislike}
          onAddReply={handleAddReply}
        />
      ))}

      <AddReview onAddReview={handleAddReview} />
    </div>
  );
};

export default ReviewSection;
