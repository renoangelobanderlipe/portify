import api from "@/lib/axios";

export const deleteApiKey = async (id: string) => {
  const url = `/api-keys/${id}`;

  return api.delete(url);
};
