"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../services/signup.service";

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
  });
};
