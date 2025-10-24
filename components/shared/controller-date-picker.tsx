"use client";

import { ChevronDownIcon } from "lucide-react";
import { type Control, Controller, type FieldPath } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type ControllerDatePickerProps<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: Date;
  onSelect: (date?: Date) => void;
};

export const ControllerDatePicker = <T extends Record<string, unknown>>({
  name,
  control,
  label,
  open,
  onOpenChange,
  selected,
  onSelect,
}: ControllerDatePickerProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-48 justify-between font-normal"
            >
              {selected ? selected.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selected}
              onSelect={onSelect}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
);
