import  { FC } from "react";

interface AddCommentProps {
  // Add any props that the component might need in the future
}

const AddComment: FC<AddCommentProps> = () => {
  return (
    <div className="comments-section">
      <h3>نظرات</h3>
      {/* Comment form will go here */}
    </div>
  );
};

export default AddComment;
