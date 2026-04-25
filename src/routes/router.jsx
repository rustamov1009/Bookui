import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import RootLayout from "../layouts/RootLayout";
import Nasr from "../pages/Nasr";
import Nazm from "../pages/Nazm";
import Artical from "../pages/Article";
import Forum from "../pages/Forum";
import SingUp from "../pages/SingUp";
import SingIn from "../pages/SingIn";
import AddBook from "../pages/AddBook";
import AddAuthor from "../pages/AddAuthor";

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
    path: "/sing-up",
    element: <SingUp />,
  },
  {
    path: "/sing-in",
    element: <SingIn />,
  },
  {
    path: "/addbook",
    element: <AddBook />,
  },
  {
    path: "/addauthor",
    element: <AddAuthor />,
  },
  {
    path: "*",
    element: <h2>Not found</h2>,
  },
]);
export default routers;
