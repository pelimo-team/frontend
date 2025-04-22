// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    !passwordError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setErrorMessage("");

    if (isFormValid) {
      console.log("Login form is valid. Submitting...");
      // نمونه درخواست به بک‌اند
      fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((res) =>
          res.json().then((data) => ({ status: res.status, data }))
        )
        .then(({ status, data }) => {
          if (status === 200) {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/");
        }
         else {
            setErrorMessage(data.error || "Invalid credentials");
          }
        })
        .catch((err) => {
          setErrorMessage("Something went wrong.");
          console.error(err);
        });
    } else {
      console.log("Login form invalid.");
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
