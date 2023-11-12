import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import ErrorBoundary from "./Components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import Pages from "./Components/Pages";
import { SearchProvider } from "./store/StoreContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary data-testid="error-boundary">
      <SearchProvider>
        <BrowserRouter>
          <main className="w-screen h-screen main-bg">
            <Pages />
          </main>
        </BrowserRouter>
      </SearchProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
