import React from "react";
import { Spinner } from "react-bootstrap";

interface StatsCardsProps {
  menuItemsCount: number;
  ordersCount: number;
  loading: boolean;
  loadingOrders: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  menuItemsCount,
  ordersCount,
  loading,
  loadingOrders
}) => {
  return (
    <section className="stats-cards">
      <div className="stats-card">
        <div>
          {loading ? <Spinner animation="border" /> : menuItemsCount}
        </div>
        <div>Available Foods Count</div>
        <div className="icon">🍽️</div>
      </div>
      <div className="stats-card">
        <div>
          {loadingOrders ? <Spinner animation="border" /> : ordersCount}
        </div>
        <div>Orders Count</div>
        <div className="icon">🛒</div>
      </div>
    </section>
  );
};

export default StatsCards; 