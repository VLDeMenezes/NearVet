import { useState } from "react";

const useError = () => {
  const [error, setError] = useState<string | null>(null);

  const throwError = (message: string) => setError(message);
  const clearError = () => setError(null);

  return { error, throwError, clearError };
};

export default useError;
