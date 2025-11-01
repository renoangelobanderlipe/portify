import api from "@/lib/axios";
import { ENDPOINT } from "@/utils/constants/endpoints";

export const logout = async () => {
  return await api.post(ENDPOINT.AUTH.LOGOUT);
};
