import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import "../styles/FoodPage.css";
import MenuItem from "../components/Menu/MenuItem"

import LoadingState from "../components/FoodPage/LoadingState";
import ErrorState from "../components/FoodPage/ErrorState";
import FoodContent from "../components/FoodPage/FoodContent";
import { MenuItem as MenuItemType } from "../components/AdvancedSearch/types";


const mockMenuItem = {
  id: 1,
  name: "name",
  image:  null,
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
}

const FoodPage: React.FC = () => {
  // const { id } = useParams();
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const [loading, __] = useState<boolean>(false);
  const [error, _] = useState<string | null>(null);

  useEffect(() => {
    setMenuItem(mockMenuItem);
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!id) {
  //       setError("شناسه غذا یافت نشد");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       const response = (await api.get(`/api/items/${id}/`)) as MenuItemType;
  //       if (!response) throw new Error("No data received from API");
  //       setMenuItem(response);
  //     } catch (err: unknown) {
  //       setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

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
  )
};

export default FoodPage;
