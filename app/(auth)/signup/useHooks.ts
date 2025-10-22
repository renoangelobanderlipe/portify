"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type signUpFormFields,
  signUpSchema,
} from "@/features/auth/dtos/signupDTO";
import { useSignup } from "@/features/auth/hooks/useSignup";

export const useHooks = () => {
  const router = useRouter();

  const methods = useForm<signUpFormFields>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: signUp } = useSignup();

  const onSubmit: SubmitHandler<signUpFormFields> = (data) => {
    signUp(data, {
      onSuccess: () => {
        methods.reset();
        router.replace("/admin/dashboard");
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
  };
};
