import { ReactNode } from "react";

export interface MenuItem {
  id: number; // بهتره عدد باشه، ولی string هم پشتیبانی میشه
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
  comment: ReactNode;
  created_at: string | number | Date;
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
  cover_image: string;
  description: string;
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  logo: string;
  city: number;
}
