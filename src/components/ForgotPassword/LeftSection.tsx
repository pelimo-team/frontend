import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

const LeftSection: React.FC = () => {
  return (
    <div className="left-section">
      <div className="logo-container">
        <img src="Logo.png" alt="Brand Logo" className="brand-logo" />
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default LeftSection; 