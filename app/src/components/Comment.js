import React from "react";

export const Comment = ({ author, text }) => {
  return (
    <div className="comment">
      <h3>{author}</h3>
      <p>{text}</p>
    </div>
  );
};
