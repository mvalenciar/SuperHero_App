import { createBrowserRouter } from "react-router";
import { HeroLayout } from "../features/heroes/layout/HeroLayout";
import { HomePage } from "../features/heroes/pages/home/HomePage";
import { FavoritesPage } from "../features/heroes/pages/home/FavoritesPage";
import { SearchPage } from "../features/heroes/pages/home/SearchPage";

export const HeroAppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "advancedSearch",
        element: <SearchPage />,
      },
    ],
  },
]);
