import { useContext } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";
import { useParams } from "react-router";
import { HeroStatBar } from "../../components/HeroStatBar";

export const HeroPage = () => {
  const { heroes } = useContext(HeroesContext);
  const { idSlug } = useParams();

  const hero = heroes.find((hero) => hero.slug === idSlug);

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
          <div className="flex justify-center">
            <img
              src={hero.image}
              alt={`imagen de ${hero.name}`}
              className="
                w-full
                max-w-md
                rounded-3xl
                shadow-2xl
                object-cover
                border
                border-zinc-800
              "
            />
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
                {hero.fullname}
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
