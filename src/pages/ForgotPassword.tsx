// ForgotPassword.tsx
import React from "react";
import "../styles/ForgotPassword.css";
import RightSection from "../components/ForgotPassword/RightSection";
import LeftSection from "../components/ForgotPassword/LeftSection";

const ForgotPassword: React.FC = () => {
  return (
    <div className="section-container">
      <RightSection />
      <LeftSection />
    </div>
  );
};

export default ForgotPassword;
