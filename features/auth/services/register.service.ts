import api from "@/lib/axios";
import { ENDPOINT } from "@/utils/constants/endpoints";
import type { RegisterFormDTO } from "../dtos/signupDTO";

export const register = async (body: RegisterFormDTO) => {
  return await api.post(ENDPOINT.AUTH.REGISTER, body);
};
