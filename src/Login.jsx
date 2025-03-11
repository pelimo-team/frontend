import { useState } from "react";
import "./App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // پیام‌های وضعیت لاگین:
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // تغییر اینپوت‌ها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // اگر می‌خواهید کلاً بدون محدودیت باشد، این قسمت چک رمز را پاک کنید:
    if (name === "password") {
      let password = value.replace(/[آ-ی]/g, "");
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else if (!isPasswordValid(password)) {
        setPasswordError("Password must contain at least two special characters");
      } else {
        setPasswordError("");
      }
    }
  };

  // تابع کمکی برای چک کردن حداقل دو کاراکتر خاص در رمز
  const isPasswordValid = (password) => {
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    const matches = password.match(specialCharsRegex);
    return matches && matches.length >= 2;
  };

  // نمایش/عدم نمایش پسورد
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // فقط چک می‌کنیم username و password خالی نباشند و رمز عبور خطا نداشته باشد
  const isFormValid =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    !passwordError;

  // موقع کلیک روی Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    // هر بار که کلیک می‌شود، پیام‌های موفق یا خطا را پاک می‌کنیم
    setErrorMessage("");
    setSuccessMessage("");

    if (isFormValid) {
      console.log("Form is valid. Sending data to backend...");

      // اگر متصل به جنگو هستید:
      fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((response) =>
          response.json().then((data) => ({ status: response.status, data }))
        )
        .then(({ status, data }) => {
          // اگر لاگین موفق بود (معمولاً status=200)
          if (status === 200) {
            console.log("Login successful:", data);
            setSuccessMessage("You have logged in successfully!");
            // می‌توانید صفحه را تغییر دهید یا ...
            // window.location.href = "/dashboard";
          } else {
            // اگر status=400 یا هر چیز دیگر
            console.error("Login error:", data);
            // بک‌اند شما ممکن است به شکل {"error":"Invalid credentials"} برگرداند
            setErrorMessage(data.error || "Invalid credentials");
          }
        })
        .catch((error) => {
          console.error("Request failed:", error);
          setErrorMessage("Something went wrong. Please try again.");
        });
    } else {
      console.log("Form is invalid. Not sending data to backend.");
      setErrorMessage("Please enter valid username/password.");
    }
  };

  return (
    <div className="section-container">
      {/* ستون راست با تصویر */}
      <div className="right-section">
        <img src="right section.jpg" alt="Right Section" />
      </div>

      {/* ستون چپ شامل لوگو و فرم لاگین */}
      <div className="left-section">
        <div className="logo-container">
          <img src="Logo.png" alt="Brand Logo" className="brand-logo" />
        </div>
        
        <div className="signup-container">
          <div className="signup-box">
            <h1 className="signup-heading">Login</h1>
            <p className="signup-subheading">
              Enter your credentials to login
            </p>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="input-wrapper">
                <img
                  src="username.png"
                  alt="User Icon"
                  className="input-icon"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              {/* Password */}
              <div className="input-wrapper">
                <img
                  src="password.png"
                  alt="Password Icon"
                  className="input-icon"
                />
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
                  alt="Toggle Password"
                  className="eye-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {passwordError && (
                <small className="text-danger">{passwordError}</small>
              )}

              {/* نمایش پیام موفق یا خطا */}
              {successMessage && (
                <div style={{ color: "green", marginTop: "10px" }}>
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}
                </div>
              )}

              {/* دکمه لاگین */}
              <button
                type="submit"
                className={`signup-button ${
                  buttonClicked && !isFormValid ? "disabled-button" : ""
                }`}
                disabled={buttonClicked && !isFormValid}
                style={{ marginTop: "20px" }}
              >
                Login
              </button>

              {/* لینک ثبت‌نام */}
              <div className="text-center mt-3">
                <span>
                  Don't have an account yet?{" "}
                  <a href="/signup" className="login-link">
                    Sign up
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
