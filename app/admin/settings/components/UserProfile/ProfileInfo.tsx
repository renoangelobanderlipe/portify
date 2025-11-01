"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { FormProfileUploader } from "@/components/shared/form-profile-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type UpdateUserInfoDTO,
  UpdateUserInfoSchema,
} from "@/features/settings/dtos/update-userInfo";
import { useDeleteUserAccount } from "@/features/settings/hooks/use-delete-user-account";
import { uploadUserProfileService } from "@/features/settings/hooks/use-upload-user-profile";
import { cn } from "@/lib/utils";

type ProfileInfoProps = {
  id: number;
  avatar?: string | null;
};

export const ProfileInfo = ({ id, avatar }: ProfileInfoProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const avatarUrl = `http://api.portify.test/${avatar}`;

  console.log("Avatar URL:", avatarUrl);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { dirtyFields },
  } = useForm<UpdateUserInfoDTO>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: {
      photo: avatarUrl || undefined, // Use avatar URL if exists
    },
  });

  const photo = useWatch({ control, name: "photo" });

  const { mutate: deleteUser } = useDeleteUserAccount(id);
  const { mutate: uploadPhoto } = uploadUserProfileService(id);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteUser();
    setOpenDialog(false);
  };

  const onSubmit: SubmitHandler<UpdateUserInfoDTO> = (data) => {
    if (data.photo) {
      uploadPhoto(data.photo);
    }
  };

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormProfileUploader control={control} name="photo" />

            <div className="flex items-center justify-center">
              <Button
                variant="destructive"
                type="button"
                onClick={() => setOpenDialog(true)}
              >
                Delete Account
              </Button>
            </div>

            {dirtyFields.photo && (
              <div
                className={cn(
                  "grid gap-4",
                  photo ? "grid-cols-2" : "grid-cols-1",
                )}
              >
                {photo && (
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

      <DeleteDialog
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account."
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        handleOnClick={handleDelete}
      />
    </>
  );
};
