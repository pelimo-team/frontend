import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import "../FoodPage.css";
import type { MenuItem } from "../types/types";

import LoadingState from "../components/FoodPage/LoadingState";
import ErrorState from "../components/FoodPage/ErrorState";
import FoodContent from "../components/FoodPage/FoodContent";

const FoodPage: React.FC = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("شناسه غذا یافت نشد");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = (await api.get(`/api/items/${id}/`)) as MenuItem;
        if (!response) throw new Error("No data received from API");
        setMenuItem(response);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !menuItem || !menuItem.restaurant) {
    return <ErrorState error={error} />;
  }

  return <FoodContent menuItem={menuItem} />;
};

export default FoodPage;
