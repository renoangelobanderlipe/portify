"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type UpdateProjectDTO,
  UpdateProjectSchema,
} from "@/features/projects/dtos/updateProjectDTO";
import { ProjectCardProperties } from "../../components/CardProperties";
import { ProjectCardActions } from "../../components/ProjectCardActions";
import { ProjectCardDetails } from "../../components/ProjectCardDetails";
export default function EditProjectPage() {
  const { id } = useParams<{ id?: string }>();
  console.log("Editing project with ID:", id);

  const { control, handleSubmit } = useForm<UpdateProjectDTO>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      thumbnail: undefined,
      other_images: [],
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<UpdateProjectDTO> = (data) => {
    console.log("Form data submitted:", data);
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
