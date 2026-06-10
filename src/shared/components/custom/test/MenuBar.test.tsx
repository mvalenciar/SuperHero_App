import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { MemoryRouter, Route, Routes } from "react-router";
import { MenuBar } from "../MenuBar";
import userEvent from "@testing-library/user-event";

vi.mock("../MobileMenu", () => ({
  MobileMenu: () => <div data-testid="mobile-menu" />,
}));

describe("MenuBar", () => {
  test("should render the component correctly", () => {
    //
    render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /b[úu]squeda avanzada/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /favoritos/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /logo pequeño de la hero app/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  test("should navigate to favorites page when favorites link is clicked", async () => {
    //
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MenuBar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const linkFavorites = screen.getByRole("link", { name: /favoritos/i });

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(linkFavorites).toHaveAttribute("href", "/favorites");

    await user.click(linkFavorites);

    expect(screen.getByText("Favorites Page")).toBeInTheDocument();
  });
});
