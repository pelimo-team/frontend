import React, { useRef, useState, ReactNode } from 'react';
import { useDragDrop, DragItem } from './DragDropContext';
import "../../styles/Model.css"

interface DraggableProps {
  id: string;
  type: string;
  data?: any;
  containerId: string;
  children: ReactNode;
  className?: string;
  previewComponent?: ReactNode;
  disabled?: boolean;
}

export function Draggable({
  id,
  type,
  data,
  containerId,
  children,
  className = '',
  previewComponent,
  disabled = false,
}: DraggableProps) {
  const { startDrag, cancelDrag } = useDragDrop();
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const dragTimeoutRef = useRef<number | null>(null);
  const initialPosition = useRef<{ x: number; y: number } | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Create a custom drag image if provided
    if (previewComponent && elementRef.current) {
      const preview = document.createElement('div');
      preview.style.position = 'absolute';
      preview.style.top = '-1000px';
      preview.style.opacity = '0.8';
      document.body.appendChild(preview);
      
      // Set the custom drag image
      e.dataTransfer.setDragImage(preview, 0, 0);
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(preview);
      }, 0);
    }

    e.dataTransfer.effectAllowed = 'move';
    
    // Set the drag data
    e.dataTransfer.setData('application/json', JSON.stringify({
      id,
      type,
      data,
      containerId,
    }));

    const item: DragItem = { id, type, data };
    startDrag(item, containerId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // For touch devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const touch = e.touches[0];
    initialPosition.current = { x: touch.clientX, y: touch.clientY };
    
    // Start drag after a short delay to avoid accidental drags
    dragTimeoutRef.current = window.setTimeout(() => {
      if (initialPosition.current) {
        const item: DragItem = { id, type, data };
        startDrag(item, containerId);
        setIsDragging(true);
      }
    }, 150);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!initialPosition.current || !elementRef.current || disabled) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - initialPosition.current.x;
    const deltaY = touch.clientY - initialPosition.current.y;
    
    // Apply the transform to move the element
    elementRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    elementRef.current.style.opacity = '0.8';
    elementRef.current.style.zIndex = '100';
  };

  const handleTouchEnd = () => {
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
      dragTimeoutRef.current = null;
    }
    
    if (elementRef.current) {
      elementRef.current.style.transform = '';
      elementRef.current.style.opacity = '';
      elementRef.current.style.zIndex = '';
    }
    
    initialPosition.current = null;
    setIsDragging(false);
    cancelDrag();
  };

  return (
    <div
      ref={elementRef}
      draggable={!disabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`draggable ${className} ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
      aria-roledescription="draggable"
      aria-grabbed={isDragging}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
}