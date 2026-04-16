import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
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
