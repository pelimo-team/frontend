export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
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