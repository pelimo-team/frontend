import { FormEvent } from "react";

interface PasswordFormProps {
  newPass: string;
  repeatPass: string;
  error: string;
  success: string;
  onNewPassChange: (value: string) => void;
  onRepeatPassChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBackToLogin: () => void;
}

const PasswordForm = ({
  newPass,
  repeatPass,
  error,
  success,
  onNewPassChange,
  onRepeatPassChange,
  onSubmit,
  onBackToLogin,
}: PasswordFormProps) => {
  return (
    <div className="snp-box">
      <h1 className="snp-title">CHANGE PASSWORD</h1>
      <p className="snp-subtitle">
        Set new password must be at least 8 characters
      </p>

      {error && <div className="snp-error">{error}</div>}
      {success && <div className="snp-success">{success}</div>}

      <form onSubmit={onSubmit}>
        <div className="snp-input-group">
          <img src="password.png" alt="Password" className="input-icon" />
          <input
            placeholder="New Password"
            type="password"
            value={newPass}
            onChange={(e) => onNewPassChange(e.target.value)}
          />
        </div>

        <div className="snp-input-group">
          <img src="password.png" alt="Password" className="input-icon" />
          <input
            placeholder="Repeat Password"
            type="password"
            value={repeatPass}
            onChange={(e) => onRepeatPassChange(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            className="snp-back"
            onClick={onBackToLogin}
          >
            back to login
          </button>
          <button type="submit" className="snp-submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm; 