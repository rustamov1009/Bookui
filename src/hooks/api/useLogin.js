import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
  const { data, isLoading, error, isSuccess, mutateAsync } = useMutation({
    queryKey: ["login"],
    mutationFn: (data) => onLogin(data),
    onSuccess: (data) => localStorage.setItem("token", data.data.token),
  });
  const onLogin = async (payload) => {
    return await axios.post("http://localhost:3000/api/auth/login", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return { data, isLoading, isSuccess, mutateAsync, error };
};
