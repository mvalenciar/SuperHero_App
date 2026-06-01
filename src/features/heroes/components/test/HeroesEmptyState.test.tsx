import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroesEmptyState } from "../HeroesEmptyState";

describe("HeroesEmptyState", () => {
  test("should render correctly", () => {
    render(<HeroesEmptyState />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "No se encontraron héroes",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No se encuentra entre nuestros datos héroes/i),
    ).toBeInTheDocument();
  });
});
