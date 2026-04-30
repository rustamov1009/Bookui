import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/localstorage";

export const useGetProfile = () => {
  const token = getTokenFromLocalStorage();

  const getProfile = async () => {
    return await axios.get("http://localhost:3000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: Boolean(token),
  });

  return [data, isLoading, isSuccess, error];
};
