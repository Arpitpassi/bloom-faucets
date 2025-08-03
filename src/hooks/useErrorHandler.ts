import { useCallback } from "react";
import { useToast } from "../components/toast";

export const useErrorHandler = () => {
  const { showError } = useToast();

  const handleError = useCallback(
    (error: unknown, defaultMessage: string) => {
      const message = error instanceof Error ? error.message : defaultMessage;
      showError("Error", message);
    },
    [showError]
  );

  return { handleError };
};