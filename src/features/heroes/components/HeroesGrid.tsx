// GSAP Library
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

//Hooks
import { usePagination } from "../hooks/usePagination";

//Components
import { HeroPaginationController } from "./HeroPaginationController.tsx";
import { HeroCard } from "./HeroCard";

//Action and types
import type { Superhero } from "../interfaces/superhero.interface.ts";
import type { HeroNavigationFrom } from "../interfaces/heroNavigationFrom.type.ts";

interface HeroesGridProps {
  heroes: Superhero[];
  from: HeroNavigationFrom;
}

export const HeroesGrid = ({ heroes, from }: HeroesGridProps) => {
  const {
    startIndex,
    endIndex,
    totalPages,
    currentPage,
    changeToNextPage,
    changeToPrevPage,
    setCurrentPage,
  } = usePagination(heroes);

  //Configuración de la animación para las tarjetas
  useGSAP(() => {
    gsap.from(".animate-hero-card", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.08, // Hace que las tarjetas aparezcan una tras otra con un desfase mínimo
      ease: "power1.out",
    });
  }, [currentPage]); // Se dispara al cambiar de página

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 p-2 min-h-[600px]">
        {heroes.slice(startIndex, endIndex).map((hero) => (
          //Se agrega la clase identificadora para la animación
          <div
            key={hero.id}
            className="animate-hero-card w-full flex justify-center"
          >
            <HeroCard hero={hero} from={from} />
          </div>
        ))}
      </div>
      <HeroPaginationController
        totalPages={totalPages}
        currentPage={currentPage}
        pagesPerGroup={5}
        nextPage={changeToNextPage}
        prevPage={changeToPrevPage}
        setPage={setCurrentPage}
      />
    </>
  );
};
