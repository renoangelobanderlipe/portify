"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FormTextField } from "@/components/shared/form-text-field";
import { Button } from "@/components/ui/button";
import {
  type UpdatePasswordDTO,
  UpdatePasswordSchema,
} from "@/features/settings/dtos/update-password";
import { cn } from "@/lib/utils";

export const PasswordSettings = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm<UpdatePasswordDTO>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: { currentPassword: "*********" },
  });

  const resetForm = () => {
    reset();
    setIsUpdating(false);
  };

  const onSubmit: SubmitHandler<UpdatePasswordDTO> = (data) => {
    console.log("Submitting password update:", data);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <form
        className={cn("grid gap-4", isUpdating ? "col-span-3" : "col-span-2")}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Current Password */}
        <FormTextField
          control={control}
          name="currentPassword"
          label="Current Password"
          placeholder="Enter your current password"
          type="password"
          disabled
        />

        {/* Update Section */}
        {isUpdating && (
          <>
            <div className="flex gap-4">
              <FormTextField
                control={control}
                name="newPassword"
                label="New Password"
                placeholder="Enter your new password"
                type="password"
              />
              <FormTextField
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your new password"
                type="password"
              />
            </div>

            <div className="flex w-full justify-end gap-2">
              <Button variant="ghost" type="button" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !dirtyFields.newPassword || !dirtyFields.confirmPassword
                }
              >
                Save Changes
              </Button>
            </div>
          </>
        )}
      </form>

      {/* Update Password Button */}
      {!isUpdating && (
        <div className="col-span-1 flex justify-end pt-6">
          <Button variant="ghost" onClick={() => setIsUpdating(true)}>
            Update Password
          </Button>
        </div>
      )}
    </div>
  );
};
