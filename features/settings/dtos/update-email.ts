import z from "zod";

export const UpdateEmailSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    newEmail: z.email({ message: "Invalid email address" }),
    confirmEmail: z.email({ message: "Invalid email address" }),
  })
  .superRefine((data, ctx) => {
    if (data.newEmail !== data.confirmEmail) {
      ctx.addIssue({
        path: ["confirmEmail"],
        code: "custom",
        message: "New email must match",
      });
    }
  });

export type UpdateEmailDTO = z.infer<typeof UpdateEmailSchema>;
