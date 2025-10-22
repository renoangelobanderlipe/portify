"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type ForgotPasswordDTO,
  ForgotPasswordSchema,
} from "@/features/auth/dtos/forgotPasswordDTO";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export const useHooks = () => {
  const methods = useForm<ForgotPasswordDTO>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { mutate: forgotPassword } = useForgotPassword();

  const onSubmit: SubmitHandler<ForgotPasswordDTO> = (data) => {
    forgotPassword(data, {
      onSuccess: () => {
        methods.reset();
        // Implement a Alert Dialog Later
      },
      onError: (error) => {
        methods.setError("root", {
          type: "server",
          message: error.message,
        });
      },
    });
  };

  return {
    ...methods,
    onSubmit,
  };
};
