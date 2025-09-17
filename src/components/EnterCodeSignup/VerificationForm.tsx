import React from 'react';
import CodeInputs from './CodeInputs';

interface VerificationFormProps {
  email: string;
  error: string;
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  setCode1: (value: string) => void;
  setCode2: (value: string) => void;
  setCode3: (value: string) => void;
  setCode4: (value: string) => void;
  onVerify: () => void;
  onCancel: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  error,
  code1,
  code2,
  code3,
  code4,
  setCode1,
  setCode2,
  setCode3,
  setCode4,
  onVerify,
  onCancel,
}) => {
  return (
    <div className="enter-code-box">
      <h1 className="enter-code-title">ENTER VERIFICATION CODE</h1>
      <p className="enter-code-subtitle">
        We sent a code to <span style={{ fontWeight: "bold" }}>{email}</span>
      </p>

      {error && <div className="enter-code-error">{error}</div>}

      <CodeInputs
        code1={code1}
        code2={code2}
        code3={code3}
        code4={code4}
        setCode1={setCode1}
        setCode2={setCode2}
        setCode3={setCode3}
        setCode4={setCode4}
      />

      <div className="button-group">
        <button className="cancel-btn" onClick={onCancel}>
          cancel
        </button>
        <button className="verify-btn" onClick={onVerify}>
          verify
        </button>
      </div>
    </div>
  );
};

export default VerificationForm; 