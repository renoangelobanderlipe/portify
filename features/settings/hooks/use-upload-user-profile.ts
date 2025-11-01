import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadUserProfile } from "../services/upload-user-profile.service";

export const uploadUserProfileService = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: File) => uploadUserProfile({ file: data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User profile uploaded successfully");
    },
    onError: (error) => {
      toast.error("Error uploading user profile:");
      console.error("Error uploading user profile:", error);
    },
  });
};
