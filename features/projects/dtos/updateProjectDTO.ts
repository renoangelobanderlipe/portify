import z from "zod";
import { CreateProjectSchema } from "./createProjectDTO";

export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
  title: z.string({ message: "Title is required" }).min(1, "Title is required"),
});

export type UpdateProjectDTO = z.infer<typeof UpdateProjectSchema>;
