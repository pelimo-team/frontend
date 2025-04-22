import React, { useState } from "react";
import "./UserProfile.css";
import { useNavigate } from 'react-router-dom';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    nationalCode: "",
    gender: "",
    country: "",
    phone: "",
    birthDate: "",
    email: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
  };

  return (
    <div className="container-userprofile">
      <div className="profile-userprofile">
        <div className="avatar-userprofile"></div>
        <div className="profile-info-userprofile">
          <h2>{formData.fullName || "Full Name"}</h2>
          <p>{formData.email || "example@email.com"}</p>
        </div>
      </div>

      <div className="form-grid-userprofile">
        <div className="form-group-userprofile">
          <div>
            <label htmlFor="fullName">Full Name</label><br></br>
            <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" />
          </div>
          <div>
            <label htmlFor="nationalCode">National Code</label><br></br>
            <input type="text" id="nationalCode" value={formData.nationalCode} onChange={handleChange} placeholder="e.g. 0123456789" />
          </div>
          <div>
            <label htmlFor="gender">Gender</label><br></br>
            <select id="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select gender</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
        </div>
        <div className="form-group-userprofile">
          <div>
            <label htmlFor="country">Country</label><br></br>
            <select id="country" value={formData.country} onChange={handleChange}>
              <option value="">Select country</option>
              <option>America</option>
              <option>Canada</option>
              <option>UK</option>
              <option>Iran</option>
            </select>
          </div>
          <div>
            <label htmlFor="phone">Phone</label><br></br>
            <input type="text" id="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 09123456789" />
          </div>
          <div>
            <label htmlFor="birthDate">Birth Day</label><br></br>
            <input type="date" id="birthDate" value={formData.birthDate} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="email-section-userprofile">
        <h5>My Email Address</h5>
        <div className="email-box-userprofile">
          <span>
            <img src="public/email.svg" alt="email icon" style={{ width: "25px", height: "25px", marginRight: "10px" }} />
          </span>
          <div className="email-information-userprofile">
            <p style={{ marginTop: "10px" }}>{formData.email || "example@email.com"}</p>
            <p style={{ fontSize: "small", color: "gray" }}>1 month ago</p>
          </div>
        </div>
        <button className="btn-userprofile btn-addemail-userprofile" style={{ marginTop: "10px", backgroundColor: "#e0eaff" }}>
          + Add Email Address
        </button>
      </div>

      <div className="actions-userprofile">
        <button className="btn-userprofile btn-cancel-userprofile" onClick={() => navigate("/")}>Cancel</button>
        <button className="btn-userprofile btn-save-userprofile" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default UserProfile;