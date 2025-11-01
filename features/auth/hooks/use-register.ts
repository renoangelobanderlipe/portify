"use client";

import { useMutation } from "@tanstack/react-query";
import { register } from "@/features/auth/services/register.service";
import type { RegisterFormDTO } from "../dtos/signupDTO";

export const useRegister = () => {
  return useMutation({
    mutationFn: (body: RegisterFormDTO) => register(body),
    mutationKey: ["register"],
  });
};
