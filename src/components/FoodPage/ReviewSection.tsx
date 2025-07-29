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
  const [restaurantId, setRestaurantId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
  
    api
      .get(`/api/items/${id}/`)
      .then((res) => {
        const restId = res.restaurant.id;
        setRestaurantId(restId);
        return api.get(`/api/restaurants/${restId}/reviews/`);
      })
      .then((res) => {
        console.log("Reviews from API:", res.results);
  
        // 🟢 تبدیل replies به آرایه‌ای از آبجکت‌ها
        const structuredReviews = (res.results || []).map((review: any) => ({
          ...review,
          replies: Array.isArray(review.replies)
            ? review.replies.map((replyText: string, index: number) => ({
                id: `reply-${review.id}-${index}`,
                userId: "anonymous",
                user: "کاربر ناشناس",
                userAvatar: "https://randomuser.me/api/portraits/lego/1.jpg",
                comment: replyText,
                date: new Date().toISOString(),
              }))
            : [],
        }));
  
        setReviews(structuredReviews);
      })
      .catch((err) => {
        console.error(err);
        setError("خطا در دریافت نظرات رستوران");
      });
  }, [id]);
  

  const handleLike = async (reviewId: string) => {
    if (!restaurantId) return;

    try {
      await api.post(
        `/api/restaurants/${restaurantId}/reviews/${reviewId}/like/`,
        {}
      );
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
      );
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislike = async (reviewId: string) => {
    if (!restaurantId) return;

    try {
      await api.post(
        `/api/restaurants/${restaurantId}/reviews/${reviewId}/dislike/`,
        {}
      );
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, dislikes: r.dislikes + 1 } : r
        )
      );
    } catch (error) {
      console.error("Error disliking review:", error);
    }
  };

  const handleAddReply = async (reviewId: string, replyText: string) => {
    if (!restaurantId) return;
  
    try {
      const res = await api.patch(
        `/api/restaurants/${restaurantId}/reviews/${reviewId}/reply/`,
        { reply: replyText }
      );
  
      const newReply = res.reply || {
        id: `reply-${Date.now()}-${Math.random()}`, // ← یکتا تر شده
        userId: "currentUser",
        userName: "You",
        userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
        comment: replyText,
        date: new Date().toISOString(),
      };
  
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, replies: [...(r.replies || []), newReply] }
            : r
        )
      );
    } catch (error) {
      console.error("Error replying to review:", error);
    }
  };
  

  const handleAddReview = async (
    rating: number,
    comment: string
  ): Promise<void> => {
    if (!id) return;

    try {
      // ابتدا رستوران آن آیتم را پیدا کن
      const item = await api.get(`/api/items/${id}/`);
      const restaurantId = item.restaurant.id;

      // سپس ریویو جدید را به آن رستوران اضافه کن
      const newReview = await api.post(
        `/api/restaurants/${restaurantId}/reviews/`,
        {
          rating,
          comment,
        }
      );

      setReviews((prev) => [newReview, ...prev]);
    } catch {
      alert("خطا در افزودن نظر");
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
          restaurantId={restaurantId!} // ← چون فقط بعد از دریافت تعریف شده
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
