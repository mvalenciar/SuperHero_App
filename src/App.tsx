import { RouterProvider } from "react-router";
import { HeroAppRouter } from "./router/HeroAppRouter";
import { HeroesContextProvider } from "./context/HeroesProvider";

export const App = () => {
  return (
    <>
      <HeroesContextProvider>
        <RouterProvider router={HeroAppRouter} />
      </HeroesContextProvider>
    </>
  );
};
