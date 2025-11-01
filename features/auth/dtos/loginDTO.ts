import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export type LoginDTO = z.infer<typeof LoginFormSchema>;
