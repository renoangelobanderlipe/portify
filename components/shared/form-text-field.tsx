"use client";

import type * as React from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  type?: React.HTMLInputTypeAttribute;
  loading?: boolean;
  className?: string;
}

/**
 * A reusable RHF + ShadCN text input field
 */
export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  autoComplete = "on",
  type = "text",
  loading = false,
  className,
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={cn(className, "w-full")}
        >
          {label && (
            <Label htmlFor={field.name} className="px-1">
              {label}
            </Label>
          )}

          <Input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            disabled={disabled}
            value={field.value ?? ""}
            loading={loading}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
