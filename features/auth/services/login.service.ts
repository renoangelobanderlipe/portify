import api from "@/lib/axios";

export const login = async (email: string, password: string) => {
  const url = "/auth/login";

  const response = await api.post(url, { email, password });

  return response.data;
};
