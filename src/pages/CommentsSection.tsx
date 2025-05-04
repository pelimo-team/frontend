import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CommentsSection.css";
import { api } from "../utils/api";
import CommentList from "../components/CommentsSection/CommentList";
import CommentForm from "../components/CommentsSection/CommentForm";

interface Comment {
  id: number;
  user_details?: {
    username: string;
  };
  user?: string;
  created_at: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
}

interface CommentsSectionProps {
  restaurantId: number;
}

type ReactionType = "like" | "dislike" | null;

const CommentsSection: React.FC<CommentsSectionProps> = ({ restaurantId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reactions, setReactions] = useState<Record<number, ReactionType>>({});
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
    fetchComments();
  }, [restaurantId]);

  const checkAuthStatus = async () => {
    try {
      await api.get("/api/accounts/user/");
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Auth check failed:", (err as Error).message);
      setIsAuthenticated(false);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await api.get(`/api/restaurants/${restaurantId}/reviews/`);
      setComments(
        Array.isArray(data.results)
          ? data.results
          : Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error("Error in fetchComments:", err);
      setFetchError((err as Error).message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (
    commentId: number,
    reactionType: "like" | "dislike"
  ) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const currentReaction = reactions[commentId];
    const endpoint = `/api/restaurants/${restaurantId}/reviews/${commentId}/${reactionType}/`;

    const previousReactions = { ...reactions };
    setReactions((prev) => ({
      ...prev,
      [commentId]: prev[commentId] === reactionType ? null : reactionType,
    }));

    try {
      const data = await api.post(endpoint, {});

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: data.likes, dislikes: data.dislikes }
            : comment
        )
      );
      setReactions((prev) => ({
        ...prev,
        [commentId]: data.status.includes("removed") ? null : reactionType,
      }));
    } catch (err) {
      console.error(`Error submitting ${reactionType}:`, err);
      setReactions(previousReactions);
    }
  };

  const handleSubmitComment = async (comment: string, rating: number) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await api.post(`/api/restaurants/${restaurantId}/reviews/`, {
        comment,
        rating,
      });

      await fetchComments();
    } catch (err) {
      console.error("Error submitting comment:", err);
      if ((err as Error).message === "Authentication required") {
        navigate("/login");
        setSubmitError("لطفا ابتدا وارد شوید");
      } else {
        setSubmitError((err as Error).message || "خطا در ثبت نظر");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="comments-loading">در حال بارگذاری نظرات...</div>;
  }

  return (
    <div className="container-add-comment">
      <div className="tab-buttons-add-comment">
        <button className="tab-button-add-comment active-add-comment">
          Comments
        </button>
      </div>

      {fetchError && (
        <div className="error-message">
          Failed to load comments: {fetchError}
          <button onClick={fetchComments}>Try again</button>
        </div>
      )}

      <CommentList
        comments={comments}
        isAuthenticated={isAuthenticated}
        reactions={reactions}
        onReaction={handleReaction}
      />

      <CommentForm
        isAuthenticated={isAuthenticated}
        onSubmit={handleSubmitComment}
        onLoginClick={() => navigate("/login")}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
};

export default CommentsSection;
