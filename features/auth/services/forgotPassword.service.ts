import api from "@/lib/axios";
import type { ForgotPasswordDTO } from "../dtos/forgotPasswordDTO";

export const forgotPassword = async (email: ForgotPasswordDTO) => {
  const url = "/forgot-password";

  return await api.put(url, email);
};
