export interface Food {
 
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;

  reviews: Review[];
 
}

export interface Review {
  id: string;
  userId: string;
  user: string;
  userAvatar: string;
  rating: number;
  comment: string;
  created_at: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  user: string;
  userAvatar: string;
  comment: string;
  date: string;
}
