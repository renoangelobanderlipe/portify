"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
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
import {
  type UpdateUserProfileDTO,
  UpdateUserProfileSchema,
} from "@/features/settings/dtos/update-userInfo";

export const UserProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<UpdateUserProfileDTO>({
    resolver: zodResolver(UpdateUserProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      headline: "",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<UpdateUserProfileDTO> = (data) => {
    console.log("data", data);
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
              name="firstName"
              label="First Name"
              placeholder="Hannah"
            />
            <FormTextField
              control={control}
              name="lastName"
              label="Last Name"
              placeholder="Montanna"
            />
            <FormTextField
              control={control}
              name="contactNumber"
              label="Contact Number"
              placeholder="+639123456789"
            />

            <FormTextField
              control={control}
              name="headline"
              label="Headline"
              placeholder="Full Stack Developer"
            />
            <div className="col-span-2">
              <FormTextArea
                control={control}
                name="bio"
                label="Bio"
                placeholder="Write something about yourself..."
              />
            </div>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-end">
          {isDirty && <Button type="submit">Save changes</Button>}
        </CardFooter>
      </Card>
    </form>
  );
};
