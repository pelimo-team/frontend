export type RestaurantType = 
  | 'restaurant'
  | 'fast food'
  | 'coffee shop'
  | 'juice and ice cream'
  | 'confectionary'
  | 'fruit';

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  coverImage: string;
  logo: string;
  restaurantType: RestaurantType;
  deliveryCost: number;
  isNightWalker: boolean;
}