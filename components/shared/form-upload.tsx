"use client";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { UploadDropzone, type UploadDropzoneProps } from "./upload-dropzone";

interface FormUploadDropzoneProps<T extends FieldValues>
  extends Omit<UploadDropzoneProps, "value" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function FormUploadDropzone<T extends FieldValues>({
  control,
  name,
  label,
  acceptedTypes,
  multiple = false,
  ...props
}: FormUploadDropzoneProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <Label htmlFor={field.name}>{label}</Label>}

          <UploadDropzone
            {...props}
            multiple={multiple}
            acceptedTypes={acceptedTypes}
            showAction={false}
            value={
              multiple
                ? ((field.value as File[] | undefined) ?? [])
                : (field.value as File | undefined)
            }
            onChange={(files) =>
              field.onChange(multiple ? files : (files[0] ?? undefined))
            }
          />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
