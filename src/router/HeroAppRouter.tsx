import { createBrowserRouter } from "react-router";
import { HomePage } from "../heroes/pages/home/HomePage";
import { HeroLayout } from "../heroes/layout/HeroLayout";

export const HeroAppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
