import React, { useState } from 'react';
import { ShoppingBasket } from 'lucide-react';
import '../../styles/FoodPage.css';

interface AddToBasketProps {
  price: number;
  onAddToBasket: (quantity: number) => void;
}

const AddToBasket: React.FC<AddToBasketProps> = ({ price, onAddToBasket }) => {
  const [quantity, setQuantity] = useState(0);
  const [added, setAdded] = useState(false);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleAddToBasket = () => {
    setQuantity(1);
    onAddToBasket(1);
    setAdded(true);
    
    // Reset the "Added" state after animation
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const totalPrice = (price * (quantity || 1)).toFixed(2);

  return (
    <div className="add-to-basket">
      <div className="price-container">
        <span className="price">${totalPrice}</span>
      </div>
      
      {quantity === 0 ? (
        <button 
          className={`add-btn ${added ? 'added' : ''}`}
          onClick={handleAddToBasket}
        >
          <ShoppingBasket size={18} />
          <span>{added ? 'Added!' : 'Add to Basket'}</span>
        </button>
      ) : (
        <div className="quantity-controls">
          <button 
            className="quantity-btn" 
            onClick={decrementQuantity}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button 
            className="quantity-btn" 
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToBasket;