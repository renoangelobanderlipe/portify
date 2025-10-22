import z from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string({
        message: "First name is required",
      })
      .min(1, "First name is required"),
    lastName: z
      .string({
        message: "Last name is required",
      })
      .min(1, "Last name is required"),
    email: z
      .string({
        message: "Email is required",
      })
      .email("Invalid email address"),
    password: z
      .string({
        message: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string({
        message: "Confirm Password is required",
      })
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type signUpFormFields = z.infer<typeof signUpSchema>;
