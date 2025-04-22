// entercode.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./EnterCode.css";

function EnterCode() {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const e = searchParams.get("email");
    if (e) {
      setEmail(e);
    }
  }, [searchParams]);

  const verifyCode = async (emailValue, codeValue) => {
    const response = await fetch("http://127.0.0.1:8000/api/accounts/reset/verify-code/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailValue, code: codeValue }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Invalid code");
    }
    return data;
  };

  const handleVerify = async () => {
    setError("");
    const fullCode = code1 + code2 + code3 + code4;
    if (!email || fullCode.length < 4) {
      setError("Please fill in the 4-digit code.");
      return;
    }
    try {
      await verifyCode(email, fullCode);
      // موفق → هدایت به set-new-password
      navigate(`/set-new-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(fullCode)}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    // مثلاً برگردد به forgot-password
    navigate("/forgot-password");
  };

  return (
    <div className="enter-code-container">
      {/* ستون چپ */}
      <div className="enter-code-left">
        <div className="logo-box">
          <img src="Logo.png" alt="Logo" />
        </div>

        <div className="enter-code-box">
          <h1 className="enter-code-title">ENTER VERIFICATION CODE</h1>
          <p className="enter-code-subtitle">
            We sent a code to <span style={{ fontWeight: "bold" }}>{email}</span>
          </p>

          {error && <div className="enter-code-error">{error}</div>}

          <div className="code-inputs">
            <input
              type="text"
              maxLength={1}
              value={code1}
              onChange={(e) => setCode1(e.target.value.replace(/\D/, ""))}
            />
            <input
              type="text"
              maxLength={1}
              value={code2}
              onChange={(e) => setCode2(e.target.value.replace(/\D/, ""))}
            />
            <input
              type="text"
              maxLength={1}
              value={code3}
              onChange={(e) => setCode3(e.target.value.replace(/\D/, ""))}
            />
            <input
              type="text"
              maxLength={1}
              value={code4}
              onChange={(e) => setCode4(e.target.value.replace(/\D/, ""))}
            />
          </div>

          <div className="button-group">
            <button className="cancel-btn" onClick={handleCancel}>
              cancel
            </button>
            <button className="verify-btn" onClick={handleVerify}>
              verify
            </button>
          </div>
        </div>
      </div>

      {/* ستون راست */}
      <div className="enter-code-right">
        <img src="right section.jpg" alt="Burger" />
      </div>
    </div>
  );
}

export default EnterCode;
