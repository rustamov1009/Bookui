import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routers from "../routes/router";
import { useGetProfile } from "../hooks/api/useGetProfile";
import { useEffect } from "react";

const queryClient = new QueryClient();
const providers = ({ childern }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers}>{childern}</RouterProvider>,
      <ToastContainer />,
    </QueryClientProvider>
  );
};

export default providers;
