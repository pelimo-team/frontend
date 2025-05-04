// SetNewPassword.jsx
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../SetNewPassword.css";
import LeftSection from "../components/SetNewPassword/LeftSection";
import RightSection from "../components/SetNewPassword/RightSection";

function SetNewPassword() {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [repeatPass, setRepeatPass] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const e = searchParams.get("email");
    const c = searchParams.get("code");
    if (e) setEmail(e);
    if (c) setCode(c);
  }, [searchParams]);

  const setPassword = async (
    emailVal: string,
    codeVal: string,
    passwordVal: string
  ) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/accounts/reset/set-password/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailVal,
          code: codeVal,
          new_password: passwordVal,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not set new password.");
    }
    return data;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !code || !newPass || !repeatPass) {
      setError("All fields are required.");
      return;
    }
    if (newPass !== repeatPass) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await setPassword(email, code, newPass);
      setSuccess("Password changed successfully! You can now login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="set-new-password-container">
      <LeftSection
        newPass={newPass}
        repeatPass={repeatPass}
        error={error}
        success={success}
        onNewPassChange={setNewPass}
        onRepeatPassChange={setRepeatPass}
        onSubmit={handleSubmit}
        onBackToLogin={handleBackToLogin}
      />
      <RightSection />
    </div>
  );
}

export default SetNewPassword;
