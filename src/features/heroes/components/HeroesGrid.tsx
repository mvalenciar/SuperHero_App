//Hooks
import { usePagination } from "../hooks/usePagination";

//Components
import { HeroPaginationController } from "./HeroPaginationController";
import { HeroCard } from "./HeroCard";

//Action and types
import type { Superhero } from "../interfaces/superhero.interface.ts";

interface HeroesGridProps {
  heroes: Superhero[];
}

export const HeroesGrid = ({ heroes }: HeroesGridProps) => {
  const {
    startIndex,
    endIndex,
    totalPages,
    currentPage,
    changeToNextPage,
    changeToPrevPage,
    setCurrentPage,
  } = usePagination(heroes);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 p-2 min-h-[600px]">
        {heroes.slice(startIndex, endIndex).map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
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
