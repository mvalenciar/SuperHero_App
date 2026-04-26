import { Link } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

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
        <div className="flex flex-col gap-4 mt-10 px-4">
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
            to="/heroes"
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
            to="/heroes"
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
