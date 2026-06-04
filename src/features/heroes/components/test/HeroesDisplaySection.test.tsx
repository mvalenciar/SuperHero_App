import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroesDisplaySection } from "../HeroesDisplaySection";
import type { Superhero } from "../../interfaces/superhero.interface";
import { createMockHero } from "../../test/superhero.factory";

vi.mock("@/components/ui/spinner", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));
vi.mock("../HeroesEmptyState", () => ({
  HeroesEmptyState: () => <div data-testid="empty-state" />,
}));

const mockHeroes: Superhero[] = Array.from({ length: 10 }, (_, index) =>
  createMockHero({
    id: index,
    name: `Hero ${index}`,
  }),
);

describe("HeroesDisplaySection", () => {
  test("should render spinner when loading is true", () => {
    render(
      <HeroesDisplaySection heroes={[]} loading>
        <div>Heroes Content</div>
      </HeroesDisplaySection>,
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("It should show an empty state when there are no heroes", () => {
    render(
      <HeroesDisplaySection heroes={[]} loading={false}>
        <div>Heroes Content</div>
      </HeroesDisplaySection>,
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  test("It should render hero content when there are heroes to display and the loading state is false.", () => {
    render(
      <HeroesDisplaySection heroes={mockHeroes} loading={false}>
        <div>Heroes Content</div>
      </HeroesDisplaySection>,
    );
    expect(screen.getByText("Heroes Content")).toBeInTheDocument();
  });
});
