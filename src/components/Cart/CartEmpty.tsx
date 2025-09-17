import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="cart-container">
      <div className="cart-box text-center">
        <h2>سبد خرید شما خالی است</h2>
        <button
          className="custom-continue-btn mt-3"
          onClick={() => navigate("/")}
        >
          مشاهده رستوران‌ها
        </button>
      </div>
    </Container>
  );
};

export default CartEmpty; 