import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroStatBar } from "../HeroStatBar";

describe("HeroStatBar", () => {
  test("should render the component with props correctly", () => {
    render(<HeroStatBar stat="strength" value={50} />);

    expect(screen.getByText("strength")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
