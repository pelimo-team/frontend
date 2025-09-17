import SignupForm from "./SignupForm";

const SignupLayout = () => {
  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-logo">
          <img src="Logo.png" alt="Logo" />
        </div>
        <SignupForm />
      </div>

      <div className="signup-right">
        <img src="right section.jpg" alt="Burger" />
      </div>
    </div>
  );
};

export default SignupLayout; 