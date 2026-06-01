import { describe, expect, test, vi } from "vitest";
import { getSuperheroesByApi } from "../../actions/get-superheroes-by-api";
import type { Superhero } from "../../interfaces/superhero.interface";
import { act, renderHook } from "@testing-library/react";
import { useHeroes } from "../useHeroes";

vi.mock("../../actions/get-superheroes-by-api", () => ({
  getSuperheroesByApi: vi.fn(),
}));

const createMockHero = (id: number): Superhero => {
  return {
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
  };
};

const mockHeroes = Array.from({ length: 20 }, (_, index) => {
  return createMockHero(index);
});

const renderUseHeroes = () => renderHook(() => useHeroes());

describe("useHeroes", () => {
  test("should return initial state", () => {
    const { result } = renderUseHeroes();

    expect(result.current.heroes).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  test("should load heroes correctly", async () => {
    vi.mocked(getSuperheroesByApi).mockResolvedValue(mockHeroes);

    const { result } = renderUseHeroes();

    await act(async () => {
      await result.current.loadHeroes();
    });

    expect(result.current.heroes).toEqual(mockHeroes);
    expect(result.current.loading).toBe(false);
    expect(getSuperheroesByApi).toHaveBeenCalledTimes(1);
  });

  test("should use localStorage", async () => {
    vi.mocked(getSuperheroesByApi).mockResolvedValue(mockHeroes);

    const { result } = renderUseHeroes();
    await act(async () => {
      await result.current.loadHeroes();
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "heroes",
      JSON.stringify(mockHeroes),
    );
    expect(localStorage.getItem).toHaveBeenCalledWith("heroes");
  });
  test("should initialize heroes from cache", async () => {
    localStorage.setItem("heroes", JSON.stringify(mockHeroes));

    vi.mocked(getSuperheroesByApi).mockResolvedValue(mockHeroes);

    const { result } = renderUseHeroes();

    await act(async () => {
      await result.current.loadHeroes();
    });

    expect(result.current.heroes).toEqual(mockHeroes);
  });
});
