"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateApiKeyDTO } from "../dtos/createApiKeyDTO";
import { createApikey } from "../services/createApiKey";

export const useCreateApiKey = () => {
  return useMutation({
    mutationKey: ["create-api-key"],
    mutationFn: (apiName: CreateApiKeyDTO) => createApikey(apiName),
    onSuccess: () => {
      console.log("API Key created successfully");
    },
    onError: () => {
      toast.error("Failed to create API Key");
    },
  });
};
