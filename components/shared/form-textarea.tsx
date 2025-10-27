"use client";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormTextAreaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  rows?: number;
  maxLength?: number;
}

/**
 * A reusable RHF + ShadCN textarea field
 */
export function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  autoComplete = "on",
  rows = 4,
  maxLength,
}: FormTextAreaProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <Label htmlFor={field.name} className="px-1">
              {label}
            </Label>
          )}

          <Textarea
            {...field}
            id={field.name}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            disabled={disabled}
            rows={rows}
            maxLength={maxLength}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            className="min-h-[120px]"
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
