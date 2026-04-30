import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useGetProfile } from "../hooks/api/useGetProfile";
import { useUserStore } from "../store/user,store";
const RootLayout = () => {
  const [data, isLoading, isSuccess, error] = useGetProfile();
  const store = useUserStore();
  useEffect(() => {
    if (isSuccess) {
      const user = data?.data;

      store.setUser(user);
    }
  }, [isSuccess]);
  useEffect(() => {
    document.body.style.background = "#191919";
  }, []);
  console.log(store);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default RootLayout;
