import z from "zod";

export const CreateTechStackSchema = z.object({
  name: z
    .string({ message: "Tech stack name is required" })
    .min(1, "Tech stack name is required"),
  placeholder: z
    .string({ message: "Placeholder is required" })
    .min(1, "Placeholder is required"),
  provider: z
    .string({ message: "Provider is required" })
    .min(1, "Provider is required"),
  size: z
    .number({ message: "Size must be at least 1" })
    .min(1, "Size must be at least 1"),
  iconTag: z
    .string({ message: "Icon tag is required" })
    .min(1, "Icon tag is required"),
});

export type CreateTechStackDTO = z.infer<typeof CreateTechStackSchema>;
