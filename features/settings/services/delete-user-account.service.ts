import api from "@/lib/axios";
import { ENDPOINT } from "@/utils/constants/endpoints";

export const deleteUserAccount = (id: number) => {
  return api.delete(`${ENDPOINT.AUTH.USER}/${id}`);
};
