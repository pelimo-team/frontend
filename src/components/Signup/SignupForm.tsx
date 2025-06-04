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
  const [managerImage, setManagerImage] = useState<File | null>(null);
  const [role, setRole] = useState<"manager" | "user" | "">("");

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setManagerImage(e.target.files[0]);
    }
  };

  const handleToggleChange = (selectedRole: "manager" | "user") => {
    setRole(selectedRole);
  };

  const isFormValid =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    role !== "" &&
    !emailError &&
    !phoneError &&
    !passwordError;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonClicked(true);
    setErrorMessage("");

    if (isFormValid) {
      const url = "http://127.0.0.1:8000/api/accounts/register/send-code/";

      let body: BodyInit;
      let headers: HeadersInit = {};

      if (role === "manager" && managerImage) {
        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone_number", formData.phone);
        formDataToSend.append("id_card_image", managerImage);
        formDataToSend.append("role", "manager");
        console.log("FormData entries:");
        for (let pair of formDataToSend.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        body = formDataToSend;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          phone_number: formData.phone,
          role: role,
        });
      }
      console.log("Submitting with role:", role);

      fetch(url, {
        method: "POST",
        headers,
        body,
      })
        .then((res) =>
          res.json().then((data) => ({ status: res.status, data }))
        )
        .then(({ status, data }) => {
          if (status === 200) {
            navigate(
              `/enter-code-signup?email=${encodeURIComponent(formData.email)}`
            );
          } else {
            setErrorMessage(data.error || "Registration failed.");
          }
        })
        .catch((err) => {
          console.error("Request failed:", err);
          setErrorMessage("Something went wrong. Please try again.");
        });
    } else {
      setErrorMessage("Please fix the errors and fill all fields correctly.");
    }
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
        <h1 className="upload_label">upload your documents</h1>
        {role === "manager" && (
          <div className="signup-upload">
            <input
              type="file"
              name="managerImage"
              id="managerImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        )}

        {errorMessage && <div className="signup-error">{errorMessage}</div>}

        <div>
          <ToggleButton onToggle={handleToggleChange} />
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
