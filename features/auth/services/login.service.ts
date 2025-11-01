import api, { attachToken } from "@/lib/axios";
import { useAuth } from "@/lib/store/useAuthStore";
import { ENDPOINT } from "@/utils/constants/endpoints";
import type { LoginDTO } from "../dtos/loginDTO";

export const login = async ({ email, password }: LoginDTO) => {
  const setToken = useAuth.getState().setToken;
  const response = await api.post(ENDPOINT.AUTH.LOGIN, { email, password });

  const { access_token: token, user, roles } = response.data;
  setToken(token);
  attachToken();

  return { user, token, roles };
};
