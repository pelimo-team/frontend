import React from "react";
import { Container } from "react-bootstrap";

interface CartErrorProps {
  error: string;
  //onRetry: () => void;
  onBack: () => void;
}

const CartError: React.FC<CartErrorProps> = ({ onBack}) => {
  return (
    <Container className="cart-container">
      <div className="cart-error text-center">
        your basket is empty!
        <div className="d-flex justify-content-center gap-3 mt-3">
          {/* <button className="custom-continue-btn" onClick={onRetry}>
            تلاش مجدد
          </button> */}
          <button className="custom-continue-btn" onClick={onBack}>
            back
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CartError;
