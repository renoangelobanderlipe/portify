import z from "zod";

export const CreateProjectSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .min(1, {
      message: "Title is required",
    }),
  description: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  url: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // allow empty (optional)
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a valid URL (e.g. https://example.com)",
      },
    ),

  project_type: z.string().optional(),
  repository: z.string().optional(),
  tags: z.array(z.string()).optional(),
  thumbnail: z.union([z.instanceof(File), z.null(), z.undefined()]).optional(),
  other_images: z.array(z.instanceof(File)).optional().or(z.null()),
  published_at: z.boolean().optional(),
  metadata: z.array(z.string()).optional(),
});

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
