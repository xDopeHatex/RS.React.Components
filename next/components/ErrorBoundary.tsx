import React from "react";
import { TypeErrorBoundaryProps, TypeErrorBoundaryState } from "../types/types";

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
        <div className="max-w-[600px] mx-auto mt-[10%] bg-black rounded-xl text-white p-10">
          <h2>Sorry, but there is an error</h2>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
