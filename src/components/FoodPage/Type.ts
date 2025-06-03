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
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  comment: string;
  date: string;
}
