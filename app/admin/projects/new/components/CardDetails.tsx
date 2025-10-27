"use client";

import type { Control } from "react-hook-form";
import { FormTextField } from "@/components/shared/form-text-field";
import { FormTextArea } from "@/components/shared/form-textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
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
            <div className="text-muted-foreground">
              Title and Description...
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <Separator />
          <FieldGroup>
            <FormTextField
              control={control}
              name="title"
              label="Title"
              placeholder="Depression Mitigation App"
            />

            <FormTextArea
              control={control}
              name="description"
              label="Description"
              placeholder="An app to help users manage and mitigate symptoms of depression through various techniques and resources."
            />
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
