"use client";

import { ControllerDatePicker } from "@/components/shared/controller-date-picker";
import { ControllerInput } from "@/components/shared/controller-input";
import { ControllerInputGroup } from "@/components/shared/controller-input-group";
import { UploadDropzone } from "@/components/shared/upload-dropzone";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { CreateProjectDTO } from "@/features/projects/dtos/createProjectDTO";
import { JPEG, PNG, SVG } from "@/lib/react-dropzone/file-types";
import { useState } from "react";
import type { Control } from "react-hook-form";

type CreateCardPropertiesProps = {
  control: Control<CreateProjectDTO>;
};

export const CreateCardProperties = ({
  control,
}: CreateCardPropertiesProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

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
          <FieldGroup>
            {/* Start / End Date */}
            <div className="flex gap-4">
              <ControllerDatePicker
                name="started_at"
                control={control}
                label="Start Date"
                open={openStart}
                onOpenChange={setOpenStart}
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setOpenStart(false);
                }}
              />

              <ControllerDatePicker
                name="end_at"
                control={control}
                label="End Date"
                open={openEnd}
                onOpenChange={setOpenEnd}
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  setOpenEnd(false);
                }}
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

              <ControllerInput
                name="project_type"
                control={control}
                label="Project Type"
              />
            </div>

            {/* Repository + Tags */}
            <div className="flex flex-wrap gap-4">
              <ControllerInput
                name="repository"
                control={control}
                label="Repository"
              />
              <ControllerInput name="tags" control={control} label="Tags" />
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
