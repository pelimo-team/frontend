import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantHeader from '../components/AddComment/RestaurantHeader';
import RestaurantInfo from '../components/AddComment/RestaurantInfo';
import CommentsSection from '../components/CommentSection/CommentsSection';

interface LocationState {
  restaurantId: number;
  restaurantName: string;
}

const AddCommentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const { restaurantId, restaurantName } = state || {};

  if (!restaurantId) {
    return <div>Error: Restaurant ID not provided</div>;
  }

  return (
    <div className="comments-page">
      <RestaurantHeader onBack={() => navigate(-1)} />
      <RestaurantInfo restaurantName={restaurantName} />
      <CommentsSection restaurantId={restaurantId} />
    </div>
  );
};

export default AddCommentPage;