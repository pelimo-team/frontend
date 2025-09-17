import React, { useRef, ChangeEvent } from "react";

interface ProfileHeaderProps {
  imagePreview: string | null;
  username: string;
  email: string;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  imagePreview,
  username,
  email,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
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
          onChange={onImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div className="profile-info-userprofile">
        <h2>{username || "Full Name"}</h2>
        <p>{email || "example@email.com"}</p>
      </div>
    </div>
  );
};

export default ProfileHeader; 