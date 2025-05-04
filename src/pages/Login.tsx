// Login.jsx
import { useEffect } from "react";
import "../AuthPages.css";
import LoginHeader from "../components/Login/LoginHeader";
import LoginForm from "../components/Login/LoginForm";
import LoginSidebar from "../components/Login/LoginSidebar";

function Login() {
  useEffect(() => {
    // Get CSRF token when component mounts
    fetch("http://127.0.0.1:8000/api/accounts/csrf/", {
      method: "GET",
      credentials: "include",
    }).catch((err) => {
      console.error("Error fetching CSRF token:", err);
    });
  }, []);

  return (
    <div className="login-container">
      <div className="login-left">
        <LoginHeader />
        <div className="login-form-box">
          <LoginForm />
        </div>
      </div>
      <LoginSidebar />
    </div>
  );
}

export default Login;
