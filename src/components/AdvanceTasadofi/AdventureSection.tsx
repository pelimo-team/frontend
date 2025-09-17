import React, { useState } from "react";
import axios from "axios";
import RestaurantCard from "./RestaurantCard";

interface Restaurant {
  name: string;
  cover_image?: string;
  city?: {
    name: string;
  };
  average_rating?: number;
}

const AdventureSection: React.FC = () => {
  const [randomRestaurant, setRandomRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    try {
      setLoading(true);
      setError(null);
      setRandomRestaurant(null);

      console.log("Fetching random restaurant...");
      const response = await axios.get<Restaurant>(
        "http://localhost:8000/api/restaurants/random/"
      );
      console.log("API Response:", response.data);

      if (response.data) {
        setRandomRestaurant(response.data);
      } else {
        setError("No restaurant data received");
      }
    } catch (err: unknown) {
      console.error("Error fetching random restaurant:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to get a random restaurant. Please try again!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tasadofi-background">
      <div className="tasadofi-emoji">🤔</div>
      <button
        className="tasadofi-start-button"
        onClick={handleStart}
        disabled={loading}
      >
        {loading ? "Finding your adventure..." : "Start the adventure"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {randomRestaurant && (
        <div className="tasadofi-result">
          <h2>Here's your random pick!</h2>
          <RestaurantCard restaurant={randomRestaurant} />
        </div>
      )}
    </div>
  );
};

export default AdventureSection; 