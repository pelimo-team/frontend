import React from 'react';
import QuantityControls from './QuantityControls';

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
  cartQuantity: number;
  onQuantityChange: (itemId: string, change: number) => void;
  onItemClick: (e: React.MouseEvent<HTMLDivElement>, itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  cartQuantity,
  onQuantityChange,
  onItemClick,
}) => {
  console.log(item);
  return (
    <div
      className="menu-item"
      onClick={(e) => onItemClick(e, item.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="item-image">
        {item.image && (
          <img
            src={
              item.image.startsWith('http')
                ? item.image
                : `http://localhost:8000${item.image}`
            }
            alt={item.name}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/food-placeholder.png';
            }}
          />
        )}
      </div>
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-description">{item.description}</p>
        <div className="item-price">
          {typeof item.price === 'number'
            ? `${item.price.toLocaleString()} تومان`
            : 'قیمت نامشخص'}
        </div>
      </div>
      <div className="item-actions" onClick={(e) => e.stopPropagation()}>
        {cartQuantity > 0 ? (
          <QuantityControls
            itemId={item.id}
            quantity={cartQuantity}
            onQuantityChange={onQuantityChange}
          />
        ) : (
          <button
            className="add-to-cart"
            onClick={() => onQuantityChange(item.id, 1)}
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItem; 