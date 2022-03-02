import React from "react";

export const Comment = ({
  author,
  text,
  id,
  onLike,
  onDislike,
  likes,
  currentUser,
}) => {
  const isLiked = likes && likes.includes(currentUser.id);
  const onClick = isLiked ? () => onDislike(id) : () => onLike(id);

  return (
    <div className="comment">
      <h3>{author}</h3>
      <p>{text}</p>
      <button data-testid={id} onClick={onClick}>
        {isLiked ? "Unlike" : "Like"}
      </button>
    </div>
  );
};
