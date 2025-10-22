import api from "@/lib/axios";
import type { signUpFormFields } from "../dtos/signupDTO";

export const signUp = async (body: signUpFormFields) => {
  const url = "/signup/";
  return await api.post(url, body);
};
