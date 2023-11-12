import { render, screen } from "@testing-library/react";
import App from "./App";
import { expect } from "vitest";

import { BrowserRouter } from "react-router-dom";

it("should have render", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const div = screen.getAllByRole("heading");
  expect(div.length).toBe(1);
});
