import { Outlet } from "react-router";

export const HeroLayout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-red-950 text-white">
      {/* Glow azul */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Glow rojo */}
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-red-500 opacity-20 blur-3xl rounded-full"></div>

      <Outlet />
    </div>
  );
};
