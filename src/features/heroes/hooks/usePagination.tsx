import { useEffect, useState } from "react";
import type { Superhero } from "../interfaces/superhero.interface";

export const usePagination = (heroes: Superhero[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(heroes.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage * currentPage;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [heroes]);

  const changeToNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const changeToPrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  return {
    //values
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    //actions
    changeToNextPage,
    changeToPrevPage,
    setCurrentPage,
  };
};
