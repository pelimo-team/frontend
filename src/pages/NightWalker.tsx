import React, { useState, useEffect } from "react";
import "../styles/NightWalker.css";
import axios from "axios";
import ErrorBoundary from "../components/NightWalker/ErrorBoundary";
import HeroSection from "../components/NightWalker/HeroSection";
import CategoryBar from "../components/NightWalker/CategoryBar";
import RestaurantList from "../components/NightWalker/RestaurantList";
import Footer from "../components/NightWalker/Footer";

// Configure axios defaults
axios.defaults.baseURL = "http://localhost:8000";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  delivery_cost: number;
  average_rating: number;
  cover_image?: string;
}

interface RestaurantType {
  id: number;
  name: string;
  icon?: string;
}

const NightWalker: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [restaurantTypes, setRestaurantTypes] = useState<RestaurantType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [nightwalkerRestaurants, setNightwalkerRestaurants] = useState<
    Restaurant[]
  >([]);

  // Fetch restaurant types and initial restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch restaurant types
        const typesResponse = await axios.get<RestaurantType[]>(
          "/api/restaurant-types/"
        );
        setRestaurantTypes(typesResponse.data || []);

        // Fetch initial restaurants
        const restaurantsResponse = await axios.get<{ results: Restaurant[] }>(
          "/api/restaurants/nightwalkers/search/"
        );
        setNightwalkerRestaurants(restaurantsResponse.data?.results || []);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load initial data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim() && !selectedType) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (searchQuery.trim()) {
        params.append("query", searchQuery);
      }
      if (selectedType) {
        params.append("type", selectedType);
      }

      const response = await axios.get<{ results: Restaurant[] }>(
        `/api/restaurants/nightwalkers/search/?${params.toString()}`
      );
      setSearchResults(response.data?.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search restaurants. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type === selectedType ? "" : type);
    handleSearch();
  };

  if (loading && !searchResults.length && !nightwalkerRestaurants.length) {
    return <div className="loading-indicator">Loading...</div>;
  }

  if (error && !searchResults.length && !nightwalkerRestaurants.length) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="nightwalker-container">
      <div className="background-container">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt="moon" />
        <div className="stars"></div>
        <div className="twinkling"></div>
       
      </div>

      <HeroSection
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <CategoryBar
        restaurantTypes={restaurantTypes}
        selectedType={selectedType}
        onTypeClick={handleTypeClick}
      />

      <main className="nightwalker-slider-section">
        <RestaurantList
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          selectedType={selectedType}
          searchResults={searchResults}
          nightwalkerRestaurants={nightwalkerRestaurants}
        />
      </main>

      <Footer />

    </div>
  );
};

const NightWalkerWithErrorBoundary = () => (
  <ErrorBoundary>
    <NightWalker />
  </ErrorBoundary>
);

export default NightWalkerWithErrorBoundary;
