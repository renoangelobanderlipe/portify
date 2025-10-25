import z from "zod";

export const CreateProjectSchema = z.object({
  title: z.string({
    message: "Title is required",
  }),
  description: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  url: z
    .string()
    .trim()

    // Disallow inputs containing http or https
    .refine(
      (val) =>
        !val || (!val.startsWith("http://") && !val.startsWith("https://")),
      {
        message:
          "Do not include http:// or https:// — it will be added automatically.",
      },
    )
    // Automatically prepend https:// then validate as full URL
    .transform((val) => {
      if (!val) return undefined;
      return `https://${val}`;
    })
    .pipe(z.url("Please enter a valid URL")),
  project_type: z.string().optional(),
  repository: z.string().optional(),
  tags: z.array(z.string()).optional(),
  thumbnail: z.instanceof(File).optional(),
  other_images: z.array(z.instanceof(File)).optional(),
  published_at: z.boolean().optional(),
  metadata: z.array(z.string()).optional(),
});

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
