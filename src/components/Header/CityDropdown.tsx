import React from 'react';
import { City } from './types';

interface CityDropdownProps {
  cities: City[];
}

const CityDropdown: React.FC<CityDropdownProps> = ({ cities }) => {
  if (cities.length === 0) return null;

  return (
    <ul className="dropdown">
      {cities.map((city) => (
        <li key={city.id}>
          {city.name}, {city.province}
        </li>
      ))}
    </ul>
  );
};

export default CityDropdown; 