import React from 'react';

interface SliderArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}

export default function SliderArrow({ direction, onClick, disabled }: SliderArrowProps) {
  return (
    <button 
      className={`arrow ${direction}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {direction === 'left' ? '&lt;' : '&gt;'}
    </button>
  );
} 