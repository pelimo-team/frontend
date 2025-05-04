import React from "react";

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel, onSave }) => {
  return (
    <div className="actions-userprofile">
      <button
        className="btn-userprofile btn-cancel-userprofile"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        className="btn-userprofile btn-save-userprofile"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};

export default ActionButtons; 