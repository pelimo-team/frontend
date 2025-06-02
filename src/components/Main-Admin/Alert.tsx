import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import '../../styles/MainAdmin.css'

export type AlertType = 'success' | 'error';

interface AlertProps {
  type: AlertType;
  message: string;
  autoHide?: boolean;
  duration?: number;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  autoHide = true,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`alert-container alert-${type}`}>
      <div className="alert-icon">
        {type === 'success' ? (
          <CheckCircle size={20} />
        ) : (
          <AlertCircle size={20} />
        )}
      </div>
      <div className="alert-message">{message}</div>
      <button
        className="alert-close"
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
      >
        <X size={16} />
      </button>
      {autoHide && (
        <div className="alert-progress">
          <div 
            className="alert-progress-bar" 
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};

export default Alert;