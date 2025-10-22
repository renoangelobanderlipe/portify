import api from "@/lib/axios";

export const logout = async () => {
  const url = "/logout";

  return await api.post(url);
};
