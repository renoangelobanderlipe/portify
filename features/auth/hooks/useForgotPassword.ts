"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword } from "../services/forgotPassword.service";
import { ForgotPasswordDTO } from "../dtos/forgotPasswordDTO";

export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: ForgotPasswordDTO) => forgotPassword(email),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });
};
