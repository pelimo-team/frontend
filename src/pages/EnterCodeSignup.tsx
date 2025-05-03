// EnterCodeSignup.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../EnterCodeSignup.css";

function EnterCodeSignup() {
  const [code1, setCode1] = useState<string>("");
  const [code2, setCode2] = useState<string>("");
  const [code3, setCode3] = useState<string>("");
  const [code4, setCode4] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // ایمیل را از QueryString بگیریم
    const e = searchParams.get("email");
    if (e) {
      setEmail(e);
    }
  }, [searchParams]);

  // فراخوانی بک‌اند برای تأیید کد
  const verifyCode = async (
    emailValue: string,
    codeValue: string
  ): Promise<any> => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/accounts/register/verify-code/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, code: codeValue }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Invalid code");
    }
    return data;
  };

  // کلیک روی دکمه Verify
  const handleVerify = async (): Promise<void> => {
    setError("");
    const fullCode = code1 + code2 + code3 + code4;
    if (!email || fullCode.length < 4) {
      setError("Please fill in the 4-digit code.");
      return;
    }
    try {
      await verifyCode(email, fullCode);
      // موفق → هدایت به لاگین
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // کلیک روی دکمه Cancel
  const handleCancel = (): void => {
    // اگر بخواهیم برگردیم به صفحه ثبت‌نام
    navigate("/signup");
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
            We sent a code to{" "}
            <span style={{ fontWeight: "bold" }}>{email}</span>
          </p>

          {error && <div className="enter-code-error">{error}</div>}

          <div className="code-inputs">
            <input
              type="text"
              maxLength={1}
              value={code1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode1(e.target.value.replace(/\D/, ""))
              }
            />
            <input
              type="text"
              maxLength={1}
              value={code2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode2(e.target.value.replace(/\D/, ""))
              }
            />
            <input
              type="text"
              maxLength={1}
              value={code3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode3(e.target.value.replace(/\D/, ""))
              }
            />
            <input
              type="text"
              maxLength={1}
              value={code4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode4(e.target.value.replace(/\D/, ""))
              }
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

export default EnterCodeSignup;
