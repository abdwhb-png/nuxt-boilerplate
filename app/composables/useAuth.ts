import type { z } from "zod";
import type { User } from "~/types/models";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "~/utils/authUtils";
import { getTranslation } from "~/utils";

export type LoginFormData = z.output<typeof loginSchema>;
export type RegisterFormData = z.output<typeof registerSchema>;
export type ResetPasswordFormData = z.output<typeof resetPasswordSchema>;

export const useAuth = () => {
  const sanctumClient = useSanctumClient();
  const userStore = useUserStore();
  const toast = useToastStore();

  const login = async (data: LoginFormData): Promise<User | null> => {
    const { login, user } = useSanctumAuth();
    await login(data);
    return user.value as User | null;
  };

  const register = async (data: RegisterFormData): Promise<User | null> => {
    return await sanctumClient("/api/register", {
      method: "POST",
      body: data,
    });
  };

  const logout = async (): Promise<void> => {
    try {
      const { logout } = useSanctumAuth();
      await logout();
      userStore.setUser(null);
    } catch (error) {
      toast.error(getTranslation("messages.logout.logoutFailed"));
    }
  };

  return {
    loginSchema,
    registerSchema,
    resetPasswordSchema,
    login,
    register,
    logout,
  };
};
