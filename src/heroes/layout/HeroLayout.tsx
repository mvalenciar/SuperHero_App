import { Outlet } from "react-router";

export const HeroLayout = () => {
  return (
    <div className="bg-purple-200">
      <Outlet />
    </div>
  );
};
