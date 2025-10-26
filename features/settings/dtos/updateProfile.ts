import z from "zod";

export const UpdateProfileSchema = z.object({
  photo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 3 * 1024 * 1024,
      "Max file size is 3MB",
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Only .jpeg, .jpg, .png, .gif formats are supported",
    ),
  emailVerified: z.boolean(),
});

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;
