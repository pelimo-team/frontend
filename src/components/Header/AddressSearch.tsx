import React, { useState } from 'react';
import { City } from './types';
import CityDropdown from './CityDropdown';

const AddressSearch: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [cityOptions, setCityOptions] = useState<City[]>([]);

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddress(val);

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
    <div className="address-search">
      <input
        type="text"
        placeholder="Address ..."
        value={address}
        onChange={handleAddressChange}
      />
      <CityDropdown cities={cityOptions} />
    </div>
  );
};

export default AddressSearch; 