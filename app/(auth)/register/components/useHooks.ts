"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type RegisterFormDTO,
  RegisterFormSchema,
} from "@/features/auth/dtos/signupDTO";
import { useRegister } from "@/features/auth/hooks/use-register";
import { PROJECT_URL } from "@/utils/constants/urls";

export const useHooks = () => {
  const router = useRouter();

  const methods = useForm<RegisterFormDTO>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { mutate: register, isPending } = useRegister();

  const onSubmit: SubmitHandler<RegisterFormDTO> = (data) => {
    register(data, {
      onSuccess: () => {
        methods.reset();
        router.replace(PROJECT_URL.LOGIN);
      },
      onError: (error) => {
        methods.setError("root", {
          type: "server",
          message: error?.message || "Something went wrong",
        });
      },
    });
  };
  return {
    ...methods,
    onSubmit,
    isPending,
  };
};
