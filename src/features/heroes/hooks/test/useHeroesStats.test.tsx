// Hooks
import { useHeroesStats } from "../useHeroesStats";
//Context
import { HeroesContext } from "../../../../context/HeroesContext";

//vitest and testing-library fn()
import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

// Types
import { type PropsWithChildren } from "react";
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
    intelligence: id * 10,
    strength: id * 5,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  },
  work: "",
  type: id % 2 === 0 ? "good" : "bad",
  groupAffiliation: "",
});

const mockHeroes = Array.from({ length: 20 }, (_, index) => {
  return createMockHero(index);
});

const wrapper = ({ children }: PropsWithChildren) => {
  return (
    <HeroesContext.Provider
      value={{
        heroes: mockHeroes,
        favoriteHeroesId: [1, 2, 3],
        loading: false,
        isFavorite: vi.fn(),
        saveFavorite: vi.fn(),
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};

const renderUseHeroStats = () => {
  return renderHook(() => useHeroesStats(), {
    wrapper,
  });
};

describe("useHeroesStats", () => {
  test("should return total heroes correctly", () => {
    const { result } = renderUseHeroStats();

    expect(result.current.totalHeroes).toBe(20);
  });

  test("should return total quantity of heroes and villain correctly", () => {
    const { result } = renderUseHeroStats();

    expect(result.current.quantityHeroes).toBe(10);
    expect(result.current.quantityVillains).toBe(10);
  });

  test("should return total heroes favorites and percentage correctly", () => {
    const { result } = renderUseHeroStats();

    expect(result.current.favoritesStats.value).toBe(3);
    expect(result.current.favoritesStats.percentage).toBe(15);
  });

  test("should return strongest and smartest hero correctly", () => {
    const { result } = renderUseHeroStats();

    expect(result.current.strongestHero?.name).toBe("Hero 19");
    expect(result.current.smartestHero?.name).toBe("Hero 19");
  });

  test("should return null heroes when heroes array is empty", () => {
    const emptyWrapper = ({ children }: PropsWithChildren) => {
      return (
        <HeroesContext.Provider
          value={{
            heroes: [],
            favoriteHeroesId: [],
            loading: false,
            isFavorite: vi.fn(),
            saveFavorite: vi.fn(),
          }}
        >
          {children}
        </HeroesContext.Provider>
      );
    };

    const { result } = renderHook(() => useHeroesStats(), {
      wrapper: emptyWrapper,
    });

    expect(result.current.totalHeroes).toBe(0);

    expect(result.current.strongestHero).toBeNull();

    expect(result.current.smartestHero).toBeNull();

    expect(result.current.quantityHeroes).toBe(0);

    expect(result.current.quantityVillains).toBe(0);

    expect(result.current.favoritesStats).toEqual({
      value: 0,
      percentage: 0,
    });
  });
});
