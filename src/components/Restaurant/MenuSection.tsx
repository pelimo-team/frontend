import React from 'react';
import { MenuItem } from './types';
import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
  items: MenuItem[];
  visibleItems: Set<string>;
  onAddToCart: (itemId: number | string) => void;
  isActive: boolean;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  visibleItems,
  onAddToCart,
  isActive,
}) => {
  return (
    <div className={`menu-content ${isActive ? 'fade-in active' : 'fade-out'}`}>
      <div className="row g-4">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="col-md-6 col-lg-4"
              id={String(item.id)}
            >
              <MenuItemCard
                item={item}
                onAddToCart={onAddToCart}
                isVisible={visibleItems.has(String(item.id))}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted py-5">
            No menu items available.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSection;
