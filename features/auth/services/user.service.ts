import api from "@/lib/axios";
import { ENDPOINT } from "@/utils/constants/endpoints";

export const fetchUser = async () => {
  const response = await api.get(ENDPOINT.AUTH.USER);

  return response.data;
};
