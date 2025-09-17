import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";

interface FormData {
  phone_number: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    phone_number: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      const phoneNumber = value.replace(/[^0-9]/g, "").slice(0, 11);
      setFormData({ ...formData, phone_number: phoneNumber });
    }
  };

  const isPasswordValid = (password: string): boolean => {
    const re = /[!@#$%^&*(),.?":{}|<>]/g;
    const matches = password.match(re);
    return matches ? matches.length >= 2 : false;
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const isFormValid =
    formData.phone_number.trim().length === 11 &&
    formData.password.trim() !== "" &&
    !passwordError;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonClicked(true);
    setErrorMessage("");

    if (isFormValid) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            phone_number: formData.phone_number,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem("token", data.token);
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
    <form onSubmit={handleSubmit}>
      <LoginInput
        type="tel"
        name="phone_number"
        placeholder="Phone Number (e.g. 09121234567)"
        value={formData.phone_number}
        onChange={handleChange}
        icon="username.png"
        maxLength={11}
      />

      <LoginInput
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        icon="password.png"
        showPassword={showPassword}
        onTogglePassword={togglePasswordVisibility}
      />

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
  );
};

export default LoginForm; 