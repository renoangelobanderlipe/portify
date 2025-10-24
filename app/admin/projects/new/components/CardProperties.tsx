"use client";

import type { Control } from "react-hook-form";
import { ControllerInputGroup } from "@/components/shared/controller-input-group";
import { FormDatePicker } from "@/components/shared/form-date-picker";
import { FormTextField } from "@/components/shared/form-text-field";
import { UploadDropzone } from "@/components/shared/upload-dropzone";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import type { CreateProjectDTO } from "@/features/projects/dtos/createProjectDTO";
import { JPEG, PNG, SVG } from "@/lib/react-dropzone/file-types";

type CreateCardPropertiesProps = {
  control: Control<CreateProjectDTO>;
};

export const CreateCardProperties = ({
  control,
}: CreateCardPropertiesProps) => {
  const acceptedImageTypes = {
    "image/*": [...JPEG, ...PNG, ...SVG],
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-4xl rounded-lg border p-4"
      defaultValue="properties"
    >
      <AccordionItem value="properties">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col gap-1 text-left">
            <div className="text-2xl font-semibold">Properties</div>
            <div className="text-muted-foreground">
              Additional project functions and attributes
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="flex flex-col gap-6">
          <Separator />
          <FieldGroup>
            {/* Start / End Date */}
            <div className="flex gap-4">
              <FormDatePicker
                control={control}
                name="start_date"
                label="Start Date"
              />

              <FormDatePicker
                control={control}
                name="end_date"
                label="End Date"
              />
            </div>

            {/* URL + Project Type */}
            <div className="flex flex-wrap gap-4">
              <ControllerInputGroup
                name="url"
                control={control}
                label="URL"
                placeholder="example.com"
                prefix="https://"
              />

              <FormTextField
                control={control}
                name="project_type"
                label="Project Type"
                placeholder="Web Application"
              />
            </div>

            {/* Repository + Tags */}
            <div className="flex flex-wrap gap-4">
              <FormTextField
                control={control}
                name="repository"
                label="Repository"
                placeholder="https://github.com/renoangelobanderlipe/portify"
              />
              <FormTextField
                control={control}
                name="tags"
                label="Tags"
                placeholder="laravel"
              />
            </div>
          </FieldGroup>

          {/* Thumbnail Upload */}
          <Field>
            <FieldLabel>Thumbnail (Single File)</FieldLabel>
            <UploadDropzone
              multiple={false}
              onChange={(files) => console.log("Thumbnail:", files)}
              acceptedTypes={acceptedImageTypes}
            />
          </Field>

          {/* Other Images Upload */}
          <Field>
            <FieldLabel>Other Images (Multiple Files)</FieldLabel>
            <UploadDropzone
              multiple
              onChange={(files) => console.log("Other Images:", files)}
              acceptedTypes={acceptedImageTypes}
            />
          </Field>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
