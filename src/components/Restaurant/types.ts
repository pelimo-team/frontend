export interface MenuItem {
  id: number | string; // بهتره عدد باشه، ولی string هم پشتیبانی میشه
  name: string;
  description?: string;
  price: number;
  image?: string;
  rate?: number;
  availability?: boolean;
  bestseller?: boolean;
  onsale?: boolean;
  quantity?: number;
}

export interface Comment {
  id: number;
  user: string;
  date: string;
  rating: number;
  text: string;
}

export interface Cart {
  [itemId: string]: number;
}

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  logo: string;
}
