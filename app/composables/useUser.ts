import type { z } from "zod";
import type { User } from "~/types/models";
import { passwordUpdateSchema, profileUpdateSchema } from "~/utils/userUtils";

export type PasswordUpdateForm = z.output<typeof passwordUpdateSchema>;
export type ProfileUpdateForm = z.output<typeof profileUpdateSchema>;

/**
 * User composable that integrates with Pinia store
 * Provides business logic for user-related operations
 */
export const useUser = () => {
    const { user: sanctumUser, isAuthenticated, refreshIdentity } = useSanctumAuth();
    const sanctumClient = useSanctumClient();
    const userStore = useUserStore();
    const toast = useToastStore();
    const lastFetched = ref<Date | null>(null);

    // Sync with Sanctum auth state
    const syncWithSanctumAuth = () => {
      if (sanctumUser.value) {
        userStore.setUser(sanctumUser.value as User);
      } else if (!sanctumUser.value) {
        userStore.setUser(null);
      }
    };
  
    // Watch for Sanctum user changes
    watch(sanctumUser, syncWithSanctumAuth, { immediate: true, deep: true });

    // Business logic actions
    const updatePassword = async (data: PasswordUpdateForm): Promise<boolean> => {
        return await sanctumClient("/api/user/password", {
        method: "PUT",
        body: data,
        });
    };

    const updateProfile = async (data: ProfileUpdateForm): Promise<boolean> => {
        return await sanctumClient("/api/user", {
            method: "PUT",
            body: data,
        });
    };

    const refreshUser = async (): Promise<void> => {
        userStore.setLoading(true);
        try {
            await refreshIdentity();
            lastFetched.value = new Date();
        } catch (error) {
            const err = useSanctumError(error);
            toast.error(err.errorMessage || "Failed to refresh user data");
            userStore.setErrors({
                general: err.errorMessage || "Failed to refresh user data",
            });
        } finally {
            userStore.setLoading(false);
        }
    };

    // Error utilities
    const hasError = (field?: string): boolean => {
        if (!userStore.errors) return false;
        return field ? !!userStore.errors[field] : Object.keys(userStore.errors).length > 0;
    };

    const getError = (field: string): string | null => {
        return userStore.errors?.[field] || null;
    };

    return {
        // Reactive user data from store
        config: readonly(computed(() => userStore.user)),
        lastUpdated: readonly(computed(() => userStore.lastUpdated)),
        lastFetched: readonly(computed(() => lastFetched.value)),
        isLoading: readonly(computed(() => userStore.isLoading)),
        errors: readonly(computed(() => userStore.errors)),

        // User properties
        userEmail: readonly(computed(() => userStore.userEmail)),
        userName: readonly(computed(() => userStore.userName)),
        userId: readonly(computed(() => userStore.userId)),
        isAuthenticated: readonly(computed(() => isAuthenticated.value)),

        // Actions
        setUser: (user: User | null) => userStore.setUser(user),
        updatePassword,
        updateProfile,
        refreshUser,

        // Error handling
        hasError,
        getError,
        clearErrors: () => userStore.clearErrors(),

        // Validation
        passwordUpdateSchema,
        profileUpdateSchema,
    };
};
