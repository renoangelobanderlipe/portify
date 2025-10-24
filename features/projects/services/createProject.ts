import api from "@/lib/axios";
import type { CreateProjectDTO } from "../dtos/createProjectDTO";

export const createProject = async (data: CreateProjectDTO) => {
  const url = "projects";

  return await api.post(url, data);
};
