import type { SiteConfig } from "~/types/models";

interface AppState {
  config: SiteConfig;
  isLoading: boolean;
  lastFetched: Date | null;
  errors: Record<string, string> | null;
}

export const useAppStore = defineStore("appStore", {
  state: (): AppState => {
    return {
      config: {} as SiteConfig,
      isLoading: false,
      lastFetched: null,
      errors: null,
    }
  },

  getters: {
    appName: (state) => {
      return state.config.app?.name || null;
    },

    needsRefresh: (state) => {
      if (!state.lastFetched) return true;

      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      return state.lastFetched < fiveMinutesAgo;
    }
  },

  actions: {
    setConfig (config: SiteConfig | null)  {
      this.config = config || {} as SiteConfig;
      this.lastFetched = config ? new Date() : null;
      this.errors = null;
    },

    setLoading (loading: boolean) {
      this.isLoading = loading;
    },

    setLastFetched (date: Date | null = null) {
      this.lastFetched = date || new Date();
    },

    setError (error: Error | null) {
      this.errors = error ? { [error.name]: error.message } : null;
    },

    clearErrors ()  {
      this.errors = null;
    },

    reset ()  {
      this.config = {} as SiteConfig;
      this.isLoading = false;
      this.lastFetched = null;
      this.errors = null;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
