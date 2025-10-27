"use client";

import { X } from "lucide-react";
import { useRef } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormTagInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FormTagInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  className,
}: FormTagInputProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const tags: string[] = field.value ?? [];

        const addTag = (value: string) => {
          const trimmed = value.trim();
          if (!trimmed || tags.includes(trimmed)) return;
          field.onChange([...tags, trimmed]);
          if (inputRef.current) inputRef.current.value = "";
        };

        const removeTag = (tag: string) => {
          field.onChange(tags.filter((t) => t !== tag));
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(e.currentTarget.value);
          }
        };

        return (
          <Field
            data-invalid={fieldState.invalid}
            className={cn("w-full", className)}
          >
            {label && (
              <Label htmlFor={field.name} className="px-1">
                {label}
              </Label>
            )}

            <div
              className={cn(
                "border-input flex flex-wrap items-center gap-4 rounded-md",
                disabled && "cursor-not-allowed",
              )}
            >
              <Input
                ref={inputRef}
                id={field.name}
                placeholder={placeholder}
                disabled={disabled}
                onKeyDown={handleKeyDown}
                // className="flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 rounded-full px-2 py-0.5"
                >
                  {tag}
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-4 w-4 cursor-pointer hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
