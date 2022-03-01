import React, { useState } from "react";
import { Comment } from "../components/Comment";

const CommentFeed = ({ header, comments, createComment }) => {
  const [formData, setFormData] = useState({
    author: "",
    text: "",
  });

  const renderComments = () =>
    comments.map((comment, index) => <Comment key={index} {...comment} />);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { author, text } = formData;
    createComment({ author, text });
  };

  return (
    <div className="comment-feed">
      <h2>{header}</h2>

      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="author">
          Author
          <input id="author" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="text">
          Comment
          <input id="text" type="text" onChange={handleChange} />
        </label>

        <button type="submit">Submit Comment</button>
      </form>

      <div className="comment-list">{renderComments()}</div>
    </div>
  );
};

export default CommentFeed;
