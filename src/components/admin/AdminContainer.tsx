import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { FiCoffee, FiShoppingCart, FiPackage, FiInfo } from "react-icons/fi";

interface AdminContainerProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
  shouldDisableTabs: boolean;
  username: string | null;
  currentTime: Date;
  children: React.ReactNode;
}

const AdminContainer: React.FC<AdminContainerProps> = ({
  activeTab,
  onTabSelect,
  shouldDisableTabs,
  username,
  currentTime,
  children
}) => {
  const formatShamsiDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="food-admin-panel">
      <main className="admin-main-content">
        <Tab.Container
          activeKey={activeTab}
          onSelect={(k) => onTabSelect(k as string)}
        >
          <Nav variant="tabs" className="nav-tabs">
            <Nav.Item>
              <Nav.Link 
                eventKey="menu"
                disabled={shouldDisableTabs}
                className={shouldDisableTabs ? "nav-link disabled" : "nav-link"}
              >
                Menu Management
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="orders"
                disabled={shouldDisableTabs}
                className={shouldDisableTabs ? "nav-link disabled" : "nav-link"}
              >
                Orders History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="stock"
                disabled={shouldDisableTabs}
                className={shouldDisableTabs ? "nav-link disabled" : "nav-link"}
              >
                Stock
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="restaurant information" className="nav-link">
                Restaurant information
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {children}
          </Tab.Content>
        </Tab.Container>
      </main>

      <aside className="sidebar">
        <div className="username">
          <h2>{username}</h2>
          <div className="time">
            {currentTime.toLocaleTimeString("en-US", { hour12: false })}
            <br />
            {formatShamsiDate(currentTime)}
          </div>
        </div>

        <ul>
          <li
            onClick={() => !shouldDisableTabs && onTabSelect("menu")}
            className={`sidebar-item ${activeTab === "menu" ? "active" : ""} ${
              shouldDisableTabs ? "disabled" : ""
            }`}
          >
            <FiCoffee />
            <span>Menu Management</span>
          </li>
          <li
            onClick={() => !shouldDisableTabs && onTabSelect("orders")}
            className={`sidebar-item ${activeTab === "orders" ? "active" : ""} ${
              shouldDisableTabs ? "disabled" : ""
            }`}
          >
            <FiShoppingCart />
            <span>Orders History</span>
          </li>
          <li
            onClick={() => !shouldDisableTabs && onTabSelect("stock")}
            className={`sidebar-item ${activeTab === "stock" ? "active" : ""} ${
              shouldDisableTabs ? "disabled" : ""
            }`}
          >
            <FiPackage />
            <span>Stock</span>
          </li>
          <li
            onClick={() => onTabSelect("restaurant information")}
            className={`sidebar-item ${activeTab === "restaurant information" ? "active" : ""}`}
          >
            <FiInfo />
            <span>Restaurant Information</span>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminContainer; 