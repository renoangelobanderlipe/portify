"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FormTextField } from "@/components/shared/form-text-field";
import { Button } from "@/components/ui/button";
import {
  type UpdateEmailDTO,
  UpdateEmailSchema,
} from "@/features/settings/dtos/update-email";
import { cn } from "@/lib/utils";

export const EmailSettings = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm<UpdateEmailDTO>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: { email: "admin@admin.com" },
  });

  const resetForm = () => {
    reset();
    setIsUpdating(false);
  };

  const onSubmit: SubmitHandler<UpdateEmailDTO> = (data) => {
    console.log("Submitting email update:", data);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <form
        className={cn("grid gap-4", isUpdating ? "col-span-3" : "col-span-2")}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Current Email */}
        <FormTextField
          control={control}
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          disabled
        />

        {/* Update Section */}
        {isUpdating && (
          <>
            <div className="flex gap-4">
              <FormTextField
                control={control}
                name="newEmail"
                label="New Email Address"
                placeholder="Enter your new email address"
              />
              <FormTextField
                control={control}
                name="confirmEmail"
                label="Confirm Email Address"
                placeholder="Confirm your email address"
              />
            </div>

            <div className="flex w-full justify-end gap-2">
              <Button variant="ghost" type="button" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!dirtyFields.newEmail || !dirtyFields.confirmEmail}
              >
                Save Changes
              </Button>
            </div>
          </>
        )}
      </form>

      {/* Update Email Button */}
      {!isUpdating && (
        <div className="col-span-1 flex justify-end pt-6">
          <Button variant="ghost" onClick={() => setIsUpdating(true)}>
            Update Email
          </Button>
        </div>
      )}
    </div>
  );
};
