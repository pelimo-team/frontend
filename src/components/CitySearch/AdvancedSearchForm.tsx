import React, { FormEvent } from 'react';

interface AdvancedSearchFormProps {
  name: string;
  province: string;
  ordering: string;
  onNameChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onOrderingChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  name,
  province,
  ordering,
  onNameChange,
  onProvinceChange,
  onOrderingChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div>
        <label>Province: </label>
        <input
          type="text"
          value={province}
          onChange={(e) => onProvinceChange(e.target.value)}
        />
      </div>
      <div>
        <label>Ordering: </label>
        <select
          value={ordering}
          onChange={(e) => onOrderingChange(e.target.value)}
        >
          <option value="">(default: name ascending)</option>
          <option value="name">name ASC</option>
          <option value="-name">name DESC</option>
          <option value="province">province ASC</option>
          <option value="-province">province DESC</option>
        </select>
      </div>
      <button type="submit">Search Advanced</button>
    </form>
  );
};

export default AdvancedSearchForm; 