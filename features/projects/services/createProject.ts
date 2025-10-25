import api from "@/lib/axios";
import { ENDPOINT } from "@/utils/constants/endpoints";
import type { CreateProjectDTO } from "../dtos/createProjectDTO";

export const createProject = async (data: CreateProjectDTO) => {
  return await api.post(ENDPOINT.projects, data);
};
