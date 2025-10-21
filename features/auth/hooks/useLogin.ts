import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginDTO } from "../dtos/loginDTO";
import { login } from "../services/login.service";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginDTO) => login(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
  });
};
