import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  const onRegister = async (payload) => {
    return await axios.post(
      "http://localhost:3000/api/auth/register",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };
  const { data, isLoading, error, isSuccess, mutate, mutateAsync } =
    useMutation({
      mutationKey: ["register"],
      mutationFn: onRegister,
      onSuccess: (data) => localStorage.setItem("token", data.data.token),
    });

  return {
    data,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    error,
  };
};
