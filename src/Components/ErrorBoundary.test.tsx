import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import { expect } from "vitest";

import { BrowserRouter } from "react-router-dom";

it("should have render", () => {
  render(
    <BrowserRouter>
      <ErrorBoundary children={<div data-testid="test-error">test</div>} />
    </BrowserRouter>,
  );
  const div = screen.getByTestId("test-error");
  expect(div).toBeInTheDocument();
});
