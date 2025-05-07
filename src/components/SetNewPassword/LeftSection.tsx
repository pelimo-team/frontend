import PasswordForm from "./PasswordForm";
import { FormEvent } from "react";

interface LeftSectionProps {
  newPass: string;
  repeatPass: string;
  error: string;
  success: string;
  onNewPassChange: (value: string) => void;
  onRepeatPassChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBackToLogin: () => void;
}

const LeftSection = ({
  newPass,
  repeatPass,
  error,
  success,
  onNewPassChange,
  onRepeatPassChange,
  onSubmit,
  onBackToLogin,
}: LeftSectionProps) => {
  return (
    <div className="snp-left">
      <div className="snp-logo">
        <img src="Logo.png" alt="Logo" />
      </div>

      <PasswordForm
        newPass={newPass}
        repeatPass={repeatPass}
        error={error}
        success={success}
        onNewPassChange={onNewPassChange}
        onRepeatPassChange={onRepeatPassChange}
        onSubmit={onSubmit}
        onBackToLogin={onBackToLogin}
      />
    </div>
  );
};

export default LeftSection; 