import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* BRAND */}
          <div className="space-y-3">
            <h2 className="text-2xl font-black tracking-wide">HERO APP</h2>

            <p className="text-zinc-400 leading-relaxed">
              Explora héroes y villanos del universo Marvel y DC. Descubre
              estadísticas, historias y guarda tus favoritos.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navegación</h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Inicio
                </Link>
              </li>

              <li>
                <Link to="/favorites" className="hover:text-white transition">
                  Favoritos
                </Link>
              </li>

              <li>
                <Link to="/search" className="hover:text-white transition">
                  Buscar héroes
                </Link>
              </li>
            </ul>
          </div>

          {/* EXTRA */}
          <div>
            <h3 className="text-lg font-bold mb-4">Información</h3>

            <div className="space-y-3 text-zinc-400">
              <p>Proyecto hecho con React + TailwindCSS.</p>

              <p>
                Datos obtenidos desde la API{" "}
                <a
                  href="https://akabab.github.io/superhero-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600"
                >
                  superhero-api
                </a>
                .{" "}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © 2026 Hero App. Todos los derechos reservados.
          </p>

          <div className="flex gap-4 text-sm text-zinc-400">
            <a
              href="https://github.com/mvalenciar/SuperHero_App"
              className="hover:text-white transition"
            >
              GitHub
              <Github />
            </a>

            <a
              href="https://www.linkedin.com/feed/"
              className="hover:text-white transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
