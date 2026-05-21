//Hooks
import { useContext } from "react";
import { usePagination } from "../hooks/usePagination";

//Context
import { HeroesContext } from "../../../context/HeroesContext";

//Components
import { HeroPaginationController } from "./HeroPaginationController";
import { Spinner } from "@/components/ui/spinner";
import { HeroCard } from "./HeroCard";

//Action and types
import type { Superhero } from "../interfaces/superhero.interface.ts";

interface HeroesGridProps {
  heroes: Superhero[];
  loading: boolean;
}

export const HeroesGrid = ({ heroes, loading }: HeroesGridProps) => {
  const {
    startIndex,
    endIndex,
    totalPages,
    currentPage,
    changeToNextPage,
    changeToPrevPage,
  } = usePagination(heroes);

  const { isFavorite, saveFavorite } = useContext(HeroesContext);

  if (loading) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-3 p-2 min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 p-2 min-h-150">
        {heroes.slice(startIndex, endIndex).map((hero) => (
          <HeroCard
            key={hero.id}
            name={hero.name}
            fullname={hero.fullname}
            image={hero.image}
            publisher={hero.publisher}
            stats={hero.stats}
            favorite={isFavorite(hero.id)}
            saveFavorite={() => saveFavorite(hero.id)}
          />
        ))}
      </div>
      <HeroPaginationController
        totalPages={totalPages}
        currentPage={currentPage}
        pagesPerGroup={5}
        nextPage={changeToNextPage}
        prevPage={changeToPrevPage}
      />
    </>
  );
};
