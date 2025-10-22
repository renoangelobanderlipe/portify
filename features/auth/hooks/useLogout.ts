"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logout } from "../services/logout.service";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/login";
    },
    onError: (error) => {
      toast.error((error as { message: string }).message || "Failed to logout");
    },
  });
};
