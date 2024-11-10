import { render, screen } from "@testing-library/react";
import React from "react";

import App2 from "../src/App2";

import "@testing-library/jest-dom";

describe("Application", () => {
  it("renders", () => {
    render(<App2 />);
    expect(screen.getByRole("heading")).toHaveTextContent("Plan My Escape!");
  });
});
