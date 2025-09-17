import React from "react";
import Card from "./Card";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  delivery_cost: number;
  average_rating: number;
  cover_image?: string;
}

interface RestaurantListProps {
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedType: string;
  searchResults: Restaurant[];
  nightwalkerRestaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  loading,
  error,
  searchQuery,
  selectedType,
  searchResults,
  nightwalkerRestaurants,
}) => {
  if (loading) {
    return <div className="loading-indicator">Searching...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (searchQuery || selectedType) {
    return (
      <>
        <h2>Search Results</h2>
        <div className="nightwalker-slider">
          {searchResults.map((restaurant) => (
            <Card key={restaurant.id} restaurant={restaurant} />
          ))}
          {searchResults.length === 0 && (
            <div className="no-results">
              No restaurants found{" "}
              {searchQuery && `matching "${searchQuery}"`}
              {selectedType && ` in category "${selectedType}"`}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Nightwalker Restaurants</h2>
      <div className="nightwalker-slider">
        {nightwalkerRestaurants.map((restaurant) => (
          <Card key={restaurant.id} restaurant={restaurant} />
        ))}
        {nightwalkerRestaurants.length === 0 && (
          <div className="no-results">No restaurants available</div>
        )}
      </div>
    </>
  );
};

export default RestaurantList; 