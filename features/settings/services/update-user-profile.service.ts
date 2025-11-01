import api from "@/lib/axios";
import { ENDPOINT } from "@/utils/constants/endpoints";
import type { UpdateUserProfileDTO } from "../dtos/update-userInfo";

export const updateUserProfile = async (
  data: UpdateUserProfileDTO,
  id: number,
) => {
  return await api.patch(`${ENDPOINT.AUTH.USER}/${id}`, data);
};
