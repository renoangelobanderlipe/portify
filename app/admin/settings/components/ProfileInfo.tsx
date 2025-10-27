"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { FormProfileUploader } from "@/components/shared/form-profile-uploader";
import { FormSwitchField } from "@/components/shared/form-switch-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type UpdateUserInfoDTO,
  UpdateUserInfoSchema,
} from "@/features/settings/dtos/updateUserInfo";
import { cn } from "@/lib/utils";

export const ProfileInfo = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { dirtyFields },
  } = useForm<UpdateUserInfoDTO>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: {
      photo: undefined,
      emailVerified: false,
    },
  });

  const photo = useWatch({ control, name: "photo", defaultValue: undefined });

  const onSubmit: SubmitHandler<UpdateUserInfoDTO> = (data) => {
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
            <div
              className={cn(
                "grid gap-4",
                photo ? "grid-cols-2" : "grid-cols-1",
              )}
            >
              {!!dirtyFields.photo && photo && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setValue("photo", undefined)}
                >
                  Remove Photo
                </Button>
              )}
              <Button type="submit">Save changes</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
