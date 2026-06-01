import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { usePagination } from "../usePagination";
import type { Superhero } from "../../interfaces/superhero.interface";

const createMockHero = (id: number): Superhero => ({
  id: id,
  name: `Hero ${id}`,
  slug: "",
  fullname: "",
  image: "",
  gender: "",
  race: null,
  height: [],
  weight: [],
  placeOfBirth: "",
  publisher: null,
  stats: {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  },
  work: "",
  type: "",
  groupAffiliation: "",
});

const mockHeroes: Superhero[] = Array.from({ length: 20 }, (_, index) =>
  createMockHero(index),
);

const renderUsePagination = () => renderHook(() => usePagination(mockHeroes));

describe("usePagination", () => {
  test("should initialize with page 1", () => {
    const { result } = renderUsePagination();

    expect(result.current.currentPage).toBe(1);
  });

  test("should calculate totalPages correctly", () => {
    const { result } = renderUsePagination();

    expect(result.current.totalPages).toBe(4);
  });

  test("should go to next page", () => {
    const { result } = renderUsePagination();

    act(() => {
      result.current.changeToNextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  test("should not exceed total pages", () => {
    const { result } = renderUsePagination();

    act(() => {
      result.current.setCurrentPage(4);
    });
    act(() => {
      result.current.changeToNextPage();
    });

    expect(result.current.currentPage).toBe(4);
  });

  test("should go to previous page when changeToPrevPage is called", () => {
    const { result } = renderUsePagination();
    act(() => {
      result.current.setCurrentPage(4);
    });

    act(() => {
      result.current.changeToPrevPage();
    });

    expect(result.current.currentPage).toBe(3);
  });

  test("should not go below page 1", () => {
    const { result } = renderUsePagination();
    act(() => {
      result.current.changeToPrevPage();
    });
    expect(result.current.currentPage).toBe(1);
  });

  test("should reset page state when heroes changes", () => {
    const { result, rerender } = renderHook(
      ({ mockHeroes }) => usePagination(mockHeroes),
      {
        initialProps: { mockHeroes },
      },
    );

    act(() => {
      result.current.setCurrentPage(3);
    });

    expect(result.current.currentPage).toBe(3);

    const newMockHeroes: Superhero[] = Array.from({ length: 5 }, (_, index) =>
      createMockHero(index),
    );

    rerender({ mockHeroes: newMockHeroes });

    expect(result.current.currentPage).toBe(1);
  });
});
