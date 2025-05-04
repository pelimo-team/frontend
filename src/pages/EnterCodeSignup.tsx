// EnterCodeSignup.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../EnterCodeSignup.css";
import LogoBox from "../components/EnterCodeSignup/LogoBox";
import VerificationForm from "../components/EnterCodeSignup/VerificationForm";
import RightSection from "../components/EnterCodeSignup/RightSection";

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
      <div className="enter-code-left">
        <LogoBox />
        <VerificationForm
          email={email}
          error={error}
          code1={code1}
          code2={code2}
          code3={code3}
          code4={code4}
          setCode1={setCode1}
          setCode2={setCode2}
          setCode3={setCode3}
          setCode4={setCode4}
          onVerify={handleVerify}
          onCancel={handleCancel}
        />
      </div>
      <RightSection />
    </div>
  );
}

export default EnterCodeSignup;
