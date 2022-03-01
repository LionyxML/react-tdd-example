import React from "react";

export const Comment = ({ author, text, id, onLike }) => {
  return (
    <div className="comment">
      <h3>{author}</h3>
      <p>{text}</p>
      <button data-testid={id} onClick={() => onLike(id, author)}>
        Like
      </button>
    </div>
  );
};
