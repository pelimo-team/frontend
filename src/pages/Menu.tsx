import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import MenuCategory from "../components/Menu/MenuCategory";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuProps {
  categories: Category[];
  cart: Record<string, number>;
  updateCart: (itemId: string, quantity: number) => void;
  isAuthenticated: boolean;
}

const Menu: React.FC<MenuProps> = ({
  categories,
  cart,
  updateCart,
}) => {
  const navigate = useNavigate();
  console.log("Menu component received categories:", categories);
  console.log("Menu component received cart:", cart);

  const handleQuantityChange = (itemId: string, change: number) => {
    const currentQuantity = cart[itemId] || 0;
    const newQuantity = Math.max(currentQuantity + change, 0);
    updateCart(itemId, newQuantity);
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement>,
    itemId: string
  ) => {
    // Prevent navigation if clicking on buttons or quantity controls
    if (e.target instanceof Element && e.target.closest(".item-actions")) {
      return;
    }
    if (itemId) {
      console.log("Navigating to food item:", itemId);
      navigate(`/food/${itemId}`);
    } else {
      console.error("No item ID provided for navigation");
    }
  };

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    console.log("No menu items available - categories is:", categories);
    return <div className="menu-empty">منو در دسترس نیست</div>;
  }

  return (
    <div className="menu-container">
      {categories.map((category) => (
        <MenuCategory
          key={category.id}
          category={category}
          cart={cart}
          onQuantityChange={handleQuantityChange}
          onItemClick={handleItemClick}
        />
      ))}
    </div>
  );
};

export default Menu;
