import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { createMockHero } from "../../test/superhero.factory";
import { HeroesContext } from "../../../../context/HeroesContext";
import { HeroCard } from "../HeroCard";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

const mockIsFavorite = vi.fn();
const mockSaveFavorite = vi.fn();

const mockHeroes = Array.from({ length: 2 }, (_, index) =>
  createMockHero({
    id: index,
    name: `Hero ${index}`,
    fullname: `Full Hero ${index}`,
    slug: `${index}-Hero-full`,
    image: `Hero_${index}.jpg`,
    stats: {
      intelligence: 10,
      strength: 20,
      speed: 30,
      durability: 40,
      power: 95,
      combat: 60,
    },
    publisher: `Hero ${index} Publisher`,
  }),
);

const renderHeroCard = (hero = mockHeroes[0]) =>
  render(
    <HeroesContext.Provider
      value={{
        heroes: mockHeroes,
        isFavorite: mockIsFavorite,
        saveFavorite: mockSaveFavorite,
        loading: false,
        favoriteHeroesId: [],
      }}
    >
      <HeroCard hero={hero} from="/" />
    </HeroesContext.Provider>,
  );

describe("HeroCard", () => {
  test("should render the card with default properties", () => {
    renderHeroCard();

    expect(screen.getByText("Hero 0")).toBeInTheDocument();
    expect(screen.getByText("Full Hero 0")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Hero 0" })).toBeInTheDocument();
    expect(screen.getByText("95")).toBeInTheDocument();
    expect(screen.getByText("Fuerza")).toBeInTheDocument();
    expect(screen.getByText("Inteligencia")).toBeInTheDocument();
    expect(screen.getByText("Velocidad")).toBeInTheDocument();
    expect(screen.getByText("Hero 0 Publisher")).toBeInTheDocument();
  });

  test("should display hero name when fullname is empty", () => {
    const heroWithoutFullName = createMockHero({
      id: 1,
      name: "Bartman",
      fullname: "",
      image: "Bartman.jpg",
    });

    renderHeroCard(heroWithoutFullName);

    expect(screen.getAllByText("Bartman")).toHaveLength(2);
  });

  test("should save hero as favorite without navigating when favorite button is clicked", async () => {
    const user = userEvent.setup();

    renderHeroCard();

    const favoriteButton = screen.getByRole("button", {
      name: /toggle favorite/i,
    });

    await user.click(favoriteButton);

    expect(mockSaveFavorite).toHaveBeenCalledTimes(1);
    expect(mockSaveFavorite).toHaveBeenCalledWith(mockHeroes[0].id);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("should navigate when card is clicked", async () => {
    renderHeroCard();
    const heroCard = screen.getByRole("button", {
      name: /hero-card/i,
    });
    const user = userEvent.setup();
    await user.click(heroCard);

    expect(mockNavigate).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith(`/hero/${mockHeroes[0].slug}`, {
      state: {
        hero: mockHeroes[0],
        from: "/",
      },
    });
  });

  test("should show image after it loads", () => {
    renderHeroCard();

    const imgHeroCard = screen.getByRole("img", { name: "Hero 0" });

    fireEvent.load(imgHeroCard);
    expect(imgHeroCard).toHaveClass("opacity-100");
  });

  test("should fill red styles to favorite icon when hero is favorite", () => {
    mockIsFavorite.mockReturnValue(true);

    renderHeroCard();

    const favoriteIcon = screen.getByLabelText(/favorite icon/i);

    expect(favoriteIcon).toHaveClass("text-rose-500");
    expect(favoriteIcon).toHaveClass("fill-rose-500");
    expect(favoriteIcon).toHaveClass("scale-110");
  });

  test("should render default styles when hero is not favorite", () => {
    mockIsFavorite.mockReturnValue(false);

    renderHeroCard();

    const favoriteIcon = screen.getByLabelText(/favorite icon/i);

    expect(favoriteIcon).toHaveClass("text-muted-foreground");
    expect(favoriteIcon).toHaveClass("hover:scale-110");
  });

  test("should show spinner while image is loading", () => {
    renderHeroCard();

    expect(screen.getByLabelText(/image-loading-spinner/i)).toBeInTheDocument();
  });

  test("should hide spinner when image loads", () => {
    renderHeroCard();

    const image = screen.getByRole("img", {
      name: "Hero 0",
    });

    fireEvent.load(image);

    expect(
      screen.queryByLabelText(/image-loading-spinner/i),
    ).not.toBeInTheDocument();
  });

  test("should show image when image loading fails", () => {
    renderHeroCard();

    const image = screen.getByRole("img", {
      name: "Hero 0",
    });

    fireEvent.error(image);

    expect(image).toHaveClass("opacity-100");
  });
});
