import z from "zod";

export const UpdateUserInfoSchema = z.object({
  photo: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine((fileOrString) => {
      // Only validate size if it's a File
      if (fileOrString instanceof File) {
        return fileOrString.size <= 3 * 1024 * 1024;
      }
      return true;
    }, "Max file size is 3MB")
    .refine((fileOrString) => {
      // Only validate type if it's a File
      if (fileOrString instanceof File) {
        return ["image/jpeg", "image/png", "image/gif"].includes(
          fileOrString.type,
        );
      }
      return true;
    }, "Only .jpeg, .jpg, .png, .gif formats are supported"),
});

export type UpdateUserInfoDTO = z.infer<typeof UpdateUserInfoSchema>;

export const UpdateUserProfileSchema = z.object({
  first_name: z
    .string({ message: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  middle_name: z
    .string({ message: "Middle name is required" })
    .max(50, "Middle name must be less than 50 characters")
    .optional(),
  last_name: z
    .string({ message: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  suffix: z
    .string()
    .max(10, "Suffix must be less than 10 characters")
    .optional(),
  contact_number: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (val === "") return true;
        const normalized = val.replace(/[^\d+]/g, "");
        return /^(?:\+639|09)\d{9}$/.test(normalized);
      },
      {
        message:
          "Please enter a valid PH mobile number (e.g., 09171234567 or +639171234567)",
      },
    )
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

export type UpdateUserProfileDTO = z.infer<typeof UpdateUserProfileSchema>;
