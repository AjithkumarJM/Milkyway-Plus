import React from "react";
import { render, screen } from "@testing-library/react";
import Chip from "../index";

describe("Chip Component Tests", () => {
  it("should contain the Chip container", () => {
    render(<Chip name="Test" type="primary" />);
    const chip = screen.getByTestId("ui-chip");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass("chip-primary");
  });

  it("should contain error chip component", () => {
    render(<Chip name="Error" type="error" />);

    const chip = screen.getByText("Error");
    expect(chip).toHaveClass("chip-error");
  });
});
