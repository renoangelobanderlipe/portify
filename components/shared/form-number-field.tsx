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

interface FormNumberFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/**
 * A reusable RHF + ShadCN number input field
 * Automatically converts string input to number
 */
export function FormNumberField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  min,
  max,
  step = 1,
  className,
}: FormNumberFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // Ensure the value is a string for the input, even if it's a number
        const value = field.value ?? "";

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;
          // Allow empty string to reset the field
          field.onChange(val === "" ? "" : Number(val));
        };

        return (
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
              type="number"
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              disabled={disabled}
              value={value}
              min={min}
              max={max}
              step={step}
              onChange={handleChange}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
