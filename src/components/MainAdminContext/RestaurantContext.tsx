import React, { createContext, useContext, useState, useEffect } from 'react';
import { Restaurant } from '../Main-Admin/types';

interface RestaurantContextType {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void;
  updateRestaurant: (id: string, restaurant: Omit<Restaurant, 'id'>) => void;
  deleteRestaurant: (id: string) => void;
  getRestaurant: (id: string) => Restaurant | undefined;
}

const RestaurantContext = createContext<RestaurantContextType>({
  restaurants: [],
  addRestaurant: () => {},
  updateRestaurant: () => {},
  deleteRestaurant: () => {},
  getRestaurant: () => undefined
});

export const useRestaurants = () => useContext(RestaurantContext);

// Sample data for initial state
const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    city: 'Rome',
    coverImage: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg',
    logo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    restaurantType: 'restaurant',
    deliveryCost: 5.99,
    isNightWalker: true
  },
  {
    id: '2',
    name: 'Quick Bites',
    city: 'New York',
    coverImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    logo: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg',
    restaurantType: 'fast food',
    deliveryCost: 3.99,
    isNightWalker: false
  },
  {
    id: '3',
    name: 'Sweet Dreams',
    city: 'Paris',
    coverImage: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
    logo: 'https://images.pexels.com/photos/3023476/pexels-photo-3023476.jpeg',
    restaurantType: 'confectionary',
    deliveryCost: 4.50,
    isNightWalker: true
  }
];

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants) {
      setRestaurants(JSON.parse(storedRestaurants));
    } else {
      // Use sample data if nothing in localStorage
      setRestaurants(sampleRestaurants);
      localStorage.setItem('restaurants', JSON.stringify(sampleRestaurants));
    }
  }, []);

  // Save to localStorage whenever restaurants change
  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  const addRestaurant = (restaurant: Omit<Restaurant, 'id'>) => {
    const newRestaurant: Restaurant = {
      ...restaurant,
      id: Date.now().toString()
    };
    setRestaurants(prev => [...prev, newRestaurant]);
  };

  const updateRestaurant = (id: string, restaurant: Omit<Restaurant, 'id'>) => {
    setRestaurants(prev => 
      prev.map(item => (item.id === id ? { ...restaurant, id } : item))
    );
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
  };

  const getRestaurant = (id: string) => {
    return restaurants.find(restaurant => restaurant.id === id);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
        getRestaurant
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};