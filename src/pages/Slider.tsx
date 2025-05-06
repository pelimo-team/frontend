// Slider.tsx
import React, { useState } from "react";
import "../styles/Slider.css";
import SliderArrow from "../components/Slider/SliderArrow";
import SliderViewport from "../components/Slider/SliderViewport";

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
      <SliderArrow
        direction="left"
        onClick={prev}
        disabled={index === 0}
      />

      <SliderViewport
        items={items}
        index={index}
        visibleCount={visibleCount}
        renderItem={renderItem}
      />

      <SliderArrow
        direction="right"
        onClick={next}
        disabled={index === maxIndex}
      />
    </div>
  );
}
