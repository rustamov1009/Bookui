import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import RootLayout from "../layouts/RootLayout";
import Nasr from "../pages/Nasr";
import Nazm from "../pages/Nazm";
import Artical from "../pages/Article";
import Forum from "../pages/Forum";

const routers = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/nasr",
        element: <Nasr />,
      },
      {
        path: "/nazm",
        element: <Nazm />,
      },
      {
        path: "/maqolalar",
        element: <Artical />,
      },
      {
        path: "/forum",
        element: <Forum />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <h1>SignUp</h1>,
  },
  {
    path: "/sign-in",
    element: <h1>SignIn</h1>,
  },
  {
    path: "*",
    element: <h2>Not found</h2>,
  },
]);
export default routers;
