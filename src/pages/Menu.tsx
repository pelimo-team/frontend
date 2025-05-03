import React from "react";
import { useNavigate } from "react-router-dom";
import "../Menu.css";

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
      {categories.map((category) => {
        console.log("Rendering category:", category);
        if (!category.items || !Array.isArray(category.items)) {
          return null;
        }
        return (
          <div key={category.id} className="menu-category">
            <h3 className="category-title">{category.name}</h3>
            <div className="menu-items">
              {category.items.map((item) => {
                console.log("Rendering menu item:", item);
                if (!item || !item.id) return null;
                return (
                  <div
                    key={item.id}
                    className="menu-item"
                    onClick={(e) => handleItemClick(e, item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="item-image">
                      {item.image && (
                        <img
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `http://localhost:8000${item.image}`
                          }
                          alt={item.name}
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement>
                          ) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/food-placeholder.png";
                          }}
                        />
                      )}
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-description">{item.description}</p>
                      <div className="item-price">
                        {typeof item.price === "number"
                          ? `${item.price.toLocaleString()} تومان`
                          : "قیمت نامشخص"}
                      </div>
                    </div>
                    <div
                      className="item-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {cart[item.id] > 0 ? (
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn decrease"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="quantity">{cart[item.id]}</span>
                          <button
                            className="quantity-btn increase"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="add-to-cart"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          افزودن به سبد خرید
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
