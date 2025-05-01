// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Get CSRF token when component mounts
    fetch("http://127.0.0.1:8000/api/accounts/csrf/", {
      method: 'GET',
      credentials: "include",
    }).catch((err) => {
      console.error("Error fetching CSRF token:", err);
      setErrorMessage("Error connecting to server. Please try again.");
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      let pass = value.replace(/[آ-ی]/g, "");
      if (pass.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else if (!isPasswordValid(pass)) {
        setPasswordError("Password must contain at least two special characters");
      } else {
        setPasswordError("");
      }
      setFormData({ ...formData, password: pass });
    } else if (name === "phone_number") {
      // Only allow numbers and limit to 11 digits
      const phoneNumber = value.replace(/[^0-9]/g, '').slice(0, 11);
      setFormData({ ...formData, phone_number: phoneNumber });
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
    formData.phone_number.trim().length === 11 &&
    formData.password.trim() !== "" &&
    !passwordError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setErrorMessage("");

    if (isFormValid) {
      try {
        console.log("Sending login request with data:", {
          phone_number: formData.phone_number,
          password: formData.password,
        });
        
        const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            phone_number: formData.phone_number,
            password: formData.password,
          }),
        });

        const data = await response.json();
        console.log("Response status:", response.status);
        console.log("Response data:", data);

        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          navigate("/");
        } else {
          setErrorMessage(data.error || "Login failed. Please check your credentials.");
        }
      } catch (err) {
        console.error("Login error:", err);
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      {/* ستون چپ (فرم) */}
      <div className="login-left">
        <div className="login-logo">
          <img src="Logo.png" alt="Logo" />
        </div>

        <div className="login-form-box">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Enter your credentials to login</p>

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <img src="username.png" alt="Phone" className="input-icon" />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number (e.g. 09121234567)"
                value={formData.phone_number}
                onChange={handleChange}
                className="input-field"
                maxLength="11"
              />
            </div>

            <div className="login-input-group">
              <img src="password.png" alt="Pass" className="input-icon" />
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
                className="login-eye"
                onClick={togglePasswordVisibility}
              />
            </div>
            {passwordError && <small className="login-error">{passwordError}</small>}
            {errorMessage && <div className="login-error">{errorMessage}</div>}

            <div className="login-extra" style={{ marginTop: "10px" }}>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button
              type="submit"
              className={`login-btn ${buttonClicked && !isFormValid ? "login-btn-disabled" : ""}`}
              disabled={buttonClicked && !isFormValid}
            >
              Login
            </button>

            <div className="login-extra" style={{ marginTop: "20px" }}>
              Don't have an account yet? <a href="/signup">Sign up</a>
            </div>
          </form>
        </div>
      </div>

      {/* ستون راست (عکس برگر) */}
      <div className="login-right">
        <img src="right section.jpg" alt="Burger" />
      </div>
    </div>
  );
}

export default Login;
