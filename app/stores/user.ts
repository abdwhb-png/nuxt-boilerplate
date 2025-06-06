import type { User } from "~/types/models";

interface UserState {
  user: User | null;
  isLoading: boolean;
  lastUpdated: Date | null;
  errors: Record<string, string> | null;
}

export const useUserStore = defineStore("userStore", {
  state: (): UserState => {
      return {
        user: null,
    isLoading: false,
    lastUpdated: null,
    errors: null,
      }
    },

    getters: {
        userEmail: (state) => state.user?.email || "",
        userName: (state) => state.user?.name || "",
        userId: (state) => state.user?.id || null,
    },

    actions: {
        setUser (user: User | null) {
            this.user = user;
            this.lastUpdated = user ? new Date() : null;
            this.errors = null;
        },

        setLoading (loading: boolean) {
            this.isLoading = loading;
        },

        setLastUpdated (date: Date | null = null) {
            this.lastUpdated = date || new Date();
        },

        setErrors (errors: Record<string, string> | null) {
            this.errors = errors;
        },

        clearErrors () {
            this.errors = null;
        },

        // Hydration for SSR
        $reset(){
            this.user = null;
            this.isLoading = false;
            this.lastUpdated = null;
            this.errors = null;
        }
    },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
