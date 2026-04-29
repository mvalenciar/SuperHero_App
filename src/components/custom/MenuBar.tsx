import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { MobileMenu } from "./MobileMenu";

export const MenuBar = () => {
  return (
    <div className="w-full px-4 py-2 bg-slate-900/70 backdrop-blur-md border-b border-white/10 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* 🔥 Logo pequeño */}
      <img
        src="logo_app.png"
        className="w-20"
        alt="logo pequeño de la hero app"
      />

      {/* 🖥️ Desktop */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="
              px-4 py-2 rounded-md text-sm font-medium text-white/80 transition-all duration-200 hover:text-white hover:bg-linear-to-r hover:from-amber-500/20 hover:to-red-500/20 hover:shadow-[0_0_10px_rgba(251,191,36,0.4)] focus:outline-none focus:bg-amber-500/20
              "
              >
                <Link to={"/"}>Inicio</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Heroes */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="
              px-4 py-2 rounded-md text-sm font-medium text-white/80 transition-all duration-200 hover:text-white hover:bg-linear-to-r hover:from-amber-500/20 hover:to-red-500/20 hover:shadow-[0_0_10px_rgba(251,191,36,0.4)] focus:outline-none focus:bg-amber-500/20
              "
              >
                <Link to={"/"}>Búsqueda Avanzada</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Favoritos */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="
              px-4 py-2 rounded-md text-sm font-medium text-white/80 transition-all duration-200 hover:text-white hover:bg-linear-to-r hover:from-amber-500/20 hover:to-red-500/20 hover:shadow-[0_0_10px_rgba(251,191,36,0.4)] focus:outline-none focus:bg-amber-500/20
              "
              >
                <Link to={"/"}>Favoritos</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* 📱 Menú móvil */}
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};
