import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/FoodPage.css";
import { api } from "../utils/api";

import LoadingState from "../components/FoodPage/LoadingState";
import ErrorState from "../components/FoodPage/ErrorState";
import FoodContent from "../components/FoodPage/FoodContent";
import { MenuItem as MenuItemType } from "../components/AdvancedSearch/types";

const mockMenuItem = {
  id: 1,
  name: "name",
  image: null,
  bestseller: true,
  restaurant: {
    id: 1,
    name: "name2",
  },
  category_name: "name3",
  rate: 3,
  onsale: true,
  price: 1200000,
  sale_price: 120,
};

const FoodPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMenuItem(mockMenuItem);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !menuItem || !menuItem.restaurant) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      <FoodContent menuItem={menuItem} />
      {/* <MenuItem cartQuantity={} item={} onItemClick={} onQuantityChange={}/> */}
    </>
  );
};

export default FoodPage;
