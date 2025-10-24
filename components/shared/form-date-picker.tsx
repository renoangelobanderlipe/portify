"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate, isValidDate } from "@/utils/date";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select a date",
  disabled,
}: FormDatePickerProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const date = value ? new Date(value) : undefined;
        const displayValue = formatDate(date);

        return (
          <div className="flex w-full flex-col gap-2">
            {label && (
              <Label htmlFor={name} className="px-1">
                {label}
              </Label>
            )}
            <div className="relative flex gap-2">
              <Input
                id={name}
                value={displayValue}
                placeholder={placeholder}
                disabled={disabled}
                className="bg-background pr-10"
                onChange={(e) => {
                  const parsed = new Date(e.target.value);
                  if (isValidDate(parsed)) {
                    onChange(parsed);
                    setMonth(parsed);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(selectedDate) => {
                      onChange(selectedDate);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      }}
    />
  );
}
