import React, { useState } from 'react';
import '../../styles/AuthPages.css';

type ToggleButtonProps = {
  onToggle?: (role: 'manager' | 'user') => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [clickCount, setClickCount] = useState<number>(0);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    const role = newCount % 2 === 1 ? 'manager' : 'user';
    onToggle?.(role);
  };

  const knobColorClass =
    clickCount % 2 === 1
      ? 'knob-green'
      : clickCount > 0
      ? 'knob-red'
      : '';

  return (
    <div
      className="signup-toggle-btn"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
    >
      <label className="user-label">normal user</label>
      <div className="toggle-container">
        <input
          className="toggle-input"
          type="checkbox"
          onClick={handleClick}
        />
        <div className="toggle-handle-wrapper">
          <div className="toggle-handle">
            <div className={`toggle-handle-knob ${knobColorClass}`}></div>
            <div className="toggle-handle-bar-wrapper">
              <div className="toggle-handle-bar"></div>
            </div>
          </div>
        </div>
        <div className="toggle-base">
          <div className="toggle-base-inside"></div>
        </div>
      </div>
      <label className="manager-label">manager</label>
    </div>
  );
};

export default ToggleButton;
