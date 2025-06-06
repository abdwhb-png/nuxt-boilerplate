import type { Form, FormError } from "#ui/types";
import { FetchError } from "ofetch";

// Error code constants
const ERROR_CODES = {
  VALIDATION: 422,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// Type definitions
interface ValidationErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

interface SanctumErrorResult {
  isValidationError: boolean;
  isFetchError: boolean;
  code: number;
  bag: FormError[];
  errorMessage: string;
  rawError: unknown;
  searchForError: (field: string) => boolean;
  setFormErrors: <T extends object>(form: Form<T>, showToast?: boolean) => void;
}

/**
 * Maps Laravel validation errors to form errors format
 */
function mapValidationErrors(errors: Record<string, string[]>): FormError[] {
  return Object.entries(errors).map(([key, messages]) => ({
    name: key,
    message: messages[0] ?? "",
  }));
}

/**
 * Extracts error message from various error formats with i18n support
 */
function extractErrorMessage(error: unknown): string {
  const { $t } = useI18n();

  if (error instanceof FetchError) {
    const responseData = error.response?._data as ValidationErrorResponse;
    if (responseData?.message) {
      return responseData.message;
    }
    return String($t("common.smw"));
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return String($t("common.smw"));
}

/**
 * Analyzes Sanctum/Laravel API errors and provides utilities for handling them
 */
export const useSanctumError = (error: unknown): SanctumErrorResult => {
  const { $t } = useI18n();
  const isFetchError = error instanceof FetchError;
  const isValidationError =
    isFetchError && error.response?.status === ERROR_CODES.VALIDATION;

  // Extract error code
  const code = isFetchError
    ? error.response?.status ?? ERROR_CODES.SERVER_ERROR
    : ERROR_CODES.SERVER_ERROR;

  // Extract validation errors
  const validationErrors = isValidationError
    ? (error.response?._data as ValidationErrorResponse)?.errors ?? {}
    : {};

  const bag: FormError[] = mapValidationErrors(validationErrors);

  // Extract error message
  const errorMessage = extractErrorMessage(error);

  // Utility function to search for specific field errors
  const searchForError = (field: string): boolean => {
    return bag.some((error) => error.name === field);
  };

  // Helper function to set form errors and show toasts
  const setFormErrors = <T extends object>(
    form: Form<T>,
    showToast: boolean = true
  ): void => {
    const toastStore = useToastStore();
    if (isValidationError && bag.length > 0) {
      form?.setErrors(bag);
      if (showToast) {
        toastStore.error(
          String($t("common.checkFormErrors")),
          "Validation Error"
        );
      }
    } else {
      if (showToast) {
        toastStore.error(errorMessage, "Error");
      }
    }
  };

  return {
    isValidationError,
    isFetchError,
    code,
    bag,
    errorMessage,
    rawError: error,
    searchForError,
    setFormErrors,
  };
};
