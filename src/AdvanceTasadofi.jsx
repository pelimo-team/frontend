<<<<<<< Updated upstream
import React, { useState } from "react";
import "./AdvanceTasadofi.css";

const categories = [
  { id: "fastfood", label: "Fast food", image: "/burgur.png", color: "#FF5733" },
  { id: "restaurant", label: "Restaurant", image: "/resturan.png", color: "#C70039" },
  { id: "coffee", label: "Coffee shop", image: "/coffee.png", color: "#6C3483" },
  { id: "fruit", label: "Fruit", image: "/fruit.png", color: "#239B56" },
  { id: "juice", label: "Juice & Ice cream", image: "/ice-cream.png", color: "#F39C12" },
  { id: "candy", label: "Confectionary", image: "/candyy.png", color: "#2874A6" },
];

const restaurants = [
  { name: "Down Town Burger", location: "Tehran", image: "/downtwon.png", rating: 4.5 },
  { name: "Pizza Hot", location: "Shiraz", image: "/pizahot.png", rating: 4.2 },
  { name: "Burger Land", location: "Mashhad", image: "/land.png", rating: 4.7 },
  { name: "Night Pizza", location: "Tehran", image: "/نایت.png", rating: 4.5 },
  { name: "Crispy Land", location: "Tehran", image: "/cripsy.png", rating: 4.2 },
  { name: "Chicken Family", location: "Mashhad", image: "/1400-chickenfamily.png", rating: 4.7 },
];

const games = [
  { name: "Memory Match", location: "Online", image: "/game1.jpg", rating: 4.8 },
  { name: "Trivia Challenge", location: "Online", image: "/game2.jpg", rating: 4.6 },
  { name: "Emoji Puzzle", location: "Online", image: "/game3.jpg", rating: 4.9 },
];

const AdvanceTasadofi = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleStart = () => {
    alert("Start the adventure with category: " + (selectedCategory || "None"));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    return (
      <div className="tasadofi-stars">
        {Array(fullStars).fill("⭐").join("")} {halfStar ? "⭐" : ""}
      </div>
    );
  };

  const renderCard = (item) => (
    <div className="tasadofi-card tasadofi-hoverable" key={item.name}>
      <img src={item.image} alt={item.name} />
      <div className="tasadofi-res-name">{item.name}</div>
      <div className="tasadofi-res-location">📍 {item.location}</div>
      {renderStars(item.rating)}
    </div>
  );

  return (
    <div className="tasadofi-wrapper">
      {/* Header */}
      {/* <div className="tasadofi-header">
        <img src="/gg_profile.png" alt="User" className="tasadofi-icon tasadofi-icon-left" />
        <div className="/Group 13 (1)">Pelimo</div>
        <img src="/material-symbols_menu-rounded.png" alt="Menu" className="tasadofi-icon tasadofi-icon-right" />
      </div> */}
     

      {/* Background + Adventure Button */}
      <div className="tasadofi-background">
      <header className="tasadofi-header">
      <button className="tasadofi-profile">
          <img src="/gg_profile.png" alt="profile" />
        </button>
        <img src="./Group 13 (1).png" alt="logo" />

        <button className="tasadofi-menu">
            < img src="/material-symbols_menu-rounded.png" alt="menu" />
        </button>
      </header>
        <div className="tasadofi-emoji">🤔</div>
        <button className="tasadofi-start-button" onClick={handleStart}>
          Start the adventure
        </button>
      </div>

      {/* Category Selector */}
      <div className="tasadofi-category-selector">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`tasadofi-category-item ${selectedCategory === cat.id ? "tasadofi-selected" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <img src={cat.image} alt={cat.label} className="tasadofi-icon-img" />
            <div className="tasadofi-label" style={{ color: cat.color }}>{cat.label}</div>
          </div>
        ))}
      </div>

      {/* Restaurants */}
      <div className="tasadofi-section">
        <h2 className="tasadofi-section-title">The Best Restaurants</h2>
        <div className="tasadofi-slider-container">
          {restaurants.map(renderCard)}
        </div>
      </div>

      {/* Games */}
      <div className="tasadofi-section">
        <h2 className="tasadofi-section-title">Games & Entertainment</h2>
        <div className="tasadofi-slider-container">
          {games.map(renderCard)}
        </div>
=======
import React, { useState } from 'react';
import axios from 'axios';
import './AdvanceTasadofi.css';

const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;
  
  console.log('Restaurant data:', restaurant); // Debug log
  
  return (
    <div className="tasadofi-card">
      <img 
        src={restaurant.cover_image || '/restaurant-placeholder.png'} 
        alt={restaurant.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/restaurant-placeholder.png';
        }}
      />
      <div className="tasadofi-name">{restaurant.name}</div>
      <div className="tasadofi-location">📍 {restaurant.city?.name || 'Unknown Location'}</div>
      <div className="tasadofi-stars">
        {'⭐'.repeat(Math.round(restaurant.average_rating || 0))}
      </div>
    </div>
  );
};

const AdvanceTasadofi = () => {
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = async () => {
    try {
      setLoading(true);
      setError(null);
      setRandomRestaurant(null); // Clear previous result
      
      console.log('Fetching random restaurant...'); // Debug log
      const response = await axios.get('http://localhost:8000/api/restaurants/random/');
      console.log('API Response:', response.data); // Debug log
      
      if (response.data) {
        setRandomRestaurant(response.data);
      } else {
        setError('No restaurant data received');
      }
    } catch (err) {
      console.error('Error fetching random restaurant:', err.response || err);
      setError(
        err.response?.data?.error || 
        'Failed to get a random restaurant. Please try again!'
      );
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
          {loading ? 'Finding your adventure...' : 'Start the adventure'}
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {randomRestaurant && (
          <div className="tasadofi-result">
            <h2>Here's your random pick!</h2>
            <RestaurantCard restaurant={randomRestaurant} />
          </div>
        )}
>>>>>>> Stashed changes
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
