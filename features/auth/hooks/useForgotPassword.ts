"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ForgotPasswordDTO } from "../dtos/forgotPasswordDTO";
import { forgotPassword } from "../services/forgotPassword.service";

export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: ForgotPasswordDTO) => forgotPassword(email),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });
};
