"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSelectField } from "@/components/shared/form-select-field";
import { FormTextField } from "@/components/shared/form-text-field";
import { FormTextArea } from "@/components/shared/form-textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  type UpdateUserProfileDTO,
  UpdateUserProfileSchema,
} from "@/features/settings/dtos/update-userInfo";
import { useUpdateUserProfile } from "@/features/settings/hooks/use-update-user-profile";
import type { User } from "@/types/user";

type UserProfileProps = {
  user: User;
};

export const UserProfile = ({ user }: UserProfileProps) => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<UpdateUserProfileDTO>({
    resolver: zodResolver(UpdateUserProfileSchema),
    defaultValues: {
      first_name: user.first_name || "",
      middle_name: user.middle_name || "",
      last_name: user.last_name || "",
      suffix: user.suffix || "",
      contact_number: user.contact_number || "",
      headline: user.headline || "",
      bio: user.bio || "",
    },
  });

  const { mutate: updateUserProfile, isPending } = useUpdateUserProfile({
    id: user.id,
  });

  const onSubmit: SubmitHandler<UpdateUserProfileDTO> = (data) => {
    updateUserProfile(data, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: () => {
        toast.error("Failed to update profile. Please try again.");
      },
    });
  };

  const isDirty = Object.keys(dirtyFields).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader />
        <CardContent>
          <FieldGroup className="grid grid-cols-2">
            <FormTextField
              control={control}
              name="first_name"
              label="First Name"
              placeholder="Hannah"
              loading={user.first_name === undefined}
            />

            <FormTextField
              control={control}
              name="last_name"
              label="Last Name"
              placeholder="Montanna"
              loading={user.last_name === undefined}
            />

            <FormTextField
              control={control}
              name="middle_name"
              label="Middle Name"
              placeholder="Montanna"
              loading={user.middle_name === undefined}
            />

            <FormSelectField
              control={control}
              name="suffix"
              label="Suffix"
              placeholder="Select Suffix"
              options={[
                { label: "Jr.", value: "Jr." },
                { label: "Sr.", value: "Sr." },
                { label: "II", value: "II" },
                { label: "III", value: "III" },
                { label: "IV", value: "IV" },
                { label: "V", value: "V" },
                { label: "VI", value: "VI" },
                { label: "VII", value: "VII" },
                { label: "VIII", value: "VIII" },
                { label: "IX", value: "IX" },
                { label: "X", value: "X" },
              ]}
            />

            <FormTextField
              control={control}
              name="contact_number"
              label="Contact Number"
              placeholder="+639123456789"
              loading={user.contact_number === undefined}
            />

            <FormTextField
              control={control}
              name="headline"
              label="Headline"
              placeholder="Full Stack Developer"
              loading={user.headline === undefined}
            />
            <div className="col-span-2">
              <FormTextArea
                control={control}
                name="bio"
                label="Bio"
                placeholder="Write something about yourself..."
                loading={user.bio === undefined}
              />
            </div>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-end">
          {isDirty && (
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Save changes"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};
