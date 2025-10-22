import api from "@/lib/axios";
import { signUpFormFields } from "../dtos/signupDTO";

export const signUp = async (body: signUpFormFields) => {
  const url = "/signup/";
  const response = await api.post(url, body);
};
