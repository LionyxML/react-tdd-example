/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import CommentFeed from "./CommentFeed";

// props factory to help us arrange tests for this component
const createProps = (props) => ({
  header: "Comment Feed",
  auth: {
    id: "user-0",
    name: "RahulMJ",
  },
  comments: [
    {
      id: "comment-0",
      author: "RahulMJ",
      text: "This is a me by me post! How tallented!",
      likes: [""],
    },
    {
      id: "comment-1",
      author: "Max Powers Jr",
      text: "Krypton sucks.",
      likes: ["user-0"],
    },
  ],
  createComment: jest.fn(),
  likeComment: jest.fn(),
  unlikeComment: jest.fn(),
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

  it("allows user to like a comment", () => {
    let props = createProps();
    let id = props.comments[0].id;
    const { getByTestId } = render(<CommentFeed {...props} />);

    const likeNode = getByTestId(id);
    fireEvent.click(likeNode);

    expect(props.likeComment).toHaveBeenCalledTimes(1);
    expect(props.likeComment).toHaveBeenCalledWith(id, props.auth);
  });

  it("allows the user to unlike a comment", () => {
    let props = createProps();
    let id = props.comments[1].id;
    const { getByTestId } = render(<CommentFeed {...props} />);

    const likeNode = getByTestId(id);
    fireEvent.click(likeNode);

    expect(props.unlikeComment).toHaveBeenCalledTimes(1);
    expect(props.unlikeComment).toHaveBeenCalledWith(id, props.auth);
  });
});
