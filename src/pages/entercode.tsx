// entercode.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../EnterCode.css";
import LogoSection from "../components/EnterCode/LogoSection";
import CodeInputSection from "../components/EnterCode/CodeInputSection";
import RightSection from "../components/EnterCode/RightSection";

function EnterCode() {
  const [email, setEmail] = useState<string>("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const e = searchParams.get("email");
    if (e) {
      setEmail(e);
    }
  }, [searchParams]);

  return (
    <div className="enter-code-container">
      {/* Left column */}
      <div className="enter-code-left">
        <LogoSection />
        <CodeInputSection email={email} />
      </div>

      {/* Right column */}
      <RightSection />
    </div>
  );
}

export default EnterCode;
