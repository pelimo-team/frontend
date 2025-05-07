import React, { useState, useEffect } from "react";
import "../styles/AdvancedSearch.css";
import { useLocation } from "react-router-dom";
import { CategoryType, FilterType, Restaurant, MenuItem } from "../components/AdvancedSearch/types";
import Header from "../components/AdvancedSearch/Header";
import CategoryTabs from "../components/AdvancedSearch/CategoryTabs";
import Filters from "../components/AdvancedSearch/Filters";
import ResultsSection from "../components/AdvancedSearch/ResultsSection";

const AdvancedSearch: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [searchText, setSearchText] = useState<string>(searchQuery);
  const [activeTab, setActiveTab] = useState<CategoryType>("همه");
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<"restaurants" | "items">("restaurants");
  const [selectedShopIndex, setSelectedShopIndex] = useState<number | null>(null);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  useEffect(() => {
    console.log("Search mode changed to:", searchMode);
    if (searchMode === "restaurants") {
      fetchRestaurants();
    } else {
      fetchMenuItems();
    }
  }, [searchText, activeTab, activeFilters, searchMode]);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchText) queryParams.append("name", searchText);
      if (activeTab !== "همه") queryParams.append("type", activeTab);

      if (activeFilters.includes("دارای تخفیف"))
        queryParams.append("has_onsale", "true");
      if (activeFilters.includes("پرفروش‌ترین"))
        queryParams.append("has_bestseller", "true");

      const url = `/api/restaurants/search/advanced/?${queryParams.toString()}`;
      console.log("Fetching restaurants from URL:", url);

      const response = await fetch(url, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!response.ok) {
        let errorMessage = "Failed to fetch restaurants";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            console.error("Error details:", errorData.details);
          }
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      console.log("Parsed response:", data);

      if (data && Array.isArray(data.results)) {
        setRestaurants(data.results);
        console.log(`Set ${data.results.length} restaurants`);
      } else if (Array.isArray(data)) {
        setRestaurants(data);
        console.log(`Set ${data.length} restaurants (legacy format)`);
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setRestaurants([]); // Reset restaurants on error
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchText) queryParams.append("name", searchText);
      if (activeTab !== "همه") queryParams.append("restaurant_type", activeTab);

      if (activeFilters.includes("دارای تخفیف"))
        queryParams.append("is_onsale", "true");
      if (activeFilters.includes("پرفروش‌ترین"))
        queryParams.append("is_bestseller", "true");
      if (activeFilters.includes("دارای عکس"))
        queryParams.append("has_image", "true");
      if (activeFilters.includes("گران‌ترین"))
        queryParams.append("ordering", "-price");
      if (activeFilters.includes("ارزان‌ترین"))
        queryParams.append("ordering", "price");

      const url = `/api/items/search/advanced/?${queryParams.toString()}`;
      console.log("Fetching menu items from URL:", url);

      const response = await fetch(url, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!response.ok) {
        let errorMessage = "Failed to fetch menu items";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            console.error("Error details:", errorData.details);
          }
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      console.log("Parsed response:", data);

      if (data && Array.isArray(data.results)) {
        setMenuItems(data.results);
        console.log(`Set ${data.results.length} menu items`);
      } else if (Array.isArray(data)) {
        setMenuItems(data);
        console.log(`Set ${data.length} menu items (legacy format)`);
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error in fetchMenuItems:", err);
      setMenuItems([]); // Reset menu items on error
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filter: FilterType) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const visibleItems = searchMode === "restaurants"
    ? showAllItems ? restaurants : restaurants.slice(0, 6)
    : showAllItems ? menuItems : menuItems.slice(0, 6);

  return (
    <div className="advanced-search">
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
      />
      <CategoryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Filters
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
      />
      <ResultsSection
        searchMode={searchMode}
        visibleItems={visibleItems}
        loading={loading}
        error={error}
        showAllItems={showAllItems}
        setShowAllItems={setShowAllItems}
        selectedShopIndex={selectedShopIndex}
        setSelectedShopIndex={setSelectedShopIndex}
      />
    </div>
  );
};

export default AdvancedSearch;
