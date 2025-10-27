"use client";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FormSwitchFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function FormSwitchField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: FormSwitchFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center justify-between gap-2 py-1">
            <div className="flex flex-col gap-2 space-y-0.5">
              {label && (
                <Label htmlFor={field.name} className="px-1">
                  {label}
                </Label>
              )}
              {description && (
                <p className="text-muted-foreground px-1 text-xs">
                  {description}
                </p>
              )}
            </div>

            <Switch
              id={field.name}
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
