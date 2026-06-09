import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HeroesContext } from "../../../../context/HeroesContext";
import { createMockHero } from "../../test/superhero.factory";
import { SearchPage } from "../search/SearchPage";

const heroes = Array.from({ length: 20 }, (_, index) =>
  createMockHero({
    id: index + 1,
    name: `Hero ${index + 1}`,
    fullname: `Full Hero ${index + 1}`,
    image: `Hero${index + 1}.jpg`,
    publisher: (index + 1) % 2 === 0 ? "DC" : "Marvel",
    gender: (index + 1) % 2 === 0 ? "Female" : "Male",
    type: (index + 1) % 2 === 0 ? "good" : "bad",
  }),
);

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

const renderSearchPage = () =>
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
      <SearchPage />
    </HeroesContext.Provider>,
  );

const setup = () => {
  renderSearchPage();

  return {
    user: userEvent.setup(),
    header: screen.getByRole("heading", {
      level: 1,
      name: /b[uú]squ[eé]d[aá]/i,
    }),
    inputSearch: screen.getByPlaceholderText(/buscar/i),
    buttonSearch: screen.getByRole("button", { name: /buscar/i }),
    filtersList: screen.getAllByRole("combobox"),
    heroCards: screen.getAllByRole("button", { name: "hero-card" }),
    genderFilter: screen.getByRole("combobox", {
      name: "gender-filter",
    }),
    typeFilter: screen.getByRole("combobox", {
      name: "type-filter",
    }),
    publisherFilter: screen.getByRole("combobox", {
      name: "publisher-filter",
    }),
  };
};

describe("SearchPage", () => {
  test("should render search page correctly", () => {
    const { header, inputSearch, buttonSearch, filtersList, heroCards } =
      setup();

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/búsqueda avanzada/i);
    expect(screen.getByTestId("hero-stats")).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    expect(filtersList).toHaveLength(3);
    expect(heroCards[0]).toBeInTheDocument();
    expect(heroCards.length).toBeGreaterThan(0);
  });

  test("should render filter with default values", () => {
    const { typeFilter, publisherFilter, genderFilter } = setup();

    expect(publisherFilter).toHaveValue("");
    expect(typeFilter).toHaveValue("");
    expect(genderFilter).toHaveValue("");
  });

  test("should found hero by name", async () => {
    const { user, inputSearch, buttonSearch } = setup();

    await user.type(inputSearch, "hero 1");
    await user.click(buttonSearch);

    expect(screen.getByText("Hero 1")).toBeInTheDocument();
  });

  test("should find hero by fullname", async () => {
    const { user } = setup();

    await user.type(screen.getByPlaceholderText(/buscar/i), "full hero 1");
    await user.click(screen.getByRole("button", { name: /buscar/i }));

    expect(screen.getByText("Hero 1")).toBeInTheDocument();
  });

  test("should filter heroes by publisher", async () => {
    const { user, publisherFilter } = setup();

    await user.selectOptions(publisherFilter, "DC");

    expect(publisherFilter).toHaveValue("dc");
    expect(screen.getByText("Hero 2")).toBeInTheDocument();
    expect(screen.queryByText("Hero 1")).not.toBeInTheDocument();
  });

  test("should filter heroes by type", async () => {
    const { user, typeFilter } = setup();

    await user.selectOptions(typeFilter, "Villano");

    expect(typeFilter).toHaveValue("bad");
    expect(screen.queryByText("Hero 2")).not.toBeInTheDocument();
    expect(screen.getByText("Hero 1")).toBeInTheDocument();
  });

  test("should filter heroes by gender", async () => {
    const { user, genderFilter } = setup();

    await user.selectOptions(genderFilter, "male");

    expect(genderFilter).toHaveValue("male");
    expect(screen.getByText("Hero 1")).toBeInTheDocument();
    expect(screen.queryByText("Hero 2")).not.toBeInTheDocument();
  });

  test("should apply multiple filters", async () => {
    const { user, publisherFilter, genderFilter, typeFilter } = setup();

    await user.selectOptions(publisherFilter, "dc");
    await user.selectOptions(genderFilter, "female");
    await user.selectOptions(typeFilter, "good");

    expect(screen.getByText("Hero 6")).toBeInTheDocument();
  });

  test("should found hero with multiple filters", async () => {
    const {
      user,
      publisherFilter,
      genderFilter,
      typeFilter,
      inputSearch,
      buttonSearch,
    } = setup();

    await user.selectOptions(publisherFilter, "dc");
    await user.selectOptions(genderFilter, "female");
    await user.selectOptions(typeFilter, "good");
    await user.type(inputSearch, "20");
    await user.click(buttonSearch);

    expect(screen.getByText("Hero 20")).toBeInTheDocument();
  });

  test("should render empty state when no found hero with filter applied", async () => {
    const {
      user,
      publisherFilter,
      genderFilter,
      typeFilter,
      inputSearch,
      buttonSearch,
    } = setup();

    await user.selectOptions(publisherFilter, "dc");
    await user.selectOptions(genderFilter, "male");
    await user.selectOptions(typeFilter, "good");
    await user.type(inputSearch, "3");
    await user.click(buttonSearch);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
