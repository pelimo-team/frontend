// SetNewPassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SetNewPassword.css";

function SetNewPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const e = searchParams.get("email");
    const c = searchParams.get("code");
    if (e) setEmail(e);
    if (c) setCode(c);
  }, [searchParams]);

  const setPassword = async (emailVal, codeVal, passwordVal) => {
    const response = await fetch("http://127.0.0.1:8000/api/accounts/reset/set-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailVal,
        code: codeVal,
        new_password: passwordVal,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not set new password.");
    }
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !code || !newPass || !repeatPass) {
      setError("All fields are required.");
      return;
    }
    if (newPass !== repeatPass) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await setPassword(email, code, newPass);
      setSuccess("Password changed successfully! You can now login.");
      // مثلا بعد از کمی تأخیر برو به لاگین
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="set-new-password-container">
      {/* ستون چپ: فرم */}
      <div className="snp-left">
        <div className="snp-logo">
          <img src="Logo.png" alt="Logo" />
        </div>

        <div className="snp-box">
          <h1 className="snp-title">CHANGE PASSWORD</h1>
          <p className="snp-subtitle">Set new password must be at least 8 characters</p>

          {error && <div className="snp-error">{error}</div>}
          {success && <div className="snp-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="snp-input-group">
            <img src="password.png" alt="Password" className="input-icon"/>
              <input
              placeholder="New Password"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>

            <div className="snp-input-group">
            <img src="password.png" alt="Password" className="input-icon"/>
              <input
              placeholder="Repeat Password"
                type="password"
                value={repeatPass}
                onChange={(e) => setRepeatPass(e.target.value)}
              />
            </div>
            <div className="button-group">
            <button type="button" className="snp-back" onClick={handleBackToLogin}>
              back to login
            </button>
            <button type="submit" className="snp-submit">
              submit
            </button>
            </div>
            
          </form>
        </div>
      </div>

      {/* ستون راست: تصویر */}
      <div className="snp-right">
        <img src="right section.jpg" alt="Burger" />
      </div>
    </div>
  );
}

export default SetNewPassword;
