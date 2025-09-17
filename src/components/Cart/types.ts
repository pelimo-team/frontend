export interface MenuItem {
  id: number;
  name: string;
  price: number;
  sale_price?: number;
  onsale?: boolean;
  image?: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  menu_item: MenuItem;
}

export interface Restaurant {
  id: number;
  name: string;
  logo?: string;
  delivery_cost: number;
}

export interface Cart {
  id: number;
  created_at: string;
  items: CartItem[];
  restaurant: Restaurant;
} 