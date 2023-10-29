import React from "react";
import { TypeErrorBoundaryProps, TypeErrorBoundaryState } from "./types";

class ErrorBoundary extends React.Component<
  TypeErrorBoundaryProps,
  TypeErrorBoundaryState
> {
  constructor(props: TypeErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Sorry, but there is an error</h2>
          <p>{this?.state?.error?.toString()}</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
