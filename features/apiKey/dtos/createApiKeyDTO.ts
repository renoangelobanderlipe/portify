import z from "zod";

export const CreateApiKeySchema = z.object({
  name: z
    .string({
      message: "API Key Name is required",
    })
    .min(3, "Name must be at least 3 characters long"),
});

export type CreateApiKeyDTO = z.infer<typeof CreateApiKeySchema>;
