"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }


  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }


  componentDidCatch(error: Error) {
    console.log("Error:", error);
  }


  render() {

    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <div className="bg-white p-8 rounded-xl shadow text-center">

            <h1 className="text-2xl font-bold text-red-600">
              Something went wrong 😕
            </h1>

            <p className="mt-3 text-gray-600">
              Please refresh the page and try again.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Refresh
            </button>

          </div>
        </div>
      );
    }


    return this.props.children;
  }
}

export default ErrorBoundary;