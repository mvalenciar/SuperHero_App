import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, test } from "vitest";
import { MobileMenu } from "../MobileMenu";
import userEvent from "@testing-library/user-event";

describe("MobileMenu", () => {
  test("should render component correctly", () => {
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole("button", { name: "☰" });

    expect(menuButton).toBeInTheDocument();
  });

  test("should display menu when user to have click mobile menu button", async () => {
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole("button", { name: "☰" });
    const user = userEvent.setup();

    await user.click(menuButton);

    expect(
      screen.getByRole("img", { name: /logo peque[ñn]o de la hero app/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /b[úu]squeda avanzada/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /favoritos/i }),
    ).toBeInTheDocument();
  });

  test("should navigate to advanced search page when advanced search link is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MobileMenu />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route
            path="/advancedSearch"
            element={<div>Advance Search Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole("button", { name: "☰" });
    const user = userEvent.setup();

    await user.click(menuButton);

    const linkAdvanceSearch = screen.getByRole("link", {
      name: /b[úu]squeda avanzada/i,
    });

    expect(linkAdvanceSearch).toHaveAttribute("href", "/advancedSearch");

    await user.click(linkAdvanceSearch);

    expect(screen.getByText("Advance Search Page")).toBeInTheDocument();
  });
});
