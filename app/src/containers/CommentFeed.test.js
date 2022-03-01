/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import CommentFeed from "./CommentFeed";

describe("CommentFeed", () => {
  let props = { header: "Comment Feed", comments: [] };

  it("renders the CommentFeed component", () => {
    const { queryByText } = render(<CommentFeed {...props} />);
    const header = queryByText("Comment Feed");
    expect(header.innerHTML).toBe(props.header);
  });

  it("renders the comment list", () => {
    const { container } = render(<CommentFeed {...props} />);
    const commentNodes = container.querySelectorAll(".comment");
    expect(commentNodes.length).toBe(props.comments.length);
  });

  it("renders the comment list with some entries", () => {
    let comments = [
      {
        author: "Alan Watts",
        text: "Trying to define yourself is like trying to bite your own teeth",
      },
      {
        author: "Eckhart Tolle",
        text: "Life is now. There was never a time when your life was not now, nor will there ever be.",
      },
    ];
    props = { header: "Comment Feed", comments };
    const { container } = render(<CommentFeed {...props} />);
    const commentNodes = container.querySelectorAll(".comment");
    expect(commentNodes.length).toBe(props.comments.length);
  });
});
