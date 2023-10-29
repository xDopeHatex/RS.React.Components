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
        onClick={() => {
          this.setState({ isError: true });
        }}
      >
        Throw Error
      </button>
    );
  }
}

export default ThrowError;
