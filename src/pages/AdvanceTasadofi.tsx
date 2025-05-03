import React, { useState } from "react";
import axios from "axios";
import "../AdvanceTasadofi.css";

interface Restaurant {
  name: string;
  cover_image?: string;
  city?: {
    name: string;
  };
  average_rating?: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant | null;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  if (!restaurant) return null;

  console.log("Restaurant data:", restaurant); // Debug log

  return (
    <div className="tasadofi-card">
      <img
        src={restaurant.cover_image || "/restaurant-placeholder.png"}
        alt={restaurant.name}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/restaurant-placeholder.png";
        }}
      />
      <div className="tasadofi-name">{restaurant.name}</div>
      <div className="tasadofi-location">
        📍 {restaurant.city?.name || "Unknown Location"}
      </div>
      <div className="tasadofi-stars">
        {"⭐".repeat(Math.round(restaurant.average_rating || 0))}
      </div>
    </div>
  );
};

const AdvanceTasadofi: React.FC = () => {
  const [randomRestaurant, setRandomRestaurant] = useState<Restaurant | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    try {
      setLoading(true);
      setError(null);
      setRandomRestaurant(null); // Clear previous result

      console.log("Fetching random restaurant..."); // Debug log
      const response = await axios.get<Restaurant>(
        "http://localhost:8000/api/restaurants/random/"
      );
      console.log("API Response:", response.data); // Debug log

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
    <div className="tasadofi-wrapper">
      {/* Background + Adventure Button */}
      <div className="tasadofi-background">
        <header className="tasadofi-header">
          <button className="tasadofi-profile">
            <img src="/gg_profile.png" alt="profile" />
          </button>
          <img src="/Group 13 (1).png" alt="logo" />
          <button className="tasadofi-menu">
            <img src="/material-symbols_menu-rounded.png" alt="menu" />
          </button>
        </header>
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

      {/* Footer */}
      <footer className="tasadofi-footer">
        <div className="tasadofi-footer-column">
          <h4>Information</h4>
          <ul>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="tasadofi-footer-column">
          <h4>Navigation</h4>
          <ul>
            <li>Home</li>
            <li>Explore</li>
            <li>Categories</li>
          </ul>
        </div>
        <div className="tasadofi-footer-column">
          <h4>Contact Us</h4>
          <ul>
            <li>Email: contact@example.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: Tehran, Iran</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default AdvanceTasadofi;
