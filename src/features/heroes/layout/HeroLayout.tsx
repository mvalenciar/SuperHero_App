import { MenuBar } from "@/components/custom/MenuBar";
import { Outlet } from "react-router";

export const HeroLayout = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-blue-950 to-red-950 text-white overflow-x-hidden">
      <div className="relative inset-0 overflow-x-hidden bg-linear-to-br pointer-events-none">
        <div className="absolute -top-25 -left-25 w-100 h-100 bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-25 -right-25 w-100 h-100 bg-red-500 opacity-20 blur-3xl rounded-full"></div>
      </div>
      <MenuBar />

      <Outlet />
    </div>
  );
};
