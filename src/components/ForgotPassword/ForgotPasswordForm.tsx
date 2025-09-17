import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface ResetResponse {
  error?: string;
  [key: string]: any;
}

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/reset/send-code/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data: ResetResponse = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset code.");
      }
      navigate(`/enter-code?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="forgot-password-heading">Forgot Password?</h1>
        <p className="forgot-password-subheading">
          No worries, we'll send you reset instructions.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <img src="email.png" alt="Email Icon" className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="input-field"
            />
          </div>

          {error && <small className="text-danger">{error}</small>}

          <button type="submit" className="forgot-password-button">
            Reset Password
          </button>

          <div>
            <a href="/login" className="login-link">
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 