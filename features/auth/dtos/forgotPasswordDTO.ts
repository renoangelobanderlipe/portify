import z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
