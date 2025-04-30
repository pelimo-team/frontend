import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useDragDrop } from './DragDropContext';

interface DropZoneProps {
  id: string;
  accept: string[];
  onDrop: (item: any, sourceContainerId: string | null) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  highlightClassName?: string;
}

export function DropZone({
  id,
  accept,
  onDrop,
  children,
  className = '',
  disabled = false,
  highlightClassName = 'border-2 border-dashed border-blue-500 bg-blue-50',
}: DropZoneProps) {
  const { state, endDrag } = useDragDrop();
  const [isOver, setIsOver] = useState(false);
  const [isValidItem, setIsValidItem] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Check if current dragged item is accepted by this drop zone
  useEffect(() => {
    if (state.isDragging && state.currentItem) {
      setIsValidItem(accept.includes(state.currentItem.type));
    } else {
      setIsValidItem(false);
    }
  }, [state.isDragging, state.currentItem, accept]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled || !isValidItem) return;
    
    // Prevent default to allow drop
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!isOver) {
      setIsOver(true);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled || !isValidItem) return;
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Only consider it a leave if we're leaving the drop zone itself,
    // not just moving between its children
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled || !isValidItem) return;
    
    e.preventDefault();
    setIsOver(false);
    
    try {
      const item = JSON.parse(e.dataTransfer.getData('application/json'));
      onDrop(item, state.sourceContainerId);
      endDrag();
    } catch (error) {
      console.error('Error parsing drop data:', error);
    }
  };

  // For touch devices
  useEffect(() => {
    if (!dropZoneRef.current) return;
    
    const element = dropZoneRef.current;
    
    const handleTouchOver = (e: TouchEvent) => {
      if (disabled || !state.isDragging || !isValidItem) return;
      
      const touch = e.touches[0];
      const elementRect = element.getBoundingClientRect();
      
      // Check if touch is over this element
      if (
        touch.clientX >= elementRect.left &&
        touch.clientX <= elementRect.right &&
        touch.clientY >= elementRect.top &&
        touch.clientY <= elementRect.bottom
      ) {
        if (!isOver) {
          setIsOver(true);
        }
      } else if (isOver) {
        setIsOver(false);
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (disabled || !state.isDragging || !isValidItem || !isOver) return;
      
      const touch = e.changedTouches[0];
      const elementRect = element.getBoundingClientRect();
      
      // Check if touch ended over this element
      if (
        touch.clientX >= elementRect.left &&
        touch.clientX <= elementRect.right &&
        touch.clientY >= elementRect.top &&
        touch.clientY <= elementRect.bottom
      ) {
        if (state.currentItem) {
          onDrop(state.currentItem, state.sourceContainerId);
          endDrag();
        }
      }
      
      setIsOver(false);
    };
    
    document.addEventListener('touchmove', handleTouchOver, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchmove', handleTouchOver);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, state, isValidItem, isOver, onDrop, endDrag]);

  return (
    <div
      ref={dropZoneRef}
      className={`
        ${className}
        ${isOver && isValidItem && !disabled ? highlightClassName : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        transition-all duration-200
      `}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-dropeffect={disabled ? 'none' : 'move'}
    >
      {children}
    </div>
  );
}