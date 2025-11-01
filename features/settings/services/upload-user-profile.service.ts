import api from "@/lib/axios";
import { ENDPOINT } from "@/utils/constants/endpoints";

type UploadUserProfileParams = {
  file: File;
  id: number;
};

export const uploadUserProfile = async ({
  file,
  id,
}: UploadUserProfileParams) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.post(`${ENDPOINT.AUTH.USER}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
