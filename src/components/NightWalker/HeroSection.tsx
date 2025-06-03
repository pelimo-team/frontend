
import { AuthContext } from "../../pages/AuthContext";
import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface HeroSectionProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext); //
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <section className="nightwalker-hero-section">
      
      <header className="nightwalker-hero-header">
      <div className="night-header-left">
        {isLoggedIn ? (
          <>
            <div className="night-profile-button" ref={dropdownRef}>
              <button
                className="night-home-profile"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
  
              </button>
              {showDropdown && (
                <div
                  className="night-profile-dropdown-content"
                  style={{ display: showDropdown ? "block" : "none" }}
                >
                  <a
                    className="night-first-line"
                    onClick={() => navigate("/userprofile")}
                  >
                    profile
                  </a>
                  <a
                    className="night-secend-line"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    logout
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <a href="/login" className="night-login-link">
              Login
            </a>
            <span> | </span>
            <a href="/signup" className="night-signup-link">
              Sign up
            </a>
          </>
        )}
      </div>
      <div className="night-header-logo">
        <img src="Logo_white.png" alt="PELIMO" />
      </div>
      </header>

      <div className="nightwalker-centered-content">
        <div className="nightwalker-search-box">
          <img
            src="/magnifying-glass-solid.svg"
            alt="search"
            style={{ width: "20px" }}
            className="nightwalker-search-icon"
          />
          <input
            className="nightwalker-search-input"
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
          <button className="nightwalker-search-button" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 