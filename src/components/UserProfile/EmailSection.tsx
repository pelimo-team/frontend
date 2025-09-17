import React from "react";

interface EmailSectionProps {
  email: string;
}

const EmailSection: React.FC<EmailSectionProps> = ({ email }) => {
  return (
    <div className="email-section-userprofile">
      <h5>My Email Address</h5>
      <div className="email-box-userprofile">
        <span>
          <img
            src="public/email.svg"
            alt="email icon"
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
          />
        </span>
        <div className="email-information-userprofile">
          <p style={{ marginTop: "10px" }}>
            {email || "No email added yet"}
          </p>
          <p style={{ fontSize: "small", color: "gray" }}>Primary Email</p>
        </div>
      </div>
      <button
        className="btn-userprofile btn-addemail-userprofile"
        style={{ marginTop: "10px", backgroundColor: "#e0eaff" }}
      >
        + Add Email Address
      </button>
    </div>
  );
};

export default EmailSection; 