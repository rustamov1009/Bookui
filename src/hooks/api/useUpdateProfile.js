import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/localstorage";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const token = getTokenFromLocalStorage();

  const updateProfile = async (payload) => {
    return await axios.patch("http://localhost:3000/api/users/me", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, isPending, isSuccess, error, mutateAsync } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { data, isPending, isSuccess, error, mutateAsync };
};
