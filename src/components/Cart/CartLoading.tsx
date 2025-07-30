import React from 'react';
import { Container } from 'react-bootstrap';

const CartLoading: React.FC = () => {
  return (
    <Container className="cart-container">
      <div className="cart-loading">loading basket...</div>
    </Container>
  );
};

export default CartLoading; 