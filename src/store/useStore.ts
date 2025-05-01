import { create } from 'zustand';
import { endpoints } from '../services/api';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface StoreState {
  foodItems: FoodItem[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchFoodItems: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addFoodItem: (item: Omit<FoodItem, 'id'>) => Promise<void>;
  updateFoodItem: (id: string, item: Partial<FoodItem>) => Promise<void>;
  deleteFoodItem: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  foodItems: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchFoodItems: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await endpoints.getFoodItems();
      set({ foodItems: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch food items', isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await endpoints.getCategories();
      set({ categories: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch categories', isLoading: false });
    }
  },

  addFoodItem: async (item) => {
    try {
      set({ isLoading: true, error: null });
      const response = await endpoints.createFoodItem(item);
      set((state) => ({
        foodItems: [...state.foodItems, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add food item', isLoading: false });
    }
  },

  updateFoodItem: async (id, item) => {
    try {
      set({ isLoading: true, error: null });
      const response = await endpoints.updateFoodItem(id, item);
      set((state) => ({
        foodItems: state.foodItems.map((foodItem) =>
          foodItem.id === id ? response.data : foodItem
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update food item', isLoading: false });
    }
  },

  deleteFoodItem: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await endpoints.deleteFoodItem(id);
      set((state) => ({
        foodItems: state.foodItems.filter((item) => item.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete food item', isLoading: false });
    }
  },

  addCategory: async (category) => {
    try {
      set({ isLoading: true, error: null });
      const response = await endpoints.createCategory(category);
      set((state) => ({
        categories: [...state.categories, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add category', isLoading: false });
    }
  },

  updateCategory: async (id, category) => {
    try {
      set({ isLoading: true, error: null });
      const response = await endpoints.updateCategory(id, category);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? response.data : cat
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update category', isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await endpoints.deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete category', isLoading: false });
    }
  },
})); 