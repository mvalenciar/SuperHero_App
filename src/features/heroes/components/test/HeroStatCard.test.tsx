import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroStatCard } from "../HeroStatCard";

const MockIcon = ({ className }: { className?: string }) => (
  <svg data-testid="mock-icon" className={className} />
);

describe("HeroStatCard", () => {
  test("should render title and value", () => {
    render(
      <HeroStatCard
        title="Héroe Más Fuerte"
        icon={MockIcon}
        value={"Super Man"}
      />,
    );

    expect(screen.getByText("Héroe Más Fuerte")).toBeInTheDocument();
    expect(screen.getByText("Super Man")).toBeInTheDocument();
  });

  test("should render the description when provide", () => {
    render(
      <HeroStatCard
        title="Héroe Más Fuerte"
        icon={MockIcon}
        value={"Super Man"}
        description="Fuerza: 100/100"
      />,
    );

    expect(screen.getByText("Fuerza: 100/100")).toBeInTheDocument();
  });

  test("should not render description when not provided", () => {
    render(
      <HeroStatCard
        title="Héroe Más Fuerte"
        icon={MockIcon}
        value="Super Man"
      />,
    );

    expect(screen.queryByText("Fuerza: 100/100")).not.toBeInTheDocument();
  });

  test("should render footer when provided", () => {
    render(
      <HeroStatCard
        title="Power"
        icon={MockIcon}
        value={95}
        footer={<span>Footer Content</span>}
      />,
    );

    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});
