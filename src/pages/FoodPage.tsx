import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/FoodPage.css";
import { api } from "../utils/api";

import LoadingState from "../components/FoodPage/LoadingState";
import ErrorState from "../components/FoodPage/ErrorState";
import FoodContent from "../components/FoodPage/FoodContent";
import { MenuItem as MenuItemType } from "../components/AdvancedSearch/types";

const FoodPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/menu-items/${id}/`);
        setMenuItem(response);
      } catch (err) {
        console.error("Error fetching menu item:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load menu item"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMenuItem();
    }
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !menuItem || !menuItem.restaurant) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      <FoodContent menuItem={menuItem} />
    </>
  );
};

export default FoodPage;
