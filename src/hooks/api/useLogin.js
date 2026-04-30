import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () => {
  const onLogin = async (payload) => {
    return await axios.post("http://localhost:3000/api/auth/login", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { data, isLoading, error, isSuccess, mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: onLogin,
    onSuccess: (data) => localStorage.setItem("token", data.data.token),
  });

  return { data, isLoading, isSuccess, mutateAsync, error };
};
