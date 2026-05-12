import { useState } from "react";
import type { superhero } from "../interfaces/superhero.interface";

export const usePagination = (heroes: superhero[]) => {
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
  return {
    //values
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    //actions
    changeToNextPage,
    changeToPrevPage,
  };
};
