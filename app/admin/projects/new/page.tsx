"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type CreateProjectDTO,
  CreateProjectSchema,
} from "@/features/projects/dtos/createProjectDTO";
import { CreateCardActions } from "./components/CardActions";
import { CreateCardDetails } from "./components/CardDetails";
import { CreateCardProperties } from "./components/CardProperties";

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
        <CreateCardDetails control={control} />
        <CreateCardProperties control={control} />
      </div>
      <CreateCardActions control={control} />
    </form>
  );
}
