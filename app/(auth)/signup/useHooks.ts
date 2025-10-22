"use client";

import { signUpFormFields, signUpSchema } from "@/features/auth/dtos/signupDTO";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

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
      onError: (error: any) => {
        methods.setError("root", {
          type: "server",
          message: error?.response?.data?.message || "Something went wrong",
        });
      },
    });
  };
  return {
    ...methods,
    onSubmit,
  };
};
