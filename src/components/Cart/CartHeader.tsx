import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="cart-header">

     
      <div className='cart-logo'>
        <img src="/Logo.png" alt="" />
      </div>
      <h1 className="cart-title ">Shopping Cart</h1>
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src="/arrow-right-solid.svg" alt="بازگشت" />
      </button>
    </header>
  );
};

export default CartHeader; 