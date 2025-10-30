"use client";

import type { Control } from "react-hook-form";
import { ControllerInputGroup } from "@/components/shared/controller-input-group";
import { FormDatePicker } from "@/components/shared/form-date-picker";
import { FormTagInput } from "@/components/shared/form-tag-input";
import { FormTextField } from "@/components/shared/form-text-field";
import { FormUploadDropzone } from "@/components/shared/form-upload";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import type { CreateProjectDTO } from "@/features/projects/dtos/createProjectDTO";
import type { UpdateProjectDTO } from "@/features/projects/dtos/updateProjectDTO";
import { JPEG, PNG, SVG } from "@/lib/react-dropzone/file-types";

const acceptedImageTypes = {
  "image/*": [...JPEG, ...PNG, ...SVG],
};

type ProjectFormDTO = CreateProjectDTO | UpdateProjectDTO;

type ProjectCardPropertiesProps = {
  control: Control<ProjectFormDTO>;
};

export const ProjectCardProperties = ({
  control,
}: ProjectCardPropertiesProps) => {
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

        <AccordionContent>
          <Separator />
          <FieldGroup className="grid gap-6 py-6 lg:grid-cols-2">
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
            <ControllerInputGroup
              name="url"
              control={control}
              label="URL"
              placeholder="example.com"
              className="col-span-2"
            />
            <FormTextField
              control={control}
              name="project_type"
              label="Project Type"
              placeholder="Web Application"
              className="col-span-2"
            />
            <FormTextField
              control={control}
              name="repository"
              label="Repository"
              placeholder="https://github.com/renoangelobanderlipe/portify"
              className="col-span-2"
            />
            <FormTagInput
              control={control}
              name="tags"
              label="Tags"
              placeholder="Type and press Enter"
              className="col-span-2"
            />
          </FieldGroup>

          <FieldGroup>
            <FormUploadDropzone
              control={control}
              name="thumbnail"
              label="Thumbnail (Single File)"
              multiple={false}
              acceptedTypes={acceptedImageTypes}
            />
            <FormUploadDropzone
              control={control}
              name="other_images"
              label="Other Images (Multiple Files)"
              multiple
              acceptedTypes={acceptedImageTypes}
            />
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
