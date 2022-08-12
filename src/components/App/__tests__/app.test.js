import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../index";

describe("App Component Tests", () => {
  it("should contain the app container", () => {
    render(<App />);
    const container = screen.getByTestId("container-element");
    expect(container).toBeInTheDocument();
  });

  it("should contain header component", () => {
    render(<App />);
    const header = screen.getByTestId("header-container");
    expect(header).toBeInTheDocument();
  });
});
