import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HeroesContext } from "../../../../context/HeroesContext";
import { HeroPage } from "../hero/HeroPage";
import { createMockHero } from "../../test/superhero.factory";
import type { HeroLocationState } from "../../interfaces/heroLocationState.interface";
import userEvent from "@testing-library/user-event";

const heroes = [
  createMockHero({
    id: 1,
    slug: "superman",
    name: "Superman",
    fullname: "Clark Kent",
    type: "good",
    race: "Kryptonian",
    image: "superman.jpg",
    height: ["6 ft", "191 cm"],
    weight: ["220 lb", "100 kg"],
    placeOfBirth: "Krypton",
    work: "Reporter",
    groupAffiliation: "Justice League",
    stats: {
      strength: 100,
      speed: 100,
      intelligence: 85,
      combat: 85,
      durability: 100,
      power: 100,
    },
  }),
  createMockHero({
    id: 2,
    slug: "batman",
    name: "Batman",
    fullname: "Bruce Wayne",
    type: "good",
    race: "Human",
    image: "batman.jpg",
    height: ["6 ft 2 in", "188 cm"],
    weight: ["210 lb", "95 kg"],
    placeOfBirth: "Gotham City",
    work: "Businessman",
    groupAffiliation: "Justice League",
    stats: {
      strength: 40,
      speed: 30,
      intelligence: 100,
      combat: 100,
      durability: 50,
      power: 45,
    },
  }),
  createMockHero({
    id: 3,
    slug: "spiderman",
    name: "Spider-Man",
    fullname: "Peter Parker",
    type: "good",
    race: "Human (Mutated)",
    image: "spiderman.jpg",
    height: ["5 ft 10 in", "178 cm"],
    weight: ["167 lb", "76 kg"],
    placeOfBirth: "New York, USA",
    work: "Photographer",
    groupAffiliation: "Avengers",
    stats: {
      strength: 55,
      speed: 60,
      intelligence: 90,
      combat: 85,
      durability: 75,
      power: 70,
    },
  }),
  createMockHero({
    id: 4,
    slug: "wonderwoman",
    name: "Wonder Woman",
    fullname: "Diana Prince",
    type: "good",
    race: "Amazon",
    image: "wonderwoman.jpg",
    height: ["6 ft", "183 cm"],
    weight: ["165 lb", "75 kg"],
    placeOfBirth: "Themyscira",
    work: "Government Agent",
    groupAffiliation: "Justice League",
    stats: {
      strength: 95,
      speed: 85,
      intelligence: 80,
      combat: 100,
      durability: 95,
      power: 90,
    },
  }),
  createMockHero({
    id: 5,
    slug: "ironman",
    name: "Iron Man",
    fullname: "Tony Stark",
    type: "good",
    race: "Human",
    image: "ironman.jpg",
    height: ["6 ft 1 in", "185 cm"],
    weight: ["225 lb", "102 kg"],
    placeOfBirth: "Long Island, USA",
    work: "Inventor",
    groupAffiliation: "Avengers",
    stats: {
      strength: 85,
      speed: 60,
      intelligence: 100,
      combat: 70,
      durability: 85,
      power: 90,
    },
  }),
];
const mockNavigate = vi.fn();
let mockParamSlug: string | null = null;
// eslint-disable-next-line prefer-const
let mockLocationState: HeroLocationState | null = null;

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({
      idSlug: mockParamSlug,
    }),
    useLocation: () => ({
      state: mockLocationState,
    }),
  };
});

const renderHeroPage = () =>
  render(
    <HeroesContext.Provider
      value={{
        heroes,
        loading: false,
        favoriteHeroesId: [1, 2],
        isFavorite: vi.fn(),
        saveFavorite: vi.fn(),
      }}
    >
      <HeroPage />
    </HeroesContext.Provider>,
  );

describe("HeroPage", () => {
  beforeEach(() => {
    mockParamSlug = null;
    mockLocationState = null;
    mockNavigate.mockClear();
  });

  test("should render hero information from slug", () => {
    mockParamSlug = "superman";

    renderHeroPage();

    expect(
      screen.getByRole("heading", { level: 1, name: /superman/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Datos Generales")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /clark/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/H[ée]roe no encontrado/i),
    ).not.toBeInTheDocument();
  });

  test("should render message when hero not found", () => {
    mockParamSlug = "naruto";

    renderHeroPage();

    expect(screen.getByText(/H[ée]roe no encontrado/i)).toBeInTheDocument();
  });

  test("should render hero information from location state", () => {
    mockParamSlug = null;
    mockLocationState = {
      hero: heroes[0],
      from: "/advancedSearch",
    };
    renderHeroPage();

    expect(
      screen.getByRole("heading", { level: 1, name: /superman/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/H[ée]roe no encontrado/i),
    ).not.toBeInTheDocument();
  });

  test("should navigate to from page", async () => {
    mockParamSlug = null;
    mockLocationState = {
      hero: heroes[0],
      from: "/favorites",
    };
    renderHeroPage();
    const user = userEvent.setup();
    const goBackButton = screen.getByRole("button", { name: "back-button" });

    await user.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/favorites");
  });

  test("should render the next information hero when user click next", async () => {
    mockParamSlug = "superman";

    renderHeroPage();
    const user = userEvent.setup();
    const nextButton = screen.getByRole("button", { name: "next-button" });

    await user.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      "/hero/batman",
      expect.any(Object),
    );
  });

  test("should render the prev information hero when user click prev", async () => {
    mockParamSlug = "ironman";
    renderHeroPage();
    const user = userEvent.setup();
    const prevButton = screen.getByRole("button", { name: "prev-button" });

    await user.click(prevButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      "/hero/wonderwoman",
      expect.any(Object),
    );
  });

  test("should not render the prev button when show the first hero", () => {
    mockParamSlug = "superman";

    renderHeroPage();

    expect(
      screen.queryByRole("button", {
        name: "prev-button",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "next-button",
      }),
    ).toBeInTheDocument();
  });

  test("should not render the next button when show the last hero", () => {
    mockParamSlug = "ironman";

    renderHeroPage();

    expect(
      screen.getByRole("button", {
        name: "prev-button",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "next-button",
      }),
    ).not.toBeInTheDocument();
  });

  test("should show hero image when image loads successfully", () => {
    mockParamSlug = "superman";
    renderHeroPage();

    const heroImg = screen.getByRole("img");

    fireEvent.load(heroImg);

    expect(heroImg).toHaveClass("opacity-100");
  });

  test("should hide spinner when image loading fails", () => {
    mockParamSlug = "superman";
    renderHeroPage();

    const heroImg = screen.getByRole("img");

    fireEvent.error(heroImg);

    expect(heroImg).toHaveClass("opacity-100");
    expect(screen.queryByLabelText("spinner-icon")).not.toBeInTheDocument();
  });
});
