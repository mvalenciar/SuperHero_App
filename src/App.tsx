import { RouterProvider } from "react-router";
import { HeroAppRouter } from "./router/HeroAppRouter";

export const App = () => {
  return (
    <>
      <RouterProvider router={HeroAppRouter} />
    </>
  );
};
