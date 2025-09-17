import { ChangeEvent } from "react";

interface LoginInputProps {
  type: "tel" | "password" | "text";
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  maxLength?: number;
}

const LoginInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
  showPassword,
  onTogglePassword,
  maxLength,
}: LoginInputProps) => {
  return (
    <div className="login-input-group">
      <img src={icon} alt={name} className="input-icon" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
        maxLength={maxLength}
      />
      {name === "password" && onTogglePassword && (
        <img
          src={showPassword ? "eye-slash.svg" : "eye.svg"}
          alt="Toggle"
          className="login-eye"
          onClick={onTogglePassword}
        />
      )}
    </div>
  );
};

export default LoginInput; 