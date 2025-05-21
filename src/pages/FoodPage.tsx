import React, { useEffect, useState } from "react";

import "../styles/FoodPage.css";

import LoadingState from "../components/FoodPage/LoadingState";
import ErrorState from "../components/FoodPage/ErrorState";
import FoodContent from "../components/FoodPage/FoodContent";
import { MenuItem as MenuItemType } from "../components/AdvancedSearch/types";
import { useParams } from "react-router-dom";

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
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const [loading, _] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const { id } = useParams();
  console.log(id);
  const fetch_data = () => {};
  useEffect(() => {
    setMenuItem(mockMenuItem);
    fetch_data;
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
