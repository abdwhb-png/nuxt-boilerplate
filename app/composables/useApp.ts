import type { SiteConfig } from "~/types/models";

export const useApp = () => {
  const runtimeConfig = useRuntimeConfig();
  const sanctumClient = useSanctumClient();
  const appStore = useAppStore();

  // Computed properties
  const appName = computed(() => appStore.appName || runtimeConfig.public.appName)

  const fetchConfig = async (force = false) => {
    // Skip fetch if data is fresh and force is false
    if (!force && !appStore.needsRefresh) {
      console.log("Using cached website config");
    }

    // Update loading state and clear previous errors
    appStore.setLoading(true);
    appStore.clearErrors();

    try {
      const data = await sanctumClient("/api/site-config");

      if (data) {
        appStore.setConfig(data as SiteConfig);
        appStore.setLastFetched();
      } else {
        appStore.setConfig({} as SiteConfig);
        throw new Error("Invalid config data structure");
      }
    } catch (err) {
      appStore.setError(err as Error);
      console.error("Failed to fetch website config:", appStore.errors);
      throw appStore.errors;
    } finally {
      appStore.setLoading(false);
    }
  };

  const fetchFeatures = async () => {
    return await sanctumClient("/api/features");
  };

  const fetchTermsOfService = async () => {
    return await sanctumClient("/api/terms-of-service");
  };

  const fetchPrivacyPolicy = async () => {
    return await sanctumClient("/api/privacy-policy");
  };

  return {
    // Reactive app data from store
    config: readonly(computed(() => appStore.config)),
    lastFetched: readonly(computed(() => appStore.lastFetched)),
    isLoading: readonly(computed(() => appStore.isLoading)),
    errors: readonly(computed(() => appStore.errors)),

    // App properties
    appName: readonly(appName),

    // actions
    setConfig: (config: SiteConfig) => appStore.setConfig(config),
    fetchConfig,
    fetchFeatures,
    fetchTermsOfService,
    fetchPrivacyPolicy,
  };
};
