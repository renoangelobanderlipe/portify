"use client";

import { type Control, Controller } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProjectDTO } from "@/features/projects/dtos/createProjectDTO";

type CreateCardDetailsProps = {
  control: Control<CreateProjectDTO>;
};

export const CreateCardDetails = ({ control }: CreateCardDetailsProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-4xl rounded-lg border p-4"
      defaultValue="details"
    >
      <AccordionItem value="details">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col gap-2">
            <div className="text-2xl">Details</div>
            <div>Title and Description...</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <FieldGroup>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    value={field.value}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    placeholder="Description..."
                    value={field.value}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
