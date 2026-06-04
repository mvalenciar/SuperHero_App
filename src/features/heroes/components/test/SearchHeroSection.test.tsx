import { render, screen } from "@testing-library/react";
import { SearchHeroSection } from "../SearchHeroSection";
import { describe, expect, test } from "vitest";

describe("SearchHeroSection", () => {
  test("should render children", () => {
    render(
      <SearchHeroSection>
        <p>Batman</p>
      </SearchHeroSection>,
    );

    expect(screen.getByText("Batman")).toBeInTheDocument();
  });
});
