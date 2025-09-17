import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import ProfileHeader from "../components/UserProfile/ProfileHeader";
import ProfileForm from "../components/UserProfile/ProfileForm";
import EmailSection from "../components/UserProfile/EmailSection";
import ActionButtons from "../components/UserProfile/ActionButtons";

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
      const phoneNumber = value.replace(/[^0-9]/g, "").slice(0, 11);
      setFormData({ ...formData, phone: phoneNumber });
    } else {
      setFormData({ ...formData, [id]: value });
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
      <ProfileHeader
        imagePreview={imagePreview}
        username={formData.username}
        email={formData.email}
        onImageChange={handleImageChange}
      />

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <ProfileForm formData={formData} onChange={handleChange} />
      <EmailSection email={formData.email} />
      <ActionButtons onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
};

export default UserProfile;
