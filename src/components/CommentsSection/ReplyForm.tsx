import React, { useState } from "react";

interface ReplyFormProps {
  onSubmit: (replyText: string) => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="پاسخ خود را بنویسید..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
      />
      <button type="submit">ارسال پاسخ</button>
    </form>
  );
};

export default ReplyForm;
