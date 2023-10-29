import { Component, ReactElement } from "react";

class ThrowError extends Component {
  state = {
    isError: false,
  };

  componentDidUpdate() {
    if (this.state.isError) {
      throw new Error("Test ErrorBoundary");
    }
  }

  render(): ReactElement {
    return (
      <button
        className="rounded-xl shadow-lg border-1 border-red-300 bg-red-100 px-4 py-2 hover:bg-red-400 transition-all active:translate-y-[5px] max-w-[200px] mx-auto"
        onClick={() => {
          this.setState({ isError: true });
        }}
      >
        error button
      </button>
    );
  }
}

export default ThrowError;
