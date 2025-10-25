"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProjectDTO } from "../dtos/createProjectDTO";
import { createProject } from "../services/createProject";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectDTO) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
    },
  });
};
