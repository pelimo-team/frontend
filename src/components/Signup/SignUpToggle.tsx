import React, { useState, useEffect } from 'react';
import '../../styles/AuthPages.css';

type ToggleButtonProps = {
  onToggle?: (role: 'manager' | 'user') => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [clickCount, setClickCount] = useState<number>(0);

  // نقش پیش‌فرض هنگام بارگذاری اولیه
  useEffect(() => {
    onToggle?.('user');
  }, []);

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
    
          {/* Uiverse toggle starts here */}
          <label className="switch">
            <input type="checkbox" onClick={handleClick} />
            <span className="slider"></span>
          </label>
          {/* Uiverse toggle ends here */}
    
          <label className="manager-label">manager</label>
        </div>
      );
};

export default ToggleButton;
