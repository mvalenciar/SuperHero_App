import { useState } from "react";
import { HeroCard } from "./HeroCard";
import type { hero } from "../data/data";
import { HeroPaginationController } from "./HeroPaginationController";

interface HeroesGridProps {
  heroes: hero[];
}

export const HeroesGrid = ({ heroes }: HeroesGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(heroes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage * currentPage;

  const changeToNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const changeToPrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 p-2 min-h-150">
        {heroes.slice(startIndex, endIndex).map((heroe, index) => (
          <HeroCard {...heroe} key={index} />
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
