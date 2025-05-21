import React from 'react';

interface RestaurantTabsProps {
  activeTab: 'menu' | 'comments';
  onTabChange: (tab: 'menu' | 'comments') => void;
}

const RestaurantTabs: React.FC<RestaurantTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <section className="restaurant-tabs">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "menu" ? "active" : ""}`}
                  onClick={() => onTabChange("menu")}
                >
                  منو
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "comments" ? "active" : ""}`}
                  onClick={() => onTabChange("comments")}
                >
                  نظرات
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantTabs; 