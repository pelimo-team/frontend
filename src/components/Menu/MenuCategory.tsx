import React from 'react';
import MenuItem from './MenuItem';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface MenuCategoryProps {
  category: {
    id: string;
    name: string;
    items: MenuItem[];
  };
  cart: Record<string, number>;
  onQuantityChange: (itemId: string, change: number) => void;
  onItemClick: (e: React.MouseEvent<HTMLDivElement>, itemId: string) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  category,
  cart,
  onQuantityChange,
  onItemClick,
}) => {
  if (!category.items || !Array.isArray(category.items)) {
    return null;
  }

  return (
    <div className="menu-category">
      <h3 className="category-title">{category.name}</h3>
      <div className="menu-items">
        {category.items.map((item) => {
          if (!item || !item.id) return null;
          return (
            <MenuItem
              key={item.id}
              item={item}
              cartQuantity={cart[item.id] || 0}
              onQuantityChange={onQuantityChange}
              onItemClick={onItemClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuCategory; 