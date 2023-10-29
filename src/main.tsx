import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "./index.css";
import ErrorBoundary from "./Components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <main className="w-screen h-screen main-bg">
        <App />
      </main>
    </ErrorBoundary>
  </React.StrictMode>,
);
