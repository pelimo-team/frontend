import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="d-flex align-items-center justify-content-between mb-4">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src="/back.png" alt="بازگشت" />
      </button>
      <h1 className="cart-title mb-0">سبد خرید</h1>
      <div style={{ width: "40px" }}></div>
    </header>
  );
};

export default CartHeader; 