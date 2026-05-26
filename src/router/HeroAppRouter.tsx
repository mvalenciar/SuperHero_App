import { createBrowserRouter } from "react-router";
import { HeroLayout } from "../features/heroes/layout/HeroLayout";
import { HomePage } from "../features/heroes/pages/home/HomePage";
import { FavoritesPage } from "../features/heroes/pages/favorites/FavoritesPage";
import { SearchPage } from "../features/heroes/pages/search/SearchPage";
import { HeroPage } from "../features/heroes/pages/hero/HeroPage";

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
        path: "/hero/:idSlug",
        element: <HeroPage />,
      },
      {
        path: "advancedSearch",
        element: <SearchPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);
