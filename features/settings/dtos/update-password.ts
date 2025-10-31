import z from "zod";

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string({ message: "Current password is required" }),
    newPassword: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordSchema>;
