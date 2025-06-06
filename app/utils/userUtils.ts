import { z } from "zod";

// Base password fields object (without refinements)
export const passwordFields = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string().min(8, "Password confirmation is required"),
  terms_accepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const refinePasswordFields = <T extends z.ZodRawShape>(
  zObject: z.ZodObject<T>
) => {
  return zObject.refine(
    (data) => data.password === data.password_confirmation,
    {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    }
  );
};

// Password update schema
export const passwordUpdateSchema = refinePasswordFields(
  z
    .object({
      current_password: z.string().min(1, "Current password is required"),
    })
    .merge(passwordFields)
);

// Profile update schema
export const profileUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
});
