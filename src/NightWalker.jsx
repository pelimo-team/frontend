import React from 'react';
import './NightWalker.css';

const categories = [
  { icon: '🍬', label: 'Confectionary' },
  { icon: '🍦', label: 'Juice & Ice Cream' },
  { icon: '🍎', label: 'Fruit' },
  { icon: '☕', label: 'Coffee Shop' },
  { icon: '🍽️', label: 'Restaurant' },
  { icon: '🍔', label: 'Fast Food' },
];

const Card = ({ title }) => (
  <div className="nightwalker-card">
    <div className="nightwalker-image">{title} image</div>
    <div className="nightwalker-info">
      <p><strong>name</strong></p>
      <p>description</p>
      <p>extra info</p>
      <div className="nightwalker-stars">⭐⭐⭐⭐⭐</div>
    </div>
  </div>
);

const NightWalker = () => {
  return (
    <div className="nightwalker-container">
      <section className="nightwalker-hero-section">
        <header className="nightwalker-hero-header">
          <div className="nightwalker-profile-icon">
            <img src='public/profile.png' alt='profile' style={{width:"50px", marginBottom:"30px"}}/>
          </div>
          <div className="nightwalker-logo">
            <img src='public/white-logo.png' alt='logo' style={{width:"4cm", marginLeft:"20px"}}/>
          </div>
          <div className="nightwalker-menu-icon">
            <img src='public/menubar.png' alt='menu' style={{width:"50px", marginBottom:"30px"}}/>
          </div>
        </header>

        <div className="nightwalker-centered-content">
          <div className="nightwalker-search-box">
            <img src='public/magnifying-glass-solid.svg' alt='search' style={{width:"20px"}}
                 className='nightwalker-search-icon'/>
            <input className="nightwalker-search-input" type="text" placeholder="Search" />
          </div>

          <div className="nightwalker-dropdown-wrapper">
            <select>
              <option>Choosing address</option>
              <option>Address 1</option>
              <option>Address 2</option>
            </select>
            <select>
              <option>Choosing time</option>
              <option>21:00-22:00</option>
              <option>22:00-23:00</option>
            </select>
          </div>
        </div>
      </section>

      <div className="nightwalker-category-bar-wrapper">
        <div className="nightwalker-category-bar">
          {categories.map((cat, index) => (
            <button key={index} className="nightwalker-category-button">{cat.icon}<br />{cat.label}</button>
          ))}
        </div>
      </div>

      <main className="nightwalker-slider-section">
        <h2>The Best Restaurant</h2>
        <div className="nightwalker-slider">
          {[1, 2, 3, 4, 5].map((i) => <Card key={i} title="Restaurant" />)}
        </div>

        <h2>The Best Food</h2>
        <div className="nightwalker-slider">
          {[1, 2, 3, 4, 5].map((i) => <Card key={i} title="Food" />)}
        </div>

        <h2>Games</h2>
        <div className="nightwalker-slider">
          {[1, 2, 3, 4, 5].map((i) => <Card key={i} title="Game" />)}
        </div>
      </main>

      <footer className="nightwalker-footer">
        <p>Contact: example@email.com</p>
        <p>Phone: +98 912 345 6789</p>
        <p>Address: Tehran, Iran</p>
      </footer>
    </div>
  );
};

export default NightWalker;
