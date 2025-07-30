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
  const [userVotes, setUserVotes] = useState<Record<string, "like" | "dislike" | null>>({});

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
                user: "unknown user",
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
        setError("error in fetching restaurant review");
      });
  }, [id]);
  

  const handleLike = async (reviewId: string) => {
    if (!restaurantId) return;

    const currentVote = userVotes[reviewId];
    if (currentVote === "like") {
      // اگر قبلاً لایک داده بود، می‌تونید اینجا لغو لایک انجام بدید یا کاری نکنید
      return;
    }

    try {
      await api.post(`/api/restaurants/${restaurantId}/reviews/${reviewId}/like/`, {});

      setReviews((prev) =>
        prev.map((r) => {
          if (r.id !== reviewId) return r;

          let likes = r.likes;
          let dislikes = r.dislikes;

          if (currentVote === "dislike") {
            // اگر قبلاً دیسلایک زده بود، دیسلایک کم شود و لایک زیاد شود
            dislikes = Math.max(dislikes - 1, 0);
            likes = likes + 1;
          } else if (currentVote == null) {
            // اگر قبلاً رای نداشت، فقط لایک زیاد شود
            likes = likes + 1;
          }

          return { ...r, likes, dislikes };
        })
      );

      // به روز رسانی وضعیت رای کاربر
      setUserVotes((prev) => ({ ...prev, [reviewId]: "like" }));
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislike = async (reviewId: string) => {
    if (!restaurantId) return;

    const currentVote = userVotes[reviewId];
    if (currentVote === "dislike") {
      // اگر قبلاً دیسلایک داده بود، می‌تونید لغوش کنید یا کاری نکنید
      return;
    }

    try {
      await api.post(`/api/restaurants/${restaurantId}/reviews/${reviewId}/dislike/`, {});

      setReviews((prev) =>
        prev.map((r) => {
          if (r.id !== reviewId) return r;

          let likes = r.likes;
          let dislikes = r.dislikes;

          if (currentVote === "like") {
            // اگر قبلاً لایک زده بود، لایک کم شود و دیسلایک زیاد شود
            likes = Math.max(likes - 1, 0);
            dislikes = dislikes + 1;
          } else if (currentVote == null) {
            // اگر قبلاً رای نداشت، فقط دیسلایک زیاد شود
            dislikes = dislikes + 1;
          }

          return { ...r, likes, dislikes };
        })
      );

      setUserVotes((prev) => ({ ...prev, [reviewId]: "dislike" }));
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
      alert("error in adding comment");
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
          restaurantId={restaurantId!}
          onLike={handleLike}
          onDislike={handleDislike}
          onAddReply={handleAddReply}
          voted={userVotes[review.id] ?? null}  // ← اضافه شد
        />
      ))}

      <AddReview onAddReview={handleAddReview} />
    </div>
  );
};

export default ReviewSection;
