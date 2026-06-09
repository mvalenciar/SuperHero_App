import { describe, expect, test, vi } from "vitest";
import { HeroLayout } from "../HeroLayout";
import { render, screen } from "@testing-library/react";

vi.mock("@/components/custom/MenuBar", () => ({
  MenuBar: () => <div data-testid="menu-bar" />,
}));

vi.mock("react-router", () => ({
  Outlet: () => <div data-testid="outlet" />,
}));

vi.mock("@/components/custom/Footer", () => ({
  Footer: () => <div data-testid="footer" />,
}));

describe("HeroLayout", () => {
  test("should render the layout with principal components correctly", () => {
    render(<HeroLayout />);

    expect(screen.getByTestId("menu-bar")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
