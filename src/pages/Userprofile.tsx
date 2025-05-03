import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../UserProfile.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface FormData {
  username: string;
  national_code: string;
  gender: string;
  country: string;
  phone: string;
  birthday: string;
  email: string;
  profile_image: File | null;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    national_code: "",
    gender: "",
    country: "",
    phone: "",
    birthday: "",
    email: "",
    profile_image: null,
  });
  const [message, setMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const { phone_number } = JSON.parse(userData);
          const response = await fetch(
            `http://127.0.0.1:8000/api/accounts/customer/${phone_number}/`,
            {
              credentials: "include",
            }
          );
          if (response.ok) {
            const data = await response.json();
            setFormData({
              username: data.username || "",
              national_code: data.national_code || "",
              gender: data.gender || "",
              country: data.country || "",
              phone: phone_number || "",
              birthday: data.birthday || "",
              email: data.email || "",
              profile_image: null,
            });
            if (data.profile_image) {
              setImagePreview(`http://127.0.0.1:8000${data.profile_image}`);
            }
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setMessage("Error loading user data");
      }
    };

    loadUserData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === "phone") {
      // Only allow numbers and limit to 11 digits for phone
      const phoneNumber = value.replace(/[^0-9]/g, "").slice(0, 11);
      setFormData({ ...formData, phone: phoneNumber });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profile_image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSave = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setMessage("Please log in first");
        return;
      }

      const { phone_number } = JSON.parse(userData);

      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("national_code", formData.national_code);
      formDataToSend.append("gender", formData.gender.toLowerCase());
      formDataToSend.append("country", formData.country);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("birthday", formData.birthday);
      formDataToSend.append("email", formData.email);
      if (formData.profile_image) {
        formDataToSend.append("profile_image", formData.profile_image);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/accounts/customer/update/${phone_number}/`,
        {
          method: "PUT",
          credentials: "include",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setMessage("Profile updated successfully!");
        // Navigate to homepage after successful update
        setTimeout(() => navigate("/"), 1000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Error updating profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Error saving profile");
    }
  };

  return (
    <div className="container-userprofile">
      <div className="profile-userprofile">
        <div className="avatar-userprofile" onClick={handleImageClick}>
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" className="profile-image" />
          ) : (
            <div className="avatar-placeholder">
              <img src="public/coffee shop.png" alt="Default" />
            </div>
          )}
          <div className="avatar-overlay">
            <span>Change Photo</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
        <div className="profile-info-userprofile">
          <h2>{formData.username || "Full Name"}</h2>
          <p>{formData.email || "example@email.com"}</p>
        </div>
      </div>

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <div className="form-grid-userprofile">
        <div className="form-group-userprofile">
          <div>
            <label htmlFor="username">Full Name</label>
            <br></br>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="national_code">National Code</label>
            <br></br>
            <input
              type="text"
              id="national_code"
              value={formData.national_code}
              onChange={handleChange}
              placeholder="e.g. 0123456789"
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <br></br>
            <select id="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>
        <div className="form-group-userprofile">
          <div>
            <label htmlFor="country">Country</label>
            <br></br>
            <select
              id="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select country</option>
              <option value="Iran">Iran</option>
              <option value="America">America</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <br></br>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 09123456789"
              maxLength={11}
            />
          </div>
          <div>
            <label htmlFor="birthday">Birth Day</label>
            <br></br>
            <input
              type="date"
              id="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

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
              {formData.email || "No email added yet"}
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

      <div className="actions-userprofile">
        <button
          className="btn-userprofile btn-cancel-userprofile"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn-userprofile btn-save-userprofile"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
