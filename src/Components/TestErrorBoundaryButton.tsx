import { useState, useEffect } from "react";

const ThrowError = () => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      throw new Error("Test ErrorBoundary");
    }
  }, [isError]);

  return (
    <button
      className="rounded-xl shadow-lg border-1 border-red-300 bg-red-100 px-4 py-2 hover:bg-red-400 transition-all active:translate-y-[5px] max-w-[200px] mx-auto"
      onClick={() => setIsError(true)}
    >
      error button
    </button>
  );
};

export default ThrowError;
