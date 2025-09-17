import React from 'react';
import { SearchMode } from './types';

interface SearchModeSelectorProps {
  currentMode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
}

const SearchModeSelector: React.FC<SearchModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <button
        onClick={() => onModeChange("normal")}
        disabled={currentMode === "normal"}
      >
        Normal search
      </button>
      <button
        onClick={() => onModeChange("advanced")}
        disabled={currentMode === "advanced"}
      >
        Advanced search
      </button>
    </div>
  );
};

export default SearchModeSelector; 