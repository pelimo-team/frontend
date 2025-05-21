import React from 'react';
import { MenuCategory } from './types';
import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
  categories: MenuCategory[];
  visibleItems: Set<string>;
  onAddToCart: (itemId: string) => void;
  isActive: boolean;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  visibleItems,
  onAddToCart,
  isActive,
}) => {
  return (
    <div className={`menu-content ${isActive ? "fade-in active" : "fade-out"}`}>
      {categories.map((category) => (
        <div key={category.id} className="category-section mb-5">
          <h2 className="category-title mb-4">{category.name}</h2>
          <div className="row g-4">
            {category.items.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <MenuItemCard
                  item={item}
                  onAddToCart={onAddToCart}
                  isVisible={visibleItems.has(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuSection; 