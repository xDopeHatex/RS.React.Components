import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import { expect } from "vitest";

import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import { Provider } from "react-redux";

it("should have render", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary children={<div data-testid="test-error">test</div>} />
      </BrowserRouter>
    </Provider>,
  );
  const div = screen.getByTestId("test-error");
  expect(div).toBeInTheDocument();
});
