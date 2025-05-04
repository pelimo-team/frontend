import React from "react";

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
  return (
    <section className="nightwalker-hero-section">
      <header className="nightwalker-hero-header">
        <div className="nightwalker-profile-icon">
          <img
            src="/profile.png"
            alt="profile"
            style={{ width: "50px", marginBottom: "30px" }}
          />
        </div>
        <div className="nightwalker-logo">
          <img
            src="/white-logo.png"
            alt="logo"
            style={{ width: "4cm", marginLeft: "20px" }}
          />
        </div>
        <div className="nightwalker-menu-icon">
          <img
            src="/menubar.png"
            alt="menu"
            style={{ width: "50px", marginBottom: "30px" }}
          />
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