"use client";

import { IconCamera } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormProfileUploaderProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  maxSizeMB?: number;
}

export function FormProfileUploader<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  maxSizeMB = 3,
}: FormProfileUploaderProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name });

  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      field.onChange(file ?? null);
    },
    [field],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    maxFiles: 1,
    maxSize: maxSizeMB * 1024 * 1024,
    disabled,
  });

  return (
    <Field data-invalid={invalid}>
      {label && (
        <Label htmlFor={field.name} className="block px-1 text-center">
          {label}
        </Label>
      )}

      <div className="flex flex-col items-center justify-center gap-6 pb-6">
        <button
          {...getRootProps()}
          type="button"
          disabled={disabled}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "border-muted-foreground/50 relative flex h-42 w-42 flex-col items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors",
            isDragActive ? "bg-primary" : "hover:bg-muted/30",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {field.value ? (
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={
                  field.value &&
                  typeof field.value === "object" &&
                  "name" in field.value
                    ? URL.createObjectURL(field.value as File)
                    : String(field.value)
                }
                alt="Profile Preview"
                fill
                className="object-cover"
              />
              {isHovered && !disabled && (
                <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-full bg-black/60 text-xs text-white transition-opacity">
                  <IconCamera />
                  Change Photo
                </div>
              )}
            </div>
          ) : (
            <div className="text-accent-foreground hover:bg-primary flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-xs">
              <IconCamera />
              Upload Photo
            </div>
          )}
        </button>
        <input {...getInputProps({ id: field.name })} />
        <div className="flex flex-col text-center">
          <p className="text-muted-foreground text-sm">Upload photo</p>
          <p className="text-muted-foreground/70 mt-1 w-52 text-xs">
            Allowed *.jpeg, *.jpg, *.png, *.gif — max size {maxSizeMB} MB
          </p>
        </div>
        {invalid && <FieldError errors={[error]} />}
      </div>
    </Field>
  );
}
