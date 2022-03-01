/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import CommentFeed from "./CommentFeed";

describe("CommentFeed", () => {
  const props = { header: "Comment Feed", comments: [] };

  it("renders the CommentFeed component", () => {
    const { queryByText } = render(<CommentFeed {...props} />);
    const header = queryByText("Comment Feed");
    expect(header.innerHTML).toBe(props.header);
  });

  it("renders the comment list", () => {
    const { container } = render(<CommentFeed {...props} />);
    const commentNodes = container.querySelectorAll(".Comment");
    expect(commentNodes.length).toBe(props.comments.length);
  });
});