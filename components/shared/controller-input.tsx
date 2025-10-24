"use client";

import { type Control, Controller, type FieldPath } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type ControllerInputProps<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
};

export const ControllerInput = <T extends Record<string, unknown>>({
  name,
  control,
  label,
  placeholder,
}: ControllerInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => {
      // 🔹 Ensure value is string (fixes TS2322)
      const value =
        typeof field.value === "string" || typeof field.value === "number"
          ? String(field.value)
          : "";

      return (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            id={field.name}
            {...field}
            value={value}
            placeholder={placeholder}
            autoComplete="on"
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      );
    }}
  />
);
