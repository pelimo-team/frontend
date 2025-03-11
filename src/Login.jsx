import { useState } from "react";
import "./App.css";

const Login = () => {
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
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      let password = value.replace(/[آ-ی]/g, "");
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else if (!isPasswordValid(password)) {
        setPasswordError("Password must contain at least two special characters");
      } else {
        setPasswordError("");
      }
      setFormData({ ...formData, password });
    }
  };

  const isPasswordValid = (password) => {
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    const matches = password.match(specialCharsRegex);
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

    if (isFormValid) {
      console.log("Form is valid. Sending data to backend.");
    } else {
      console.log("Form is invalid. Not sending data to backend.");
    }
  };

  return (
    <div className="section-container">
      <div className="right-section">
        <img src="right section.jpg" alt="" />
      </div>
      <div className="left-section">
        <div className="logo-container">
          <img src="Logo.png" alt="Brand Logo" className="brand-logo" />
        </div>
        <div className="signup-container">
          <div className="signup-box">
            <h1 className="signup-heading">Login</h1>
            <p className="signup-subheading">Enter your credentials to login</p>
            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="input-wrapper">
                <img src="username.png" alt="User Icon" className="input-icon" />
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
                <img src="password.png" alt="Password Icon" className="input-icon" />
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
              {passwordError && <small className="text-danger">{passwordError}</small>}
              
              {/* Submit Button */}
              <button
                type="submit"
                className={`signup-button ${buttonClicked && !isFormValid ? "disabled-button" : ""}`}
                disabled={buttonClicked && !isFormValid}
              >
                Register
              </button>

              {/* Login Link */}
              <div className="text-center mt-3">
                <span>
                  Don't have an account yet? <a href="/login" className="login-link">Sign up</a>
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
