import { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
  };

  const checkEmailExists = async (email) => {
    const response = await fetch("/api/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data.exists;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (!emailError && email.trim() !== "") {
      const exists = await checkEmailExists(email);
      if (!exists) {
        setEmailError("Email not found");
      } else {
        console.log("Reset instructions sent to email.");
      }
    }
  };

  return (
    <div className="section-container">
      {/* بخش چپ (فرم فراموشی رمز) */}
      <div className="left-section">
        <div className="logo-container">
          <img src="Logo.png" alt="Brand Logo" className="brand-logo" />
        </div>
        <div className="forgot-password-container">
          <div className="forgot-password-box">
            <h1 className="forgot-password-heading">FORGOT PASSWORD?</h1>
            <p className="forgot-password-subheading">
              No worries, we'll send you reset instructions.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <img src="email.png" alt="Email Icon" className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              {emailError && <small className="text-danger">{emailError}</small>}

              <button
                type="submit"
                className={`forgot-password-button ${buttonClicked && emailError ? "disabled-button" : ""}`}
                disabled={buttonClicked && emailError}
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

      {/* بخش راست (عکس) */}
      <div className="right-section">
        <img src="right section.jpg" alt="" />
      </div>
    </div>
  );
};

export default ForgotPassword;
