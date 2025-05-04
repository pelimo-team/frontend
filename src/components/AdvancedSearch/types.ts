export interface Restaurant {
  id: number;
  name: string;
  image: string | null;
  rating: number | null;
  reviews_count: number;
  delivery_cost: number;
}

export interface MenuItem {
  id: number;
  name: string;
  image: string | null;
  bestseller: boolean;
  restaurant?: {
    id: number;
    name: string;
  };
  category_name?: string;
  rate: number | null;
  onsale: boolean;
  price: number;
  sale_price?: number;
}

export const categories = [
  "همه",
  "رستوران",
  "فست فود",
  "کافی شاپ",
  "آبمیوه سنتی",
  "شیرینی",
  "میوه",
] as const;

export const allFilters = [
  "طبع سرد",
  "طبع گرم",
  "دارای تخفیف",
  "خوش قیمت‌ترین",
  "موجود",
  "پرفروش‌ترین",
  "گران‌ترین",
  "ارزان‌ترین",
  "دارای عکس",
] as const;

export type FilterType = (typeof allFilters)[number];
export type CategoryType = (typeof categories)[number]; 