import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  error: string | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="food-page">
      <div className="error-message">
        {error || "اطلاعات غذا یافت نشد"}
        <button className="custom-continue-btn mt-3" onClick={() => navigate(-1)}>
          بازگشت
        </button>
      </div>
    </div>
  );
};

export default ErrorState; 