// ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/reset/send-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset code.");
      }
      // موفقیت → هدایت به enter-code
      navigate(`/enter-code?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="section-container">
      {/* ستون راست با تصویر */}
      <div className="right-section">
        <img src="right section.jpg" alt="Right Section" />
      </div>

      {/* ستون چپ */}
      <div className="left-section">
        <div className="logo-container">
          <img src="Logo.png" alt="Brand Logo" className="brand-logo" />
        </div>

        <div className="forgot-password-container">
          <div className="forgot-password-box">
            <h1 className="forgot-password-heading">Forgot Password?</h1>
            <p className="forgot-password-subheading">
              No worries, we'll send you reset instructions.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <img src="email.png" alt="Email Icon" className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              {error && <small className="text-danger">{error}</small>}

              <button
                type="submit"
                className="forgot-password-button"
              >
                Reset Password
              </button>

              <div>
                <a href="/login" className="login-link">Back to login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
