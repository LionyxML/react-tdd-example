import React from "react";
import { Comment } from "../components/Comment";

const CommentFeed = ({ header, comments }) => {
  const renderComments = () =>
    comments.map((comment, index) => <Comment key={index} {...comment} />);

  return (
    <div className="comment-feed">
      <h2>{header}</h2>
      <div className="comment-list">{renderComments()}</div>
    </div>
  );
};

export default CommentFeed;
