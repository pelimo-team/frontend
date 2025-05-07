import React from 'react';

interface QuantityControlsProps {
  itemId: string;
  quantity: number;
  onQuantityChange: (itemId: string, change: number) => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  itemId,
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="quantity-controls">
      <button
        className="quantity-btn decrease"
        onClick={() => onQuantityChange(itemId, -1)}
      >
        -
      </button>
      <span className="quantity">{quantity}</span>
      <button
        className="quantity-btn increase"
        onClick={() => onQuantityChange(itemId, 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControls; 