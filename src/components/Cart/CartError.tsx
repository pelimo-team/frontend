import React from 'react';
import { Container } from 'react-bootstrap';

interface CartErrorProps {
  error: string;
  onRetry: () => void;
}

const CartError: React.FC<CartErrorProps> = ({ error, onRetry }) => {
  return (
    <Container className="cart-container">
      <div className="cart-error">
        {error}
        <button className="custom-continue-btn" onClick={onRetry}>
          تلاش مجدد
        </button>
      </div>
    </Container>
  );
};

export default CartError; 