import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDragDrop } from './DragDropContext';

interface DragPreviewProps {
  render: (item: any) => React.ReactNode;
}

export function DragPreview({ render }: DragPreviewProps) {
  const { state } = useDragDrop();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Create portal container on mount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Track mouse position
  useEffect(() => {
    if (!state.isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX,
        y: touch.clientY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [state.isDragging]);

  // Don't render anything if not dragging or not mounted
  if (!state.isDragging || !state.currentItem || !mounted) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      className="opacity-80 shadow-lg"
    >
      {render(state.currentItem)}
    </div>,
    document.body
  );
}