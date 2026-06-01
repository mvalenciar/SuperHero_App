import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useHeroesStats } from "../../hooks/useHeroesStats";
import type { Superhero } from "../../interfaces/superhero.interface";
import { HeroStats } from "../HeroStats";

vi.mock("../../hooks/useHeroesStats");

const mockUseHeroesStats = vi.mocked(useHeroesStats);

const createMockHero = ({
  id,
  name,
  intelligence,
  strength,
}: {
  id: number;
  name: string;
  intelligence: number;
  strength: number;
}): Superhero => ({
  id: id,
  name: name,
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
    intelligence: intelligence,
    strength: strength,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  },
  work: "",
  type: "",
  groupAffiliation: "",
});

const mockStrongestHero: Superhero = createMockHero({
  id: 1,
  name: "Superman",
  strength: 100,
  intelligence: 50,
});

const mockSmartestHero: Superhero = createMockHero({
  id: 2,
  name: "Iron Man",
  strength: 50,
  intelligence: 100,
});

describe("HeroStats", () => {
  beforeEach(() => {
    mockUseHeroesStats.mockReturnValue({
      totalHeroes: 100,
      favoritesStats: {
        value: 25,
        percentage: 25,
      },
      smartestHero: mockSmartestHero,
      strongestHero: mockStrongestHero,
      quantityHeroes: 80,
      quantityVillains: 20,
    });
  });

  test("should render all hero statistics", () => {
    render(<HeroStats />);

    expect(screen.getByText("Total de Personajes")).toBeInTheDocument();
    expect(screen.getByText("Total de Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Héroe Más Fuerte")).toBeInTheDocument();
    expect(screen.getByText("Héroe Más Inteligente")).toBeInTheDocument();
  });

  test("should render heroes stats correctly", () => {
    render(<HeroStats />);

    expect(screen.getByText("80 Héroes")).toBeInTheDocument();
    expect(screen.getByText("20 Villanos")).toBeInTheDocument();
    expect(screen.getByText("25 % del total")).toBeInTheDocument();
    expect(screen.getByText("Superman")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
  });

  test("should render fallback values when heroes are unavailable", () => {
    mockUseHeroesStats.mockReturnValue({
      totalHeroes: 0,
      favoritesStats: {
        value: 0,
        percentage: 0,
      },
      smartestHero: null,
      strongestHero: null,
      quantityHeroes: 0,
      quantityVillains: 0,
    });

    render(<HeroStats />);

    expect(screen.getAllByText("N/A")).toHaveLength(2);

    expect(screen.getByText("Fuerza: ?/100")).toBeInTheDocument();

    expect(screen.getByText("Inteligencia: ?/100")).toBeInTheDocument();
  });
});
