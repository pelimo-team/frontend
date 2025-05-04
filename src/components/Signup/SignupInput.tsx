import { ChangeEvent } from "react";

interface SignupInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  error?: string;
}

const SignupInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
  showPassword,
  onTogglePassword,
  error,
}: SignupInputProps) => {
  return (
    <>
      <div className="signup-input-group">
        <img src={icon} alt={name} className="input-icon" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-field"
        />
        {name === "password" && onTogglePassword && (
          <img
            src={showPassword ? "eye-slash.svg" : "eye.svg"}
            alt="Toggle"
            className="signup-eye"
            onClick={onTogglePassword}
          />
        )}
      </div>
      {error && <small className="signup-error">{error}</small>}
    </>
  );
};

export default SignupInput; 