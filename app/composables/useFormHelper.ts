import { z } from "zod";
import type { FormSubmitEvent, Form } from "#ui/types";

interface UseFormHelperOptions<T> {
  initialState: T;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * A lightweight form helper that complements existing patterns
 * Provides utilities for form state management and error handling
 */
export function useFormHelper<T extends Record<string, unknown>>(
  schema: z.ZodType<T>,
  options: UseFormHelperOptions<T>
) {
  const { initialState, onSuccess, onError } = options;
  const toastStore = useToastStore();

  // Reactive form state
  const state = reactive<T>({ ...initialState });
  const isLoading = ref(false);
  const formRef = ref<Form<T>>();

  // Validation helpers
  const validate = () => {
    try {
      schema.parse(state);
      return { success: true, data: state, errors: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        return { success: false, data: null, errors };
      }
      return { success: false, data: null, errors: null };
    }
  };

  // Error handling helper
  const handleError = (
    error: unknown,
    defaultMessage = "An error occurred",
    defaultTitle = "Error"
  ) => {
    const sanctumError = useSanctumError(error);

    if (sanctumError.isValidationError && formRef.value) {
      sanctumError.setFormErrors(formRef);
    } else {
      toastStore.error(sanctumError.errorMessage || defaultMessage, defaultTitle);
    }

    if (onError) {
      onError(error);
    }
  };

  // Success handling helper
  const handleSuccess = (message = "Operation completed successfully") => {
    toastStore.success(message);
    if (onSuccess) {
      onSuccess();
    }
  };

  // Form submission wrapper
  const withLoading = async (asyncFn: () => Promise<void>) => {
    if (isLoading.value) return;

    formRef.value?.clear();
    isLoading.value = true;

    try {
      await asyncFn();
    } finally {
      isLoading.value = false;
    }
  };

  // Reset form to initial state
  const reset = () => {
    Object.assign(state, initialState);
    formRef.value?.clear();
  };

  // Update specific field
  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    (state as T)[key] = value;
  };

  return {
    // State
    state: readonly(state),
    isLoading: readonly(isLoading),
    formRef,

    // Helpers
    validate,
    handleError,
    handleSuccess,
    withLoading,
    reset,
    setField,

    // Computed
    hasErrors: computed(() => (formRef.value?.getErrors().length ?? 0) > 0),
  };
}
