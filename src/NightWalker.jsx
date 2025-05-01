import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NightWalker.css';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000';

const Card = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="nightwalker-card" onClick={handleClick}>
      <div className="nightwalker-image">
        <img 
          src={restaurant.cover_image || '/restaurant-placeholder.png'} 
          alt={restaurant.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/restaurant-placeholder.png';
          }}
        />
      </div>
      <div className="nightwalker-info">
        <p><strong>{restaurant.name}</strong></p>
        <p>{restaurant.description}</p>
        <p>Delivery Cost: {restaurant.delivery_cost} تومان</p>
        <div className="nightwalker-stars">
          {'⭐'.repeat(Math.round(restaurant.average_rating || 0))}
        </div>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error caught by boundary:', error);
      setError(error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>{error?.message || 'Unknown error occurred'}</p>
      </div>
    );
  }

  return children;
};

const NightWalker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantTypes, setRestaurantTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [nightwalkerRestaurants, setNightwalkerRestaurants] = useState([]);

  // Fetch restaurant types and initial restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch restaurant types
        const typesResponse = await axios.get('/api/restaurant-types/');
        setRestaurantTypes(typesResponse.data || []);

        // Fetch initial restaurants
        const restaurantsResponse = await axios.get('/api/restaurants/nightwalkers/search/');
        setNightwalkerRestaurants(restaurantsResponse.data?.results || []);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError(err.message || 'Failed to load initial data');
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
        params.append('query', searchQuery);
      }
      if (selectedType) {
        params.append('type', selectedType);
      }

      const response = await axios.get(`/api/restaurants/nightwalkers/search/?${params.toString()}`);
      setSearchResults(response.data?.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search restaurants. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? '' : type);
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
      <section className="nightwalker-hero-section">
        <header className="nightwalker-hero-header">
          <div className="nightwalker-profile-icon">
            <img src='/profile.png' alt='profile' style={{width:"50px", marginBottom:"30px"}}/>
          </div>
          <div className="nightwalker-logo">
            <img src='/white-logo.png' alt='logo' style={{width:"4cm", marginLeft:"20px"}}/>
          </div>
          <div className="nightwalker-menu-icon">
            <img src='/menubar.png' alt='menu' style={{width:"50px", marginBottom:"30px"}}/>
          </div>
        </header>

        <div className="nightwalker-centered-content">
          <div className="nightwalker-search-box">
            <img src='/magnifying-glass-solid.svg' alt='search' style={{width:"20px"}}
                 className='nightwalker-search-icon'/>
            <input 
              className="nightwalker-search-input" 
              type="text" 
              placeholder="Search restaurants..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="nightwalker-search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="nightwalker-category-bar-wrapper">
        <div className="nightwalker-category-bar">
          {Array.isArray(restaurantTypes) && restaurantTypes.map((type) => (
            <button 
              key={type.id} 
              className={`nightwalker-category-button ${selectedType === type.name ? 'active' : ''}`}
              onClick={() => handleTypeClick(type.name)}
            >
              {type.icon && <img src={type.icon} alt={type.name} className="category-icon" />}
              <br />
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <main className="nightwalker-slider-section">
        {loading ? (
          <div className="loading-indicator">Searching...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : searchQuery || selectedType ? (
          <>
            <h2>Search Results</h2>
            <div className="nightwalker-slider">
              {searchResults.map((restaurant) => (
                <Card key={restaurant.id} restaurant={restaurant} />
              ))}
              {searchResults.length === 0 && (
                <div className="no-results">
                  No restaurants found {searchQuery && `matching "${searchQuery}"`}
                  {selectedType && ` in category "${selectedType}"`}
                </div>
              )}
            </div>
          </>
        ) : (
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
        )}
      </main>

      <footer className="nightwalker-footer">
        <p>Contact: example@email.com</p>
        <p>Phone: +98 912 345 6789</p>
        <p>Address: Tehran, Iran</p>
      </footer>
    </div>
  );
};

const NightWalkerWithErrorBoundary = () => (
  <ErrorBoundary>
    <NightWalker />
  </ErrorBoundary>
);

export default NightWalkerWithErrorBoundary;
