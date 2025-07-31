import React from "react";
import { FiCoffee, FiShoppingCart, FiPackage, FiInfo } from "react-icons/fi";

interface PanelProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  active?: boolean;
  icon?: "coffee" | "shopping-cart" | "package" | "info";
  children?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ 
  title, 
  disabled = false, 

  active = false,
  icon,
  children 
}) => {
  const getIcon = () => {
    switch (icon) {
      case "coffee":
        return <FiCoffee />;
      case "shopping-cart":
        return <FiShoppingCart />;
      case "package":
        return <FiPackage />;
      case "info":
        return <FiInfo />;
      default:
        return null;
    }
  };

  if (disabled) {
    return (
      <div className="disabled-panel">
        <div className="disabled-panel-icon">
          {getIcon() && React.cloneElement(getIcon()!, { className: "panel-icon" })}
        </div>
        <h3 className="disabled-panel-title">{title}</h3>
        <p className="disabled-panel-message">
          This feature is only available to approved managers.
        </p>
      </div>
    );
  }

  return (
    <div className={`panel ${active ? "active" : ""}`}>
      {children}
    </div>
  );
};

export default Panel; 