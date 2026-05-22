//Hooks
import { usePagination } from "../hooks/usePagination";

//Components
import { HeroPaginationController } from "./HeroPaginationController";
import { Spinner } from "@/components/ui/spinner";
import { HeroCard } from "./HeroCard";

//Action and types
import type { Superhero } from "../interfaces/superhero.interface.ts";
import { HeroesEmptyState } from "./HeroesEmptyState.tsx";

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-3 p-2 min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (heroes.length > 0)
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 p-2 min-h-[600px]">
          {heroes.slice(startIndex, endIndex).map((hero) => (
            <HeroCard hero={hero} />
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

  return (
    <>
      <HeroesEmptyState />
    </>
  );
};
