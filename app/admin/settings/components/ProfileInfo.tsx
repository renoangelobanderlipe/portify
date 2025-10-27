"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProfileUploader } from "@/components/shared/form-profile-uploader";
import { FormSwitchField } from "@/components/shared/form-switch-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type UpdateProfileDTO,
  UpdateProfileSchema,
} from "@/features/settings/dtos/updateProfile";

export const ProfileInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<UpdateProfileDTO>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      photo: undefined,
      emailVerified: false,
    },
  });

  const onSubmit = (data: UpdateProfileDTO) => {
    console.log("Form submitted:", data);
  };
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormProfileUploader control={control} name="photo" />
          <FormSwitchField
            control={control}
            name="emailVerified"
            label="Email verified"
            description="Disabling this will automatically send the user a verification email."
          />
          {(!!dirtyFields.photo || !!dirtyFields.emailVerified) && (
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
