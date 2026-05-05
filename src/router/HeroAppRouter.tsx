import { HeroLayout } from "@/features/heroes/layout/HeroLayout";
import { HomePage } from "@/features/heroes/pages/home/HomePage";
import { createBrowserRouter } from "react-router";

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
