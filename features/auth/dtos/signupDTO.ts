import z from "zod";

export const RegisterFormSchema = z
  .object({
    first_name: z
      .string({
        message: "First name is required",
      })
      .min(1, "First name is required"),
    last_name: z
      .string({
        message: "Last name is required",
      })
      .min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z
      .string({
        message: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: z
      .string({
        message: "Confirm Password is required",
      })
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type RegisterFormDTO = z.infer<typeof RegisterFormSchema>;
