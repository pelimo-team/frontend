import React, { ChangeEvent } from "react";

interface FormData {
  username: string;
  national_code: string;
  gender: string;
  country: string;
  phone: string;
  birthday: string;
  email: string;
}

interface ProfileFormProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, onChange }) => {
  return (
    <div className="form-grid-userprofile">
      <div className="form-group-userprofile">
        <div>
          <label htmlFor="username">Full Name</label>
          <br />
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={onChange}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="national_code">National Code</label>
          <br />
          <input
            type="text"
            id="national_code"
            value={formData.national_code}
            onChange={onChange}
            placeholder="e.g. 0123456789"
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <br />
          <select id="gender" value={formData.gender} onChange={onChange}>
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
      </div>
      <div className="form-group-userprofile">
        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select id="country" value={formData.country} onChange={onChange}>
            <option value="">Select country</option>
            <option value="Iran">Iran</option>
            <option value="America">America</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="e.g. 09123456789"
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="birthday">Birth Day</label>
          <br />
          <input
            type="date"
            id="birthday"
            value={formData.birthday}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm; 