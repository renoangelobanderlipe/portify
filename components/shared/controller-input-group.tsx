"use client";

import { type Control, Controller, type FieldPath } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";

type ControllerInputGroupProps<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  prefix: string;
  placeholder?: string;
};

export const ControllerInputGroup = <T extends Record<string, unknown>>({
  name,
  control,
  label,
  prefix,
  placeholder,
}: ControllerInputGroupProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => {
      const value =
        typeof field.value === "string" || typeof field.value === "number"
          ? String(field.value)
          : "";

      return (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>{prefix}</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id={field.name}
              {...field}
              value={value}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
            />
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      );
    }}
  />
);
