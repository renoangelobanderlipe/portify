"use client";
import { type Control, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { CreateProjectDTO } from "@/features/projects/dtos/createProjectDTO";

type CreateCardActionProps = {
  control: Control<CreateProjectDTO>;
};

export const CreateCardActions = ({ control }: CreateCardActionProps) => {
  return (
    <div className="flex w-full max-w-4xl items-center justify-between">
      <FieldGroup>
        <Controller
          name="published_at"
          control={control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Switch
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <Label htmlFor="airplane-mode">Publish</Label>
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit">Create Project</Button>
    </div>
  );
};
