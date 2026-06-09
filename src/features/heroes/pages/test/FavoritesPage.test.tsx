import { describe, expect, test, vi } from "vitest";
import { createMockHero } from "../../test/superhero.factory";
import { render, screen } from "@testing-library/react";
import { HeroesContext } from "../../../../context/HeroesContext";
import { FavoritesPage } from "../favorites/FavoritesPage";
import type { Superhero } from "../../interfaces/superhero.interface";
import userEvent from "@testing-library/user-event";

const heroes: Superhero[] = [
  createMockHero({
    id: 1,
    name: "Batman",
    fullname: "Bruce Wayne",
    image: "img1.jpg",
  }),
  createMockHero({
    id: 2,
    name: "Superman",
    fullname: "Clark Kent",
    image: "img2.jpg",
  }),
  createMockHero({
    id: 3,
    name: "Hulk",
    fullname: "Bruce Banner",
    image: "img3.jpg",
  }),
];

const mockIsFavorite = vi.fn();
const mockSaveFavorite = vi.fn();
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));
vi.mock("../../components/HeroStats", () => ({
  HeroStats: () => <div data-testid="hero-stats" />,
}));

vi.mock("../../components/HeroesEmptyState", () => ({
  HeroesEmptyState: () => <div data-testid="empty-state" />,
}));

const renderFavoritesPage = (favoriteHeroesId = [1, 2, 3]) =>
  render(
    <HeroesContext.Provider
      value={{
        heroes,
        loading: false,
        favoriteHeroesId: favoriteHeroesId,
        isFavorite: mockIsFavorite,
        saveFavorite: mockSaveFavorite,
      }}
    >
      <FavoritesPage />
    </HeroesContext.Provider>,
  );

describe("FavoritesPage", () => {
  test("should render favorites page correctly", () => {
    renderFavoritesPage();
    expect(screen.getByText(/mis favoritos/i)).toBeInTheDocument();
    expect(screen.getByTestId("hero-stats")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/buscar favorito/i)).toBeInTheDocument();
    expect(screen.getByText(/hulk/i)).toBeInTheDocument();
  });

  test("should render all favorite cards", () => {
    renderFavoritesPage();

    expect(screen.getAllByRole("button", { name: "hero-card" })).toHaveLength(
      3,
    );
    expect(screen.getByText(/hulk/i)).toBeInTheDocument();
    expect(screen.getByText(/batman/i)).toBeInTheDocument();
    expect(screen.getByText(/superman/i)).toBeInTheDocument();
  });

  test("should render empty when not have favorites heroes", () => {
    renderFavoritesPage([]);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  test("should render favorites in the same order they were saved", () => {
    renderFavoritesPage([3, 1, 2]);
    const favoriteCards = screen.getAllByRole("button", { name: "hero-card" });
    expect(favoriteCards[0]).toHaveTextContent(/hulk/i);
    expect(favoriteCards[1]).toHaveTextContent(/batman/i);
    expect(favoriteCards[2]).toHaveTextContent(/superman/i);
  });

  test("should render only heroes favorites if exist", () => {
    renderFavoritesPage([1, 2, 8]);
    const favoriteCards = screen.getAllByRole("button", { name: "hero-card" });
    expect(favoriteCards[0]).toHaveTextContent(/batman/i);
    expect(favoriteCards[1]).toHaveTextContent(/superman/i);
    expect(favoriteCards).toHaveLength(2);
    expect(screen.queryByText("8")).not.toBeInTheDocument();
  });

  test("should render favorite hero when user type the name hero", async () => {
    renderFavoritesPage();
    const user = userEvent.setup();
    const inputSearch = screen.getByPlaceholderText(/Buscar favorito/i);
    const buttonSearch = screen.getByRole("button", { name: /buscar/i });

    await user.type(inputSearch, "bat");
    await user.click(buttonSearch);

    const heroCards = screen.getAllByRole("button", { name: "hero-card" });
    expect(heroCards).toHaveLength(1);
    expect(heroCards[0]).toHaveTextContent(/bat/i);
  });

  test("should render empty state when hero is not found", async () => {
    renderFavoritesPage();
    const user = userEvent.setup();
    const inputSearch = screen.getByPlaceholderText(/Buscar favorito/i);
    const buttonSearch = screen.getByRole("button", { name: /buscar/i });

    await user.type(inputSearch, "naruto");
    await user.click(buttonSearch);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  test("should find heroes by full name", async () => {
    renderFavoritesPage();

    const user = userEvent.setup();
    const inputSearch = screen.getByPlaceholderText(/Buscar favorito/i);
    const buttonSearch = screen.getByRole("button", { name: /buscar/i });

    await user.type(inputSearch, "bruce");
    await user.click(buttonSearch);

    const heroCards = screen.getAllByRole("button", { name: "hero-card" });
    expect(heroCards).toHaveLength(2);
    expect(heroCards[0]).toHaveTextContent(/bruce/i);
    expect(heroCards[1]).toHaveTextContent(/bruce/i);
    expect(screen.getByText(/batman/i)).toBeInTheDocument();
    expect(screen.getByText(/hulk/i)).toBeInTheDocument();
  });
});
