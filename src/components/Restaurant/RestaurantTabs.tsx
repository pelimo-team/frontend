interface RestaurantTabsProps {
  activeTab: "menu" | "comments";
  onTabChange: (tab: "menu" | "comments") => void;
}

const RestaurantTabs = ({ activeTab, onTabChange }: RestaurantTabsProps) => {
  return (
    <div className="restaurant-tabs">
      <div
        className={`restaurant-tab ${activeTab === "menu" ? "active" : ""}`}
        onClick={() => onTabChange("menu")}
      >
        منو
      </div>
      <div
        className={`restaurant-tab ${activeTab === "comments" ? "active" : ""}`}
        onClick={() => onTabChange("comments")}
      >
        نظرات
      </div>
    </div>
  );
};

export default RestaurantTabs; 