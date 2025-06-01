import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import SignupInput from "./SignupInput";
import ToggleButton from "./SignUpToggle";

interface FormData {
  username: string;
  password: string;
  phone: string;
  email: string;
}

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    phone: "",
    email: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      let sanitized = value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
      setFormData({ ...formData, email: sanitized });
      const re = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(re.test(sanitized) ? "" : "Invalid email address");
    } else if (name === "phone") {
      let phone = value.replace(/\D/g, "");
      if (!phone.startsWith("09") && phone.length > 0) {
        setPhoneError("Phone number must start with 09");
      } else if (phone.length !== 11 && phone.length > 0) {
        setPhoneError("Phone number must be exactly 11 digits");
      } else {
        setPhoneError("");
      }
      setFormData({ ...formData, phone });
    } else if (name === "password") {
      let pass = value.replace(/[آ-ی]/g, "");
      if (pass.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else if (!isPasswordValid(pass)) {
        setPasswordError(
          "Password must contain at least two special characters"
        );
      } else {
        setPasswordError("");
      }
      setFormData({ ...formData, password: pass });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isPasswordValid = (password: string): boolean => {
    const re = /[!@#$%^&*(),.?":{}|<>]/g;
    const matches = password.match(re);
    return matches !== null && matches.length >= 2;
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const isFormValid =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    !emailError &&
    !phoneError &&
    !passwordError;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonClicked(true);
    setErrorMessage("");

    if (isFormValid) {
      console.log("Form is valid. Sending data to /register/send-code...");
      fetch("http://127.0.0.1:8000/api/accounts/register/send-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          phone_number: formData.phone,
        }),
      })
        .then((res) =>
          res.json().then((data) => ({ status: res.status, data }))
        )
        .then(({ status, data }) => {
          if (status === 200) {
            console.log("Verification code sent to:", formData.email);
            navigate(
              `/enter-code-signup?email=${encodeURIComponent(formData.email)}`
            );
          } else {
            console.error("Register error:", data.error || data);
            setErrorMessage(data.error || "Registration failed.");
          }
        })
        .catch((err) => {
          console.error("Request failed:", err);
          setErrorMessage("Something went wrong. Please try again.");
        });
    } else {
      console.log("Form is invalid. Not sending data.");
      setErrorMessage("Please fix the errors and fill all fields correctly.");
    }
  };

  const [role, setRole] = useState<"manager" | "user" | "">("");

  const handleToggleChange = (selectedRole: "manager" | "user") => {
    setRole(selectedRole);
  };
  return (
    <div className="signup-form-box">
      <h1 className="signup-title">Sign Up</h1>
      <p className="signup-subtitle">
        Fill the information boxes for signing up
      </p>

      <form onSubmit={handleSubmit}>
        <SignupInput
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          icon="username.png"
        />

        <SignupInput
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          icon="password.png"
          showPassword={showPassword}
          onTogglePassword={togglePasswordVisibility}
          error={passwordError}
        />

        <SignupInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          icon="email.png"
          error={emailError}
        />

        <SignupInput
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          icon="phone.png"
          error={phoneError}
        />

        {errorMessage && <div className="signup-error">{errorMessage}</div>}

        <div>
          <ToggleButton onToggle={handleToggleChange} />
          {role === "manager" && <h1></h1>}
          {role === "user" && <h1></h1>}
        </div>

        <button
          type="submit"
          className={`signup-btn ${
            buttonClicked && !isFormValid ? "signup-btn-disabled" : ""
          }`}
          disabled={buttonClicked && !isFormValid}
        >
          Register
        </button>

        <p className="signup-extra" style={{ marginTop: "20px" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
