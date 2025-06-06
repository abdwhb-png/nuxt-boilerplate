export const makeReadonly = <T>(refValue: Ref<T>) => readonly(refValue);

export const getFirstChar = (str: string): string =>
    str.length > 0 ? str.charAt(0).toUpperCase() : '';

// force string type for i18n keys
export function getTranslation(key: string): string {
    const { $t } = useI18n();
    return String($t(key)) || key;
  }
  
  // Format date helper
  export const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

