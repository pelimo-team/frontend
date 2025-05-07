import React, { FormEvent } from 'react';

interface NormalSearchFormProps {
  q: string;
  onQChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const NormalSearchForm: React.FC<NormalSearchFormProps> = ({ q, onQChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>Search (name): </label>
      <input type="text" value={q} onChange={(e) => onQChange(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

export default NormalSearchForm; 