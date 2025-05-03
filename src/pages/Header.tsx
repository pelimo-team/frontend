// Header.tsx
import React, { useState } from "react";

interface City {
  id: number;
  name: string;
  province: string;
}

function Header() {
  const [address, setAddress] = useState<string>("");
  const [cityOptions, setCityOptions] = useState<City[]>([]);

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    setAddress(val);

    // اگر بخواهید فقط بعد از چند کاراکتر سرچ کنید
    if (val.length > 1) {
      try {
        const resp = await fetch(
          `http://127.0.0.1:8000/api/pages/cities/search/?q=${val}`
        );
        const data = await resp.json();
        setCityOptions(data);
      } catch (err) {
        console.error("Autocomplete error:", err);
        setCityOptions([]);
      }
    } else {
      setCityOptions([]);
    }
  };

  return (
    <div className="header">
      {/* ... لوگو، منو، غیره */}
      <div className="address-search">
        <input
          type="text"
          placeholder="Address ..."
          value={address}
          onChange={handleAddressChange}
        />
        {/* نمایش نتایج دراپ‌داون */}
        {cityOptions.length > 0 && (
          <ul className="dropdown">
            {cityOptions.map((city) => (
              <li key={city.id}>
                {city.name}, {city.province}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
