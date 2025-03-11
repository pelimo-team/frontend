import { useState } from "react";
import "./App.css";

const Signup = () => {
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

  // هندل تغییر اینپوت‌ها
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // اعتبارسنجی ایمیل
    if (name === "email") {
      const sanitizedValue = value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
      setFormData({ ...formData, email: sanitizedValue });

      const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(emailRegex.test(sanitizedValue) ? "" : "Invalid email address");
    }

    // اعتبارسنجی شماره تلفن
    if (name === "phone") {
      let phone = value.replace(/\D/g, "");
      const phoneStartRegex = /^09/;
      const phoneLengthRegex = /^\d{11}$/;

      if (phone.length === 0) {
        setPhoneError("");
      } else if (!phoneStartRegex.test(phone)) {
        setPhoneError("Phone number must start with 09");
      } else if (!phoneLengthRegex.test(phone)) {
        setPhoneError("Phone number must be exactly 11 digits");
      } else {
        setPhoneError("");
      }
      setFormData({ ...formData, phone });
    }

    // اعتبارسنجی پسورد
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

  // بررسی صحت فرم برای فعال/غیرفعال کردن دکمه
  const isFormValid =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    !emailError &&
    !phoneError &&
    !passwordError;

  // تابع ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (isFormValid) {
      console.log("Form is valid. Sending data to backend.");

      // درخواست POST به سرور Django (مسیر register یا api/signup را بر اساس نیاز خودتان بگذارید)
      fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          password2: formData.password, // متد register نیاز به password2 دارد
          email: formData.email,
          phone_number: formData.phone,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response:", data);
          // در صورت موفقیت، می‌توانید پیام موفقیت را نمایش بدهید
          // یا ریدایرکت کنید به صفحه لاگین
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
            <h1 className="signup-heading">Sign Up</h1>
            <p className="signup-subheading">
              Fill the information boxes for signing up
            </p>
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

              {/* Phone */}
              <div className="input-wrapper">
                <img src="phone.png" alt="Phone Icon" className="input-icon" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              {phoneError && <small className="text-danger">{phoneError}</small>}

              {/* Email */}
              <div className="input-wrapper">
                <img src="email.png" alt="Email Icon" className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              {emailError && <small className="text-danger">{emailError}</small>}

              {/* Submit Button */}
              <button
                type="submit"
                className={`signup-button ${
                  buttonClicked && !isFormValid ? "disabled-button" : ""
                }`}
                disabled={buttonClicked && !isFormValid}
              >
                Register
              </button>

              {/* Login Link */}
              <div className="text-center mt-3">
                <span>
                  Already have an account?{" "}
                  <a href="/" className="login-link">
                    login
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

export default Signup;
