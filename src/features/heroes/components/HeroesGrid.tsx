//Hooks
import { useState } from "react";

//Components

import { HeroPaginationController } from "./HeroPaginationController";
import { CustomSearchController } from "@/components/custom/CustomSearchController";
import { Spinner } from "@/components/ui/spinner";

//Action and types
import type { superhero } from "../interfaces/superhero.interface";
import { HeroCard } from "./HeroCard";

interface HeroesGridProps {
  heroes: superhero[];
  loading: boolean;
}

export const HeroesGrid = ({ heroes, loading }: HeroesGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(heroes.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage * currentPage;

  const changeToNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const changeToPrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-3 p-2 min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <>
      <CustomSearchController />
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 p-2 min-h-150">
        {heroes.slice(startIndex, endIndex).map((hero) => (
          <HeroCard
            key={hero.id}
            name={hero.name}
            fullname={hero.fullname}
            image={hero.image}
            publisher={hero.publisher}
            stats={hero.stats}
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
