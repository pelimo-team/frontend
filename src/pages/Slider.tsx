// Slider.tsx
import React, { useState } from "react";
import "../Slider.css";

interface SliderProps<T> {
  items: T[];
  visibleCount?: number;
  renderItem: (item: T) => React.ReactNode;
}

export default function Slider<T>({
  items,
  visibleCount = 2,
  renderItem,
}: SliderProps<T>) {
  const [index, setIndex] = useState(0);
  const maxIndex = items.length - visibleCount;

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <div className="slider-wrapper">
      <button className="arrow left" onClick={prev} disabled={index === 0}>
        &lt;
      </button>

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

      <button
        className="arrow right"
        onClick={next}
        disabled={index === maxIndex}
      >
        &gt;
      </button>
    </div>
  );
}
