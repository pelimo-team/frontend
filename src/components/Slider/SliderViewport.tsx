import React from 'react';

interface SliderViewportProps<T> {
  items: T[];
  index: number;
  visibleCount: number;
  renderItem: (item: T) => React.ReactNode;
}

export default function SliderViewport<T>({
  items,
  index,
  visibleCount,
  renderItem,
}: SliderViewportProps<T>) {
  return (
    <div className="viewport">
      <div
        className="slider"
        style={{
          transform: `translateX(-${(index * 100) / visibleCount}%)`,
        }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="slider-item">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
} 