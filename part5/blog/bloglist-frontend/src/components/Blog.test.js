import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "localhost",
    author: "buttnuster",
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);

  // tapa 1
  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library buttnuster"
  );

  // tapa 2
  const element = component.getByText(
    "Component testing is done with react-testing-library buttnuster"
  );
  expect(element).toBeDefined();

  // tapa 3
  const div = component.container.querySelector(".compact-blog");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library buttnuster"
  );
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = jest.fn();

  {
    /* const component = render(<Note note={note} toggleImportance={mockHandler} />); */
  }

  // const button = component.getByText("make not important");
  // fireEvent.click(button);

  // expect(mockHandler.mock.calls).toHaveLength(1);
});
