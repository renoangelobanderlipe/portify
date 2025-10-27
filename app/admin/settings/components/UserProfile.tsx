"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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

const CreateUserProfileSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string({ message: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  contactNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid contact number")
    .optional()
    .or(z.literal("")),
  headline: z
    .string()
    .max(120, "Headline must be less than 120 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateUserProfileDTO = z.infer<typeof CreateUserProfileSchema>;

export const UserProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<CreateUserProfileDTO>({
    resolver: zodResolver(CreateUserProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      headline: "",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<CreateUserProfileDTO> = (data) => {
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
              placeholder="09123456789"
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
