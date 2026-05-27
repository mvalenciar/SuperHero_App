import { Link } from "react-router";
import logo from "/images/logo_app.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="
      p-2 rounded-md text-white
      hover:bg-white/10 transition
    "
        >
          ☰
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-slate-900 text-white border-white/10"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <img
              src={logo}
              className="w-20"
              alt="logo pequeño de la hero app"
            />
            <h3 className="text-lg font-bold text-white">Navegación</h3>
          </SheetTitle>
          <SheetDescription className="hidden">
            Menu de navegación
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <Link
            to="/"
            className="
          text-white/80 text-lg py-2 px-3 rounded-md
          transition
          hover:text-white
          hover:bg-linear-to-r
          hover:from-amber-500/10
          hover:to-red-500/10
        "
          >
            Inicio
          </Link>
          <Link
            to="/advancedSearch"
            className="
          text-white/80 text-lg py-2 px-3 rounded-md
          transition
          hover:text-white
          hover:bg-linear-to-r
          hover:from-amber-500/10
          hover:to-red-500/10
        "
          >
            Búsqueda Avanzada
          </Link>
          <Link
            to="/favorites"
            className="
          text-white/80 text-lg py-2 px-3 rounded-md
          transition
          hover:text-white
          hover:bg-linear-to-r
          hover:from-amber-500/10
          hover:to-red-500/10
        "
          >
            Favoritos
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
