import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserProfileDTO } from "../dtos/update-userInfo";
import { updateUserProfile } from "../services/update-user-profile.service";

type Props = {
  id: number;
};

export const useUpdateUserProfile = ({ id }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserProfile", id],
    mutationFn: (data: UpdateUserProfileDTO) => updateUserProfile(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
