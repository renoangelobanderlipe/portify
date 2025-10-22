import api from "@/lib/axios";
import { ForgotPasswordDTO } from "../dtos/forgotPasswordDTO";

export const forgotPassword = async (email: ForgotPasswordDTO) => {
  const url = "/forgot-password";

  return await api.put(url, email);
};
