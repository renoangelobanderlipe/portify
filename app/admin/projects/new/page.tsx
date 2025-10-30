"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type CreateProjectDTO,
  CreateProjectSchema,
} from "@/features/projects/dtos/createProjectDTO";
import { ProjectCardProperties } from "../components/CardProperties";
import { ProjectCardActions } from "../components/ProjectCardActions";
import { ProjectCardDetails } from "../components/ProjectCardDetails";

export default function Page() {
  const { control, handleSubmit } = useForm<CreateProjectDTO>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      thumbnail: undefined,
      other_images: [],
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<CreateProjectDTO> = (data) => {
    console.log("data", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-6"
    >
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <ProjectCardDetails control={control} />
        <ProjectCardProperties control={control} />
      </div>
      <ProjectCardActions control={control} />
    </form>
  );
}
