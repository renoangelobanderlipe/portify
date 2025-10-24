import z from "zod";

export const CreateProjectSchema = z.object({
  title: z.string({
    message: "Title is required",
  }),
  description: z.string().optional(),
  started_at: z.date().optional(),
  end_at: z.date().optional(),
  url: z.url().optional(),
  project_type: z.string().optional(),
  repository: z.string().optional(),
  tags: z.array(z.string()).optional(),
  thumbnail: z.instanceof(File).optional(),
  other_images: z.array(z.instanceof(File)).optional(),
  published_at: z.boolean().optional(),
  metadata: z.array(z.string()).optional(),
});

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
