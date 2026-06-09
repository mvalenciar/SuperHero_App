//Hooks
import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

//Context
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { HeroStatBar } from "../../components/HeroStatBar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ArrowBigLeft, ArrowBigRight, ArrowBigUp } from "lucide-react";

//Action and Types
import { cn } from "@/lib/utils";
import type { Superhero } from "../../interfaces/superhero.interface";
import type { HeroLocationState } from "../../interfaces/heroLocationState.interface";

export const HeroPage = () => {
  // Guarda la URL de la última imagen cargada correctamente.
  // Se usa para determinar cuándo mostrar el skeleton/loading.
  const [loadedImage, setLoadedImage] = useState("");

  // Obtiene la lista global de héroes desde el contexto.
  const { heroes } = useContext(HeroesContext);

  // URL PARAMS
  // Obtiene el slug dinámico de la URL.
  // Ejemplo: /hero/270-franklin-storm
  const { idSlug } = useParams();

  // REACT ROUTER HOOKS
  const navigate = useNavigate();
  const location = useLocation();

  // LOCATION STATE
  // Obtiene el estado enviado desde navigate(...)
  // Puede venir null si el usuario refresca la página
  // o entra directamente desde la URL.
  const state = (location.state as HeroLocationState) || null;

  // heroState -> héroe enviado desde la navegación
  // from -> página desde donde se abrió el HeroPage
  const heroState = state?.hero;
  const from = state?.from;

  // Primero intenta usar el héroe enviado por navigation state.
  // Si no existe (refresh/direct URL), busca el héroe usando el slug.
  const hero: Superhero | undefined =
    heroState || heroes.find((hero) => hero.slug === idSlug);

  // Determina si la imagen actual ya terminó de cargar.
  const imageLoaded = loadedImage === hero?.image;

  // Navega a la página anterior.
  // Si no existe una página previa, vuelve al home.
  const handleBack = (page?: string) => {
    navigate(page || "/");
  };

  // Obtiene la posición actual del héroe dentro del array.
  // Se usa para navegar entre héroes consecutivos.
  const currentIndex = heroes.findIndex((hero) => hero.slug === idSlug);

  // Obtiene el héroe anterior y siguiente según el índice actual.
  const previousHero = heroes[currentIndex - 1];
  const nextHero = heroes[currentIndex + 1];

  // Navega al detalle de otro héroe manteniendo:
  // - el estado del héroe
  // - la página de origen
  const handleHeroNavigation = (hero: Superhero) => {
    navigate(`/hero/${hero.slug}`, {
      state: {
        hero,
        from,
      },
    });
  };

  if (!hero) {
    return (
      <div className="mt-32 text-center text-white">
        <h1 className="text-5xl font-bold">Héroe no encontrado</h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-950 text-white mt-[71px]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="relative w-full max-w-md h-[700px]">
              {/* SKELETON */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex justify-center items-center rounded-3xl border border-zinc-800 bg-zinc-900 animate-pulse overflow-hidden">
                  <Spinner aria-label="spinner-icon" className="size-14" />
                </div>
              )}
              <img
                src={hero.image}
                alt={`imagen de ${hero.name}`}
                loading="lazy"
                onLoad={() => setLoadedImage(hero.image)}
                onError={() => setLoadedImage(hero.image)}
                className={cn(
                  "w-full h-full rounded-3xl shadow-2xl object-cover border border-zinc-800 transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
            {/* NAVIGATION CONTROLLER */}
            <div className="flex gap-3">
              {previousHero && (
                <Button
                  role="button"
                  aria-label="prev-button"
                  className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-amber-500/40 transition-all duration-300 w-fit"
                  onClick={() => handleHeroNavigation(previousHero)}
                >
                  <ArrowBigLeft />
                </Button>
              )}

              <Button
                role="button"
                aria-label="back-button"
                onClick={() => handleBack(from)}
                className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-amber-500/40 transition-all duration-300 w-fit"
              >
                <ArrowBigUp />
              </Button>

              {nextHero && (
                <Button
                  role="button"
                  aria-label="next-button"
                  className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-amber-500/40 transition-all duration-300 w-fit"
                  onClick={() => handleHeroNavigation(nextHero)}
                >
                  <ArrowBigRight />
                </Button>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-8">
            {/* HEADER */}
            <div className="space-y-3">
              <span
                className={`
                  inline-block
                  px-4
                  py-1
                  rounded-full
                  text-sm
                  font-bold
                  tracking-widest
                  ${hero.type === "good" ? "bg-blue-600" : "bg-red-600"}
                `}
              >
                {hero.type === "good" ? "HÉROE" : "VILLANO"}
              </span>

              <h1 className="text-5xl md:text-6xl font-black tracking-wide">
                {hero.name.toUpperCase()}
              </h1>

              <h2 className="text-xl text-zinc-400 font-medium">
                {hero.fullname?.toUpperCase() || hero.name.toUpperCase()}
              </h2>
            </div>

            {/* GENERAL INFO */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-2xl font-bold mb-5">Datos Generales</h3>

              <div className="space-y-3 text-zinc-300">
                <p>
                  <span className="font-semibold text-white">Raza:</span>{" "}
                  {hero.race}
                </p>

                <p>
                  <span className="font-semibold text-white">Altura:</span>{" "}
                  {hero.height[1]}
                </p>

                <p>
                  <span className="font-semibold text-white">Peso:</span>{" "}
                  {hero.weight[1]}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Lugar de nacimiento:
                  </span>{" "}
                  {hero.placeOfBirth}
                </p>
              </div>
            </div>

            {/* STATS */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-2xl font-bold mb-6">Power Stats</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <HeroStatBar stat="Fuerza" value={hero.stats.strength} />

                <HeroStatBar stat="Velocidad" value={hero.stats.speed} />

                <HeroStatBar
                  stat="Inteligencia"
                  value={hero.stats.intelligence}
                />

                <HeroStatBar stat="Combate" value={hero.stats.combat} />

                <HeroStatBar stat="Durabilidad" value={hero.stats.durability} />

                <HeroStatBar stat="Poder" value={hero.stats.power} />
              </div>
            </div>

            {/* EXTRA INFO */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ocupación</h3>

                <p className="text-zinc-300 leading-relaxed">{hero.work}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Afiliación Grupal</h3>

                <p className="text-zinc-300 leading-relaxed">
                  {hero.groupAffiliation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
