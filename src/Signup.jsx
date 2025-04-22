// Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      let sanitized = value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
      setFormData({ ...formData, email: sanitized });
      const re = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(re.test(sanitized) ? "" : "Invalid email address");
    } else if (name === "phone") {
      let phone = value.replace(/\D/g, "");
      if (!phone.startsWith("09") && phone.length > 0) {
        setPhoneError("Phone number must start with 09");
      } else if (phone.length !== 11 && phone.length > 0) {
        setPhoneError("Phone number must be exactly 11 digits");
      } else {
        setPhoneError("");
      }
      setFormData({ ...formData, phone });
    } else if (name === "password") {
      let pass = value.replace(/[آ-ی]/g, "");
      if (pass.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else if (!isPasswordValid(pass)) {
        setPasswordError("Password must contain at least two special characters");
      } else {
        setPasswordError("");
      }
      setFormData({ ...formData, password: pass });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isPasswordValid = (password) => {
    const re = /[!@#$%^&*(),.?":{}|<>]/g;
    const matches = password.match(re);
    return matches && matches.length >= 2;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    !emailError &&
    !phoneError &&
    !passwordError;

    const handleSubmit = (e) => {
      e.preventDefault();
      setButtonClicked(true);
      setErrorMessage("");
  
      if (isFormValid) {
        console.log("Form is valid. Sending data to /register/send-code...");
        fetch("http://127.0.0.1:8000/api/accounts/register/send-code/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            email: formData.email,
            phone_number: formData.phone,
          }),
        })
          .then((res) => res.json().then((data) => ({ status: res.status, data })))
          .then(({ status, data }) => {
            if (status === 200) {
              // ارسال کد فعال‌سازی موفقیت‌آمیز بود
              console.log("Verification code sent to:", formData.email);
              // هدایت به صفحه وارد کردن کد
              navigate(`/enter-code-signup?email=${encodeURIComponent(formData.email)}`);
            } else {
              console.error("Register error:", data.error || data);
              setErrorMessage(data.error || "Registration failed.");
            }
          })
          .catch((err) => {
            console.error("Request failed:", err);
            setErrorMessage("Something went wrong. Please try again.");
          });
      } else {
        console.log("Form is invalid. Not sending data.");
        setErrorMessage("Please fix the errors and fill all fields correctly.");
      }
    };
  

  return (
    <div className="signup-container">
      {/* ستون چپ (فرم) */}
      <div className="signup-left">
        <div className="signup-logo">
          <img src="Logo.png" alt="Logo" />
        </div>

        <div className="signup-form-box">
          <h1 className="signup-title">Sign Up</h1>
          <p className="signup-subtitle">Fill the information boxes for signing up</p>

          <form onSubmit={handleSubmit}>
            <div className="signup-input-group">
              <img src="username.png" alt="User" className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="signup-input-group">
              <img src="password.png" alt="Password" className="input-icon"/>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
              />
              <img
                src={showPassword ? "eye-slash.svg" : "eye.svg"}
                alt="Toggle"
                className="signup-eye"
                onClick={togglePasswordVisibility}
              />
            </div>
            {passwordError && <small className="signup-error">{passwordError}</small>}

            <div className="signup-input-group">
              <img src="email.png" alt="Email" className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            {emailError && <small className="signup-error">{emailError}</small>}

            <div className="signup-input-group">
              <img src="phone.png" alt="Phone" className="input-icon"/>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            {phoneError && <small className="signup-error">{phoneError}</small>}

            {errorMessage && <div className="signup-error">{errorMessage}</div>}

            <button
              type="submit"
              className={`signup-btn ${buttonClicked && !isFormValid ? "signup-btn-disabled" : ""}`}
              disabled={buttonClicked && !isFormValid}
            >
              Register
            </button>

            <p className="signup-extra" style={{ marginTop: "20px" }}>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>

      {/* ستون راست: عکس برگر */}
      <div className="signup-right">
        <img src="right section.jpg" alt="Burger" />
      </div>
    </div>
  );
}

export default Signup;
