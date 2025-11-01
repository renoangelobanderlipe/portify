import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PROJECT_URL } from "@/utils/constants/urls";
import { deleteUserAccount } from "../services/delete-user-account.service";

export const useDeleteUserAccount = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUserAccount(id),
    onSuccess: () => {
      // We make sure to invalidate the user query and clear the cache
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.clear();

      // Redirect to login page after account deletion
      window.location.href = PROJECT_URL.LOGIN;
    },
    onError: (error) => {
      toast.error("Error deleting user account:");
      console.error("Error deleting user account:", error?.message);
    },
  });
};
