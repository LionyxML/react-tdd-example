/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import CommentFeed from "./CommentFeed";

// props factory to help us arrange tests for this component
const createProps = (props) => ({
  header: "Comment Feed",
  comments: [
    {
      author: "Ian Wilson",
      text: "A boats a boat but a mystery box could be anything.",
    },
    {
      author: "Max Powers Jr",
      text: "Krypton sucks.",
    },
  ],
  createComment: jest.fn(),
  ...props,
});

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

  it("allows the user to add a comment", () => {
    // Since we are validating behaviour:
    // Arrange - create props and locate elements
    const newComment = { author: "Socrates", text: "Why?" };
    let props = createProps();
    const { container, getByLabelText } = render(<CommentFeed {...props} />);
    const authorNode = getByLabelText("Author");
    const textNode = getByLabelText("Comment");
    const formNode = container.querySelector("form");

    // Act - simulates changes to elements
    fireEvent.change(authorNode, {
      target: { value: newComment.author },
    });
    fireEvent.change(textNode, {
      target: { value: newComment.text },
    });
    fireEvent.submit(formNode);

    // Assert - check if the desired functions were called
    expect(props.createComment).toHaveBeenCalledTimes(1);
    expect(props.createComment).toHaveBeenCalledWith(newComment);
  });
});
