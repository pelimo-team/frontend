export interface Restaurant {
  id: number;
  name: string;
  cover_image: string | null;
  average_rating: number | null;
  reviews_count: number;
  delivery_cost: number;
  discription:string;
  city: number
}

export interface MenuItem {
  id: number;
  name: string;
  image: string | null;
  description?: string;
  bestseller: boolean;
  restaurant?: {
    id: number;
    name: string;
    logo?: string;
    rating?: number;
    city?: string;
    reviews?: any[];
  };
  category_name?: string;
  rate: number | null;
  onsale: boolean;
  price: number;
  sale_price?: number;
}

export const categories = [
  "All",
  "Restaurant",
  "Fast Food",
  "Coffee Shop",
  "Juice and Ice cream",
  "Confectionary",
  "Fruits",
] as const;

export const allFilters = [
  "Cold-tempered",
  "Warm-tempered",
  "Discounted",
  "Most affordable",
  "Available",
  "Best Seller",
  "Most Expensive",
  "Cheapest",
  
] as const;

export type FilterType = (typeof allFilters)[number];
export type CategoryType = (typeof categories)[number]; 