import api from "@/lib/axios";
import type { CreateApiKeyDTO } from "../dtos/createApiKeyDTO";

export const createApikey = async (apiName: CreateApiKeyDTO) => {
  const url = "/api-keys";
  const response = await api.post(url, apiName);

  return response.data.data || null;
};
