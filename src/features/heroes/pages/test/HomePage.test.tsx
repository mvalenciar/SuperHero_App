import { describe, expect, test, vi } from "vitest";
import { HomePage } from "../home/HomePage";
import { render, screen } from "@testing-library/react";
import { HeroesContext } from "../../../../context/HeroesContext";
import { createMockHero } from "../../test/superhero.factory";
import userEvent from "@testing-library/user-event";

const heroes = [
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
];

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../components/HeroStats", () => ({
  HeroStats: () => <div data-testid="hero-stats" />,
}));

const renderHomePage = () =>
  render(
    <HeroesContext.Provider
      value={{
        heroes,
        loading: false,
        favoriteHeroesId: [],
        isFavorite: vi.fn(),
        saveFavorite: vi.fn(),
      }}
    >
      <HomePage />
    </HeroesContext.Provider>,
  );

describe("Home Page", () => {
  test("should render home page correctly", () => {
    renderHomePage();
    expect(screen.getByText(/bienvenido a la hero app/i)).toBeInTheDocument();
    expect(screen.getByTestId("hero-stats")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/buscar héroes/i)).toBeInTheDocument();
    expect(screen.getByText("Superman")).toBeInTheDocument();
    expect(screen.getByText("Batman")).toBeInTheDocument();
  });

  test("should filter heroes by name", async () => {
    renderHomePage();

    const user = userEvent.setup();
    const inputSearch = screen.getByPlaceholderText(/buscar héroes/i);
    const buttonSearch = screen.getByRole("button", { name: /buscar/i });

    await user.type(inputSearch, "bat");
    await user.click(buttonSearch);

    expect(screen.getByText("Batman")).toBeInTheDocument();
    expect(screen.queryByText("Superman")).not.toBeInTheDocument();
  });

  test("should filter heroes by fullname", async () => {
    renderHomePage();

    const user = userEvent.setup();
    const inputSearch = screen.getByPlaceholderText(/buscar héroes/i);
    const buttonSearch = screen.getByRole("button", { name: /buscar/i });

    await user.type(inputSearch, "clar");
    await user.click(buttonSearch);

    expect(screen.getByText("Superman")).toBeInTheDocument();
    expect(screen.queryByText("Batman")).not.toBeInTheDocument();
  });
});
