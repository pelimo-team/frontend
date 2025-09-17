import React, { useState, useEffect, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Error caught by boundary:", event.error);
      setError(event.error || new Error("Unknown error occurred"));
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>{error?.message || "Unknown error occurred"}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary; 