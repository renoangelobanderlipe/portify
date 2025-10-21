"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type LoginDTO, loginSchema } from "@/features/auth/dtos/loginDTO";
import { useLogin } from "@/features/auth/hooks/useLogin";

export const useHooks = () => {
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login } = useLogin();

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    login(data, {
      onSuccess: () => {
        router.push("/admin/dashboard");
      },
      onError: (error) => {
        methods.setError("root", {
          type: "custom",
          message: error.message,
        });
      },
    });
  };

  return { ...methods, onSubmit };
};
