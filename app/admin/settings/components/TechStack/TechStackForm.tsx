"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import type iconsMock from "@/_mock/iconsMock.json";
import { FormNumberField } from "@/components/shared/form-number-field";
import { FormSelectField } from "@/components/shared/form-select-field";
import { FormTextField } from "@/components/shared/form-text-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  type CreateTechStackDTO,
  CreateTechStackSchema,
} from "@/features/settings/dtos/create-techstack";
export const TechStackForm = ({
  onSubmitIcon, // TODO: Remove this when integrating with backend
}: {
  onSubmitIcon: (newIcon: (typeof iconsMock)[0]) => void;
}) => {
  const { control, handleSubmit } = useForm<CreateTechStackDTO>({
    resolver: zodResolver(CreateTechStackSchema),
  });

  const onSubmit: SubmitHandler<CreateTechStackDTO> = (data) => {
    const newIcon = {
      name: data.name,
      placeholder: data.placeholder,
      iconTag: data.iconTag,
      size: data.size,
      provider: data.provider,
    };

    // TODO: Remove this when integrating with backend
    onSubmitIcon?.(newIcon); // remove this when API is ready
  };

  return (
    <form className="col-span-1" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <FormTextField
            name="name"
            label="Tech Stack Name"
            placeholder="e.g. React, Node.js, Python"
            control={control}
          />
          <FormTextField
            name="placeholder"
            label="Placeholder"
            placeholder="e.g. k8s, kubernetes"
            control={control}
          />
          <FormTextField
            name="iconTag"
            label="Icon Tag"
            placeholder="e.g. devicon-laravel-plain"
            control={control}
          />
          <FormNumberField
            name="size"
            label="Icon Size"
            placeholder="e.g. 24"
            control={control}
          />

          <FormSelectField
            control={control}
            name="provider"
            label="Provider"
            placeholder="Select your provider"
            options={[{ label: "Tabler Icons", value: "tabler-icons" }]}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Create</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
