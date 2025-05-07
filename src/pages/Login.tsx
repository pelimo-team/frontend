// Login.tsx
import { useEffect } from "react";
import "../styles/AuthPages.css";
import LoginForm from "../components/Login/LoginForm";

function Login() {
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts/csrf/", {
      method: "GET",
      credentials: "include",
    }).catch((err) => {
      console.error("Error fetching CSRF token:", err);
    });
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-logo">
          <img src="Logo.png" alt="Logo" />
        </div>

        <div className="signup-form-box">
          <h1 className="signup-title">Login</h1>
          <p className="signup-subtitle">Enter your credentials to login</p>
          <LoginForm />
        </div>
      </div>

      <div className="signup-right">
        <img src="right section.jpg" alt="Burger" />
      </div>
    </div>
  );
}

export default Login;
